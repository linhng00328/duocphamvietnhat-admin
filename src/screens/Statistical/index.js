import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { Redirect } from "react-router-dom";
import { connect, shallowEqual } from "react-redux";
import Loading from "../Loading";
import * as saleAction from "../../actions/sale";
import { format } from "../../ultis/helpers";
class Statistical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexReward: -1,
    };
  }

  componentDidMount() {
    var { store_code } = this.props.match.params;
    const { fetchStatisticalSale } = this.props;
    fetchStatisticalSale(store_code);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { statistical } = this.props;

    if (!shallowEqual(statistical, nextProps.statistical)) {
      var newIndex = -1;
      const totalCompare =
        nextProps?.statistical?.sale_config?.type_bonus_period == 0
          ? nextProps?.statistical?.total_final_in_month
          : nextProps?.statistical?.sale_config?.type_bonus_period == 1
          ? nextProps?.statistical?.total_final_in_week
          : nextProps?.statistical?.sale_config?.type_bonus_period == 2
          ? nextProps?.statistical?.total_final_in_quarter
          : nextProps?.statistical?.sale_config?.type_bonus_period == 3
          ? nextProps?.statistical?.total_final_in_year
          : "";
      nextProps?.statistical?.steps_bonus.forEach((step, index) => {
        if (step.limit <= totalCompare) {
          newIndex = index;
        }
      });

      this.setState({ indexReward: newIndex });
    }
    return true;
  }

  render() {
    const { store_code } = this.props.match.params;
    const { indexReward } = this.state;
    const { badges, statistical } = this.props;

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
                    <div className="row">
                      <div className="col-xl-8">
                        <div className="d-sm-flex  align-items-center justify-content-between mb-4">
                          <h4 className="h4 title_content mb-0 text-gray-800">
                            Tổng quan của Sale
                          </h4>
                        </div>
                        <div className="row">
                          <div className="col-xl-6 col-md-12 mb-4 ">
                            <div className="card border-left-primary shadow h-100 py-2">
                              <div className="card-body set-padding">
                                <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                    <div>
                                      <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                        Tổng doanh số
                                      </div>
                                    </div>
                                    <div className="d-sm-flex  align-items-center justify-content-between">
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {format(statistical.total_final)}
                                      </div>
                                      <div className="font-weight-bold text-gray-800 h5">
                                        {statistical.total_order} đơn
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-12 mb-4 ">
                            <div className="card border-left-primary shadow h-100 py-2">
                              <div className="card-body set-padding">
                                <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                    <div>
                                      <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                        Ngày
                                      </div>
                                    </div>
                                    <div className="d-sm-flex  align-items-center justify-content-between">
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {format(statistical.total_final_in_day)}
                                      </div>
                                      <div className="font-weight-bold text-gray-800 h5">
                                        {statistical.count_in_day} đơn
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-12 mb-4 ">
                            <div className="card border-left-primary shadow h-100 py-2">
                              <div className="card-body set-padding">
                                <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                    <div>
                                      <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                        Tuần
                                      </div>
                                    </div>
                                    <div className="d-sm-flex  align-items-center justify-content-between">
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {format(
                                          statistical.total_final_in_week
                                        )}
                                      </div>
                                      <div className="font-weight-bold text-gray-800 h5">
                                        {statistical.count_in_week} đơn
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-12 mb-4 ">
                            <div className="card border-left-primary shadow h-100 py-2">
                              <div className="card-body set-padding">
                                <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                    <div>
                                      <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                        Tháng
                                      </div>
                                    </div>
                                    <div className="d-sm-flex  align-items-center justify-content-between">
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {format(
                                          statistical.total_final_in_month
                                        )}
                                      </div>
                                      <div className="font-weight-bold text-gray-800 h5">
                                        {statistical.count_in_month} đơn
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-12 mb-4 ">
                            <div className="card border-left-primary shadow h-100 py-2">
                              <div className="card-body set-padding">
                                <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                    <div>
                                      <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                        Quý
                                      </div>
                                    </div>
                                    <div className="d-sm-flex  align-items-center justify-content-between">
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {format(
                                          statistical.total_final_in_quarter
                                        )}
                                      </div>
                                      <div className="font-weight-bold text-gray-800 h5">
                                        {statistical.count_in_quarter} đơn
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-12 mb-4 ">
                            <div className="card border-left-primary shadow h-100 py-2">
                              <div className="card-body set-padding">
                                <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                    <div>
                                      <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                        Năm
                                      </div>
                                    </div>
                                    <div className="d-sm-flex  align-items-center justify-content-between">
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {format(
                                          statistical.total_final_in_year
                                        )}
                                      </div>
                                      <div className="font-weight-bold text-gray-800 h5">
                                        {statistical.count_in_year} đơn
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: "10px",
                          }}
                          className="mb-4"
                        >
                          <img
                            src="../images/giftbox.png"
                            alt="gift"
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                          />
                          <span className="font-weight-bold text-uppercase">
                            Thưởng theo mức doanh số theo{" "}
                            {statistical?.sale_config?.type_bonus_period == 0
                              ? "tháng"
                              : statistical?.sale_config?.type_bonus_period == 1
                              ? "tuần"
                              : statistical?.sale_config?.type_bonus_period == 2
                              ? "quý"
                              : statistical?.sale_config?.type_bonus_period == 3
                              ? "năm"
                              : ""}
                          </span>
                        </div>

                        {statistical.steps_bonus.length > 0 && (
                          <div>
                            {statistical.steps_bonus.map((step, index) => (
                              <div className="mb-4" key={step.id}>
                                <div className="card  shadow h-100 py-2">
                                  <div className="card-body set-padding">
                                    <div className="row no-gutters align-items-center">
                                      <div className="col mr-2">
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            columnGap: "10px",
                                          }}
                                        >
                                          <img
                                            src={`../images/${
                                              index <= indexReward
                                                ? "checked.svg"
                                                : "hand.png"
                                            }`}
                                            alt="hand"
                                            style={{
                                              width: "30px",
                                              height: "30px",
                                            }}
                                          />
                                          <div className=" font-weight-bold text-secondary mb-1">
                                            Đạt: {format(step.limit)}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-auto text-success font-weight-bold">
                                        Thưởng: {format(step.bonus)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
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
    auth: state.authReducers.login.authentication,
    badges: state.badgeReducers.allBadge,
    permission: state.authReducers.permission.data,
    statistical: state.saleReducers.sale.statistical,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchStatisticalSale: (store_code) => {
      dispatch(saleAction.fetchStatisticalSale(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Statistical);
