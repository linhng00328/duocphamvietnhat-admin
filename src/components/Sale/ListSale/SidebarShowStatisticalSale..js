import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import styled from "styled-components";
import { format } from "../../../ultis/helpers";
import SidebarFilter from "../../Partials/SidebarFilter";

const SidebarShowStatisticalStyles = styled.div`
  .totalContent {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

class SidebarShowStatisticalSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexReward: -1,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { statisticalUser } = this.props;
    if (!shallowEqual(statisticalUser, nextProps.statisticalUser)) {
      var newIndex = -1;
      const totalCompare =
        nextProps?.statisticalUser?.sale_config?.type_bonus_period == 0
          ? nextProps?.statisticalUser?.total_final_in_month
          : nextProps?.statisticalUser?.sale_config?.type_bonus_period == 1
          ? nextProps?.statisticalUser?.total_final_in_week
          : nextProps?.statisticalUser?.sale_config?.type_bonus_period == 2
          ? nextProps?.statisticalUser?.total_final_in_quarter
          : nextProps?.statisticalUser?.sale_config?.type_bonus_period == 3
          ? nextProps?.statisticalUser?.total_final_in_year
          : "";
      nextProps?.statisticalUser?.steps_bonus.forEach((step, index) => {
        if (step.limit <= totalCompare) {
          newIndex = index;
        }
      });

      this.setState({ indexReward: newIndex });
    }
    return true;
  }

  handleCloseShowSidebar = () => {
    const { setShowSidebar, setSaleInfoStatistical } = this.props;
    setShowSidebar(false);
    setSaleInfoStatistical({});
  };
  render() {
    const { saleInfoStatistical, showSidebar, statisticalUser } = this.props;

    const { indexReward } = this.state;
    return (
      <SidebarFilter
        title={`Thống kê sale của nhân viên ${saleInfoStatistical?.name}`}
        widthSideBar="70%"
        showSidebar={showSidebar}
        setShowSidebar={this.handleCloseShowSidebar}
      >
        <SidebarShowStatisticalStyles>
          {Object.entries(statisticalUser).length > 0 && (
            <div className="row">
              <div className="col-xl-5">
                <div className="d-sm-flex  align-items-center justify-content-between mb-4">
                  <h4 className="h5 title_content mb-0 text-gray-800">
                    Tổng quan của Sale
                  </h4>
                </div>
                <div>
                  <div className="mb-4 ">
                    <div className="card border-left-success shadow h-100 py-2">
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
                                {format(
                                  statisticalUser.total_after_discount_no_bonus
                                )}
                              </div>
                              <div className="font-weight-bold text-gray-800 h5">
                                {statisticalUser.total_order} đơn
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 ">
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
                                {format(
                                  statisticalUser.total_after_discount_no_bonus_in_day
                                )}
                              </div>
                              <div className="font-weight-bold text-gray-800 h5">
                                {statisticalUser.count_in_day} đơn
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 ">
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
                                  statisticalUser.total_after_discount_no_bonus_in_week
                                )}
                              </div>
                              <div className="font-weight-bold text-gray-800 h5">
                                {statisticalUser.count_in_week} đơn
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 ">
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
                                  statisticalUser.total_after_discount_no_bonus_in_month
                                )}
                              </div>
                              <div className="font-weight-bold text-gray-800 h5">
                                {statisticalUser.count_in_month} đơn
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 ">
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
                                  statisticalUser.total_after_discount_no_bonus_in_quarter
                                )}
                              </div>
                              <div className="font-weight-bold text-gray-800 h5">
                                {statisticalUser.count_in_quarter} đơn
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 ">
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
                                  statisticalUser.total_after_discount_no_bonus_in_year
                                )}
                              </div>
                              <div className="font-weight-bold text-gray-800 h5">
                                {statisticalUser.count_in_year} đơn
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-7">
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
                  <span
                    className="font-weight-bold"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    Thưởng theo mức doanh số theo{" "}
                    {statisticalUser?.sale_config?.type_bonus_period == 0
                      ? "tháng"
                      : statisticalUser?.sale_config?.type_bonus_period == 1
                      ? "tuần"
                      : statisticalUser?.sale_config?.type_bonus_period == 2
                      ? "quý"
                      : statisticalUser?.sale_config?.type_bonus_period == 3
                      ? "năm"
                      : ""}
                  </span>
                </div>

                {statisticalUser?.steps_bonus?.length > 0 && (
                  <div>
                    {statisticalUser.steps_bonus.map((step, index) => (
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
          )}
        </SidebarShowStatisticalStyles>
      </SidebarFilter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    statisticalUser: state.saleReducers.sale.statisticalUser,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarShowStatisticalSale);
