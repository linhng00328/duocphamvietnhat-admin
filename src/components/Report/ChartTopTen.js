import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { shallowEqual } from "../../ultis/shallowEqual";
import { format } from "../../ultis/helpers";
import moment from "moment";
import * as helper from "../../ultis/helpers";
import * as reportAction from "../../actions/report";
import { connect } from "react-redux";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";

import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Doanh thu",
            data: [],
            backgroundColor: "#17a2b8",
          },
        ],
      },
      nameTypeChart: "THÁNG NÀY",
      showDateTime: "hide",
      typeTop: "THEO-DOANH-THU",
      typeDate: "HOM-NAY",
    };
  }

  getData = (topten, chartData, typeTop) => {
    var chartDataProps = { ...topten };
    var chartDataState = { ...chartData };
    var labels = [];
    var dataSets = [];
    var typeTop = typeTop;
    var action = "total_price";
    var label = "Doanh thu";
    if (typeTop == "THEO-DOANH-THU") {
      action = "total_price";
      label = "Doanh thu";
    }
    if (typeTop == "THEO-SO-LUONG") {
      action = "total_items";
      label = "Số lượng";
    }
    if (typeTop == "THEO-SO-DON") {
      action = "number_of_orders";
      label = "Số đơn";
    }
    if (typeTop == "THEO-LUOT-XEM") {
      action = "view";
      label = "Lượt xem";
    }

    chartDataProps[action]?.forEach((item) => {
      dataSets.push(item[action]);
      labels.push(item.product.name);
    });
    chartDataState.datasets[0].data = dataSets;
    chartDataState.labels = labels;
    chartDataState.datasets[0].label = label;
    this.setState({ chartData: chartDataState });
  };

  componentWillMount() {
    this.getData(this.props.topten, this.state.chartData, this.state.typeTop);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(this.props.topten, nextProps.topten) ||
      this.state.typeTop != nextState.typeTop
    ) {
      this.getData(nextProps.topten, nextState.chartData, nextState.typeTop);
    }
    return true;
  }

  // componentDidMount() {
  //   this.getChartData();

  // }

  onchangeTypeTop = (value) => {
    this.setState({
      typeTop: value,
    });
  };

  onchangeDate = (e) => {
    console.log(e);
    var { value } = e.target;

    var date = "";
    switch (value) {
      case "HOM-NAY":
        this.setState({ nameTypeChart: "HÔM NAY" });
        date = helper.getDateForChartDay();
        break;
      case "TUAN-NAY":
        this.setState({ nameTypeChart: "TUẦN NÀY" });

        date = helper.getDateForChartWeek();
        break;
      case "THANG-NAY":
        this.setState({ nameTypeChart: "THÁNG NÀY" });

        date = helper.getDateForChartMonth();
        break;
      case "NAM-NAY":
        this.setState({ nameTypeChart: "NĂM NÀY" });
        date = helper.getDateForChartYear();
        break;
      case "TUY-CHINH":
        this.setState({ nameTypeChart: "", showDateTime: "show" });
        return;
      default:
        break;
    }
    if (this.state.showDateTime == "hide") {
    } else this.setState({ showDateTime: "hide" });

    var { store_code } = this.props;
    if (value != "TUY-CHINH")
      this.props.fetchTopTenProduct(
        store_code,
        `?date_from=${date.from}&date_to=${date.to}`
      );

    this.setState({ typeDate: value });
  };
  onchangeDateFromTo = (e) => {
    var from = "";
    var to = "";
    try {
      from = moment(e.value[0], "DD-MM-YYYY").format("YYYY-MM-DD");
      to = moment(e.value[1], "DD-MM-YYYY").format("YYYY-MM-DD");
    } catch (error) {
      var date = helper.getDateForChartMonth();
      var { from, to } = date;
    }
    var { store_code } = this.props;
    this.props.fetchTopTenProduct(
      store_code,
      `?date_from=${from}&date_to=${to}`
    );
  };
  render() {
    var { nameTypeChart, showDateTime, typeTop, typeDate } = this.state;
    var { topten } = this.props;
    console.log(topten);
    if (typeof topten.total_items != "undefined") {
      var total_items =
        topten.total_items.length > 0 ? topten.total_items[0].total_items : 0;
      var total_items_name =
        topten.total_items.length > 0 ? topten.total_items[0].product.name : "";
    }
    if (typeof topten.total_price != "undefined") {
      var total_price =
        topten.total_price.length > 0 ? topten.total_price[0].total_price : 0;
      var total_price_name =
        topten.total_price.length > 0 ? topten.total_price[0].product.name : "";
    }
    if (typeof topten.view != "undefined") {
      var view = topten.view.length > 0 ? topten.view[0].view : 0;
      var view_name = topten.view.length > 0 ? topten.view[0].product.name : "";
    }
    if (typeof topten.number_of_orders != "undefined") {
      var number_of_orders =
        topten.number_of_orders.length > 0
          ? topten.number_of_orders[0].number_of_orders
          : 0;
      var number_of_orders_name =
        topten.number_of_orders.length > 0
          ? topten.number_of_orders[0].product.name
          : "";
    }
    return (
      <div className="chart">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h5 style={{ display: "flex" }}>
            TOP 10 HÀNG HÓA BÁN CHẠY &nbsp;{nameTypeChart}
          </h5>

          <div className={showDateTime}>
            <DateRangePickerComponent
              id="daterangepicker"
              placeholder="Chọn từ ngày... đến ngày..."
              format="dd/MM/yyyy"
              onChange={this.onchangeDateFromTo}
            />
          </div>
          <select
            value={typeDate}
            onChange={this.onchangeDate}
            style={{ maxWidth: "170px" }}
            name=""
            id="input"
            class="form-control"
            required="required"
          >
            <option value="HOM-NAY">Hôm nay</option>
            <option value="TUAN-NAY">Tuần này</option>
            <option value="THANG-NAY">Tháng này</option>

            <option value="NAM-NAY">Năm này</option>
            <option value="TUY-CHINH">Tùy chỉnh</option>
          </select>
        </div>
        <br></br>

        <div class="row">
          <div
            class="col-xl-3 col-lg-3"
            onClick={() => {
              this.onchangeTypeTop("THEO-DOANH-THU");
            }}
          >
            <div class="card card-stats mb-4 mb-xl-0">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title card-size text-uppercase text-muted mb-0">
                      Top tổng thu
                    </h5>
                    <span class="h2  card-h2 font-weight-bold mb-0">
                      {format(Number(total_price))}
                    </span>
                  </div>
                  <div class="col-auto">
                    <div class="icon icon-shape bg-yellow text-white rounded-circle shadow">
                      <i class="fas fa-percent"></i>
                    </div>
                  </div>
                </div>
                <p class="mt-3 mb-0 text-muted text-sm">
                  <span class="">{total_price_name}</span>
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-xl-3 col-lg-3"
            onClick={() => {
              this.onchangeTypeTop("THEO-SO-LUONG");
            }}
          >
            <div class="card card-stats mb-4 mb-xl-0">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title card-size text-uppercase text-muted mb-0">
                      Top số lượng
                    </h5>
                    <span class="h2 card-h2 font-weight-bold mb-0">
                      {total_items}
                    </span>
                  </div>
                  <div class="col-auto">
                    <div class="icon icon-shape bg-danger text-white rounded-circle shadow">
                      <i class="fas fa-chart-bar"></i>
                    </div>
                  </div>
                </div>
                <p class="mt-3 mb-0 text-muted text-sm">
                  <span class="">{total_items_name}</span>
                </p>
              </div>
            </div>
          </div>

          {getChannel() == IKITECH && (
            <div
              class="col-xl-3 col-lg-3"
              onClick={() => {
                this.onchangeTypeTop("THEO-SO-DON");
              }}
            >
              <div class="card card-stats mb-4 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title card-size text-uppercase text-muted mb-0">
                        Top số đơn
                      </h5>
                      <span class="h2 card-h2 font-weight-bold mb-0">
                        {number_of_orders}
                      </span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-warning text-white rounded-circle shadow">
                        <i class="fas fa-chart-pie"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-muted text-sm">
                    <span class="">{number_of_orders_name}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {getChannel() == IKITECH && (
            <div
              class="col-xl-3 col-lg-3"
              onClick={() => {
                this.onchangeTypeTop("THEO-LUOT-XEM");
              }}
            >
              <div class="card card-stats mb-4 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title card-size text-uppercase text-muted mb-0">
                        Top lượt xem
                      </h5>
                      <span class="h2 card-h2 font-weight-bold mb-0">
                        {view}
                      </span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                        <i class="fas fa-percent"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-muted text-sm">
                    <span class="">{view_name}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <br></br>
        <HorizontalBar
          data={this.state.chartData}
          options={{
            scales: {
              xAxes: [
                {
                  ticks: {
                    beginAtZero: true,

                    callback: function (value, index, values) {
                      if (typeTop == "THEO-DOANH-THU") return format(value);

                      return value;
                    },
                  },
                },
              ],
            },
            legend: {
              position: "bottom",
              display: false,
            },
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const branch_id = getBranchId();
  const branch_ids = getBranchIds();
  const branchIds = branch_ids ? branch_ids : branch_id;
  return {
    fetchTopTenProduct: (store_code, params) => {
      dispatch(reportAction.fetchTopTenProduct(store_code, branchIds, params));
    },
  };
};
export default connect(null, mapDispatchToProps)(Chart);
