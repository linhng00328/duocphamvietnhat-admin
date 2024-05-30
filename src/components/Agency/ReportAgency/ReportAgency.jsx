import React, { Component } from "react";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as dashboardAction from "../../../actions/dashboard";
import * as Types from "../../../constants/ActionType";
import NotAccess from "../../../components/Partials/NotAccess";
import * as helper from "../../../ultis/helpers";
import ChartSales from "./ChartSales";
import Alert from "../../../components/Partials/Alert";
import * as customerAction from "../../../actions/customer";
import { getBranchId } from "../../../ultis/branchUtils";
import { getQueryParams } from "../../../ultis/helpers";
import history from "../../../history";

class ReportAgency extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var { store_code, agency_by_customer_id } = this.props.match.params;
    var date = helper.getDateForChartDay();
    this.props.fetchOverview(
      store_code,
      `?date_from=${date.from}&date_to=${date.to}&agency_by_customer_id=${agency_by_customer_id}`
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.post_add;
      this.setState({ isLoading: true, isShow });
    }
  }

  getStepDataById(id) {
    var { store_code, step_id } = this.props.match.params;
    var listStep = this.props?.bonusAgencyConfig?.step_bonus ?? [];
    for (let i = 0; i < listStep.length; i++) {
      if (listStep[i].id == step_id) {
        return listStep[i];
      }
    }
  }
  goBack = () => {
    var { store_code } = this.props.match.params;
    // history.replace(`/agency/${store_code}?tab-index=1`);
    history.goBack();
  };
  render() {
    var { store_code, agency_by_customer_id } = this.props.match.params;
    var { overview, customer } = this.props;
    var { isShow } = this.state;
    var { store_code } = this.props.match.params;

    if (true) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <div class="container-fluid">
                    <Alert
                      type={Types.ALERT_UID_STATUS}
                      alert={this.props.alert}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Báo cáo đại lý
                      </h4>
                      {getQueryParams("tab-index") == 1 && (
                        <button
                          style={{ marginRight: "10px" }}
                          type="button"
                          onClick={this.goBack}
                          class="btn btn-warning  btn-sm"
                        >
                          <i class="fas fa-arrow-left"></i>&nbsp;Trở về
                        </button>
                      )}
                    </div>
                    <br></br>
                    <div class="card shadow mb-4">
                      <div class="card-body">
                        <section class="content">
                          <div class="row">
                            <div class="col-md-12 col-xs-12">
                              <div id="messages"></div>

                              <div class="box">
                                <ChartSales
                                  customer={customer}
                                  agency_by_customer_id={agency_by_customer_id}
                                  store_code={store_code}
                                  overview={overview}
                                />
                              </div>
                            </div>
                          </div>
                        </section>
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
      return "";
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,

    permission: state.authReducers.permission.data,
    overview: state.reportReducers.overview,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  var branch_id = getBranchId();
  return {
    fetchOverview: (store_code, params) => {
      dispatch(dashboardAction.fetchOverview(store_code, branch_id, params));
    },
    fetchCustomerId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerId(store_code, customerId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReportAgency);
