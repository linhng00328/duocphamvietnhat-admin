import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import NotAccess from "../../components/Partials/NotAccess";

import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ChartSales from "../../components/Dashboard/ChartSales";
import ChartTopTen from "../../components/Dashboard/ChartTopTen";

import General from "../../components/Dashboard/General";
import { Redirect } from "react-router-dom";
import { connect, shallowEqual } from "react-redux";
import Loading from "../Loading";
import BadgeTable from "../../components/Dashboard/BadgeTable";
import * as dashboardAction from "../../actions/dashboard";
import * as collaboratorAction from "../../actions/collaborator";
import * as productAction from "../../actions/product";
import * as helper from "../../ultis/helpers";
import Statistical from "../../components/Sale/Statistical";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
    };
  }

  handleGetTypeStore = (type) => {
    this.setState({
      type,
    });
  };

  componentDidMount() {
    var idBranch = localStorage.getItem("branch_id");
    var { store_code } = this.props.match.params;
    var date = helper.getDateForChartMonth();
    if (idBranch != "") {
      this.props.fetchDataId(store_code);
      this.props.fetchTopTenProduct(
        store_code,
        idBranch,
        `?date_from=${date.from}&date_to=${date.to}`
      );
      this.props.fetchOverview(
        store_code,
        idBranch,
        `?date_from=${date.from}&date_to=${date.to}`
      );
      this.props.fetchAllCollaborator(store_code);
      this.props.getAmountProductNearlyOutStock(store_code, idBranch);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading !== true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;
      var isShow = permissions.report_view;
      this.setState({ isLoading: true, isShow });
    }
    var { store_code } = this.props.match.params;

    if (!shallowEqual(nextProps.currentBranch, this.props.currentBranch)) {
      if (typeof store_code != "undefined" || store_code != null) {
        const idBranch = nextProps.currentBranch?.id;
        if (typeof nextProps.currentBranch !== "undefined") {
          var date = helper.getDateForChartMonth();
          this.props.fetchDataId(store_code);
          this.props.fetchTopTenProduct(
            store_code,
            idBranch,
            `?date_from=${date.from}&date_to=${date.to}`
          );
          this.props.fetchOverview(
            store_code,
            idBranch,
            `?date_from=${date.from}&date_to=${date.to}`
          );
          this.props.fetchAllCollaborator(store_code);
        }
      }
    }
  }

  render() {
    var { store_code } = this.props.match.params;

    if (
      typeof store_code == "undefined" ||
      store_code == null ||
      store_code == ""
    ) {
      return <Redirect to="/dashboard/duocphamnhatban" />;
    }

    var { badges, collaborators, overview, topten } = this.props;
    console.log();
    var numDiscount = badges?.products_discount || 0;
    var { isShow } = this.state;
    console.log(badges);
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
                {badges.is_sale && badges.is_staff ? (
                  <div className="container-fluid">
                    <Statistical store_code={store_code} />
                  </div>
                ) : null}
                {isShow ? (
                  <div className="container-fluid">
                    <div className="d-sm-flex  align-items-center justify-content-between mb-4">
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Hôm nay
                      </h4>
                    </div>

                    <General
                      badges={badges}
                      store_code={store_code}
                      numDiscount={numDiscount}
                      collaborators={collaborators}
                      store={this.props.store}
                      countProductNearlyOutStock={
                        this.props.countProductNearlyOutStock
                      }
                    />
                    <br></br>

                    <div
                      class="row"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        className="col-lg-3 col-md-12 col-sm-12"
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
                            <BadgeTable
                              badges={badges}
                              store_code={store_code}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        class="card shadow mb-4 col-lg-9 col-md-12 col-sm-12"
                        style={{ height: "100%" }}
                      >
                        <div class="card-header py-3">
                          <h6 class="m-0 title_content font-weight-bold text-primary">
                            Báo cáo doanh thu
                          </h6>
                        </div>
                        <div class="card-body">
                          <ChartSales
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
                ) : null}
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
    permission: state.authReducers.permission.data,
    currentBranch: state.branchReducers.branch.currentBranch,
    countProductNearlyOutStock:
      state.productReducers.product.countProductNearlyOutStock,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchDataId: (id) => {
      dispatch(dashboardAction.fetchDataId(id));
    },
    fetchTopTenProduct: (store_code, branch_id, params) => {
      dispatch(
        dashboardAction.fetchTopTenProduct(store_code, branch_id, params)
      );
    },
    fetchOverview: (store_code, branch_id, params) => {
      dispatch(dashboardAction.fetchOverview(store_code, branch_id, params));
    },
    fetchAllCollaborator: (store_code) => {
      dispatch(collaboratorAction.fetchAllCollaborator(store_code));
    },
    getAmountProductNearlyOutStock: (store_code, branch_id) => {
      dispatch(
        productAction.getAmountProductNearlyOutStock(store_code, branch_id)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
