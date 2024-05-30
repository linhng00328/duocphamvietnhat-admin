import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as saleAction from "../../../actions/sale";
import { format } from "../../../ultis/helpers";

const StatisticalStyles = styled.div``;

class Statistical extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { fetchStatisticalSale, store_code } = this.props;
    fetchStatisticalSale(store_code);
  }
  render() {
    const { statistical, user, store_code } = this.props;
    return (
      <StatisticalStyles className="statistical__sale">
        <div className="mb-4">
          <h4 class="h4 title_content mb-0 text-gray-800">Doanh số của tôi</h4>
        </div>
        <div className="statistical__content">
          <div class="row">
            <div class="col-xl-4 col-md-6 mb-4 ">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body set-padding">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div>
                        <Link
                          class=" font-weight-bold text-success text-uppercase mb-1"
                          to={`/statistical/${store_code}`}
                        >
                          Doanh thu hôm nay
                        </Link>
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {format(statistical.total_final_in_day)}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-money-bill text-gray-300 fa-2x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6 mb-4 ">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body set-padding">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class=" font-weight-bold text-primary text-uppercase mb-1">
                        <Link
                          to={`/cusSale/${store_code}/order?from=${moment().format(
                            "DD-MM-YYYY"
                          )}&to=${moment().format("DD-MM-YYYY")}`}
                        >
                          Đơn hàng hôm nay
                        </Link>
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {statistical.count_in_day}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-file-invoice fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6 mb-4 ">
              <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body set-padding">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div>
                        <Link
                          class=" font-weight-bold text-warning text-uppercase mb-1"
                          to={`/customer/${store_code}/customerSale`}
                        >
                          Khách hàng
                        </Link>
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {user.total_customers}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-user-alt fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StatisticalStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducers.user.userID,
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
