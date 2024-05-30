import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ChartSales from "../../components/Report/ChartSales";
import ChartTopTen from "../../components/Report/ChartTopTen";
import * as agencyAction from "../../actions/agency";
import * as customerAction from "../../actions/customer";

import General from "../../components/Report/General";
import GeneralPos from "../../components/Report/GeneralPos";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import BadgeTablePos from "../../components/Dashboard/BadgeTable";

import BadgeTable from "../../components/Report/BadgeTable";
import * as reportAction from "../../actions/report";
import * as collaboratorAction from "../../actions/collaborator";
import * as helper from "../../ultis/helpers";
import Alert from "../../components/Partials/Alert";
import * as Types from "../../constants/ActionType";
import NotAccess from "../../components/Partials/NotAccess";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";
class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var { store_code } = this.props.match.params;
    var date = helper.getDateForChartDay();
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;

    this.props.fetchDataId(store_code);
    this.props.fetchTopTenProduct(
      store_code,
      branchIds,
      `?date_from=${date.from}&date_to=${date.to}`
    );
    this.props.fetchOverview(
      store_code,
      branchIds,
      `?date_from=${date.from}&date_to=${date.to}`
    );
    this.props.fetchAllCollaborator(store_code);
    this.props.fetchAllAgency(store_code, 1, null);
    this.props.fetchAllCustomer(store_code, 1, null);
  }

  handeOnload = (data) => {
    this.props.fetchDataId(data);
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.report_overview;
      this.setState({ isLoading: true, isShow });
    }
  }

  render() {
    var { store_code } = this.props.match.params;
    var { badges, collaborators, overview, topten, agencys, customers } =
      this.props;
    var numDiscount = badges.products_discount || 0;
    var { isShow } = this.state;
    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar
                  store_code={store_code}
                  handeOnload={this.handeOnload}
                />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <div className="container-fluid">
                    <Alert
                      type={Types.ALERT_UID_STATUS}
                      alert={this.props.alert}
                    />
                    <div className="d-sm-flex  align-items-center justify-content-between mb-4">
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Báo cáo, Thống kê
                      </h4>
                    </div>
                    <div class="row">
                      <div
                        className="col-lg-3 col-xl-3 col-md-12 col-sm-12"
                        style={{ paddingBottom: "15px" }}
                      >
                        <div
                          class="card shadow mb-4 "
                          style={{ height: "100%" }}
                        >
                          <div class="card-header py-3">
                            <h6 class="m-0 title_content font-weight-bold text-primary">
                              Thông tin chỉ số
                            </h6>
                          </div>
                          <div class="card-body">
                            {getChannel() == IKITECH ? (
                              <BadgeTable
                                overview={overview}
                                badges={badges}
                                store_code={store_code}
                              />
                            ) : (
                              <BadgeTablePos
                                overview={overview}
                                badges={badges}
                                store_code={store_code}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        class="card shadow mb-4 col-lg-9 col-xl-9 col-md-12 col-sm-12"
                        style={{ height: "100%" }}
                      >
                        <div class="card-header py-3">
                          <h6 class="m-0 title_content font-weight-bold text-primary">
                            Tổng quan
                          </h6>
                        </div>
                        <div class="card-body">
                          {getChannel() == IKITECH && (
                            <General
                              store_code={store_code}
                              agencys={agencys}
                              badges={badges}
                              customers={customers}
                              numDiscount={numDiscount}
                              collaborators={collaborators}
                              store={this.props.store}
                            />
                          )}
                          {getChannel() == IKIPOS && (
                            <GeneralPos
                              badges={badges}
                              store_code={store_code}
                              customers={customers}
                              store={this.props.store}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="">
                      <div
                        class="card shadow mb-4 col-12"
                        style={{ height: "100%" }}
                      >
                        <div class="card-header py-3">
                          <h6 class="m-0 title_content font-weight-bold text-primary">
                            Báo cáo doanh thu
                          </h6>
                        </div>
                        <div class="card-body">
                          <ChartSales
                            badges={badges}
                            store_code={store_code}
                            overview={overview}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="card shadow mb-4 col-12">
                      <div class="card-header py-3">
                        <h6 class="m-0 title_content font-weight-bold text-primary">
                          Top 10 sản phẩm
                        </h6>
                      </div>
                      <div class="card-body">
                        <ChartTopTen topten={topten} store_code={store_code} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />
            </div>
          </div>
        </div>
      );
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.storeReducers.store.storeID,
    auth: state.authReducers.login.authentication,
    badges: state.badgeReducers.allBadge,
    topten: state.reportReducers.topten,
    overview: state.reportReducers.overview,
    collaborators: state.collaboratorReducers.collaborator.allCollaborator,
    alert: state.reportReducers.alert_fetch_report,
    permission: state.authReducers.permission.data,
    agencys: state.agencyReducers.agency.allAgency,
    customers: state.customerReducers.customer.allCustomer,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchDataId: (id) => {
      dispatch(reportAction.fetchDataId(id));
    },
    fetchTopTenProduct: (store_code, branch_id, params) => {
      dispatch(reportAction.fetchTopTenProduct(store_code, branch_id, params));
    },
    fetchOverview: (store_code, branch_id, params) => {
      dispatch(reportAction.fetchOverview(store_code, branch_id, params));
    },
    fetchAllCollaborator: (store_code) => {
      dispatch(collaboratorAction.fetchAllCollaborator(store_code));
    },
    fetchAllAgency: (store_code, page, params) => {
      dispatch(agencyAction.fetchAllAgency(store_code, page, params));
    },
    fetchAllCustomer: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomer(id, page, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Report);
