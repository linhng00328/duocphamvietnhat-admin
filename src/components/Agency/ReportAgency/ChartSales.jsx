import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { format } from "../../../ultis/helpers";
import moment from "moment";
import * as helper from "../../../ultis/helpers";
import * as reportAction from "../../../actions/report";
// import DetailPayment from "./DetailPayment";
// import DetailOrder from "./DetailOrder";
import { connect } from "react-redux";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import ModalPostDate from "../../Report/ModalPostDate";
import * as customerAction from "../../../actions/customer";
import { getBranchId } from "../../../ultis/branchUtils";

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      chartDataPrime: { labels: [], datasets: [{}] },
      nameTypeChart: "THÁNG NÀY",
      showDateTime: "hide",
      typeDate: "",
      nameTypeDate: "Hôm nay ngày: " + moment().format("DD-MM-YYYY"),
      chartDataCompare: { labels: [], datasets: [{}] },
      chartData: { labels: [], datasets: [{}, {}] },
      datePrime: "",
      dateCompare: "",
      chart: "",
      typeChartShow: "PRIME",
      reset: "",
      isCompare: false,
      actionChart: "total_final",
      typeSelect: "Hôm nay",
    };
  }

  getData = (
    _overview,
    _chartDataPrime,
    _chartDataCompare,
    _chartData,
    _actionChart
  ) => {
    var actionChart = _actionChart;
    console.log(actionChart);
    var typeChartShow = "PRIME";
    var time = "";
    var parseNumberTime = 0;
    var chartDataProps = _overview;
    var chartDataState_prime = { ..._chartDataPrime };
    var chartDataState_compare = { ..._chartDataCompare };
    var chartData = { ..._chartData };
    var labels_prime = [];
    var dataSets_prime = [];
    chartDataProps.data_prime_time?.charts.forEach((item) => {
      dataSets_prime.push(item[actionChart]);
      if (chartDataProps.data_prime_time.type_chart == "hour") {
        time = moment(item.time, "YYYY-MM-DD HH:mm:ss").format("HH");
        parseNumberTime = Number(time) + "h";
        labels_prime.push(parseNumberTime);
      } else if (chartDataProps.data_prime_time.type_chart == "day") {
        time = moment(item.time, "YYYY-MM-DD").format("DD/MM");
        labels_prime.push(time);
      } else if (chartDataProps.data_prime_time.type_chart == "month") {
        time = moment(item.time, "YYYY-MM").format("MM/YYYY");
        parseNumberTime = time;
        labels_prime.push(parseNumberTime);
      }
    });
    chartDataState_prime.datasets[0].data = dataSets_prime;
    chartDataState_prime.datasets[0].backgroundColor = "#17a2b8";
    chartDataState_compare.datasets[0].label = "prime_date";

    chartDataState_prime.labels = labels_prime;

    if (chartDataProps.data_compare_time != null) {
      var labels_compare = [];
      var dataSets_compare = [];
      chartDataProps.data_compare_time.charts.forEach((item) => {
        console.log(item);
        dataSets_compare.push(item[actionChart]);
        if (chartDataProps.data_compare_time.type_chart == "hour") {
          time = moment(item.time, "YYYY-MM-DD HH:mm:ss").format("HH");
          parseNumberTime = Number(time) + "h";
          labels_compare.push(parseNumberTime);
        } else if (chartDataProps.data_compare_time.type_chart == "day") {
          time = moment(item.time, "YYYY-MM-DD").format("DD/MM");
          labels_compare.push(time);
        } else if (chartDataProps.data_compare_time.type_chart == "month") {
          time = moment(item.time, "YYYY-MM").format("MM/YYYY");
          parseNumberTime = time;
          labels_compare.push(parseNumberTime);
        }
      });

      chartDataState_compare.datasets[0].data = dataSets_compare;
      chartDataState_compare.datasets[0].backgroundColor = "red";
      chartDataState_compare.datasets[0].label = "compare_date";

      chartDataState_compare.labels = labels_compare;
    }

    if (chartDataProps.data_compare_time != null) {
      var dataSets_all_prime = [];
      var labels_all = [...chartDataState_prime.labels];
      chartDataState_compare.labels.forEach((item) => {
        var check = false;
        for (const _item of labels_all) {
          console.log(_item, item, _item == item);
          if (item == _item) {
            check = false;
            break;
          } else {
            check = item;
          }
        }
        if (check != false) {
          console.log(check);
          labels_all.push(check);
        }
      });
      if (chartDataProps.data_compare_time.type_chart == "day") {
        labels_all.sort((a, b) =>
          moment(a, "DD/MM").isBefore(moment(b, "DD/MM")) ? -1 : 1
        );
      }
      if (chartDataProps.data_compare_time.type_chart == "hour") {
        labels_all.sort((a, b) =>
          moment(a.replace("h", ""), "HH").isBefore(
            moment(b.replace("h", ""), "HH")
          )
            ? -1
            : 1
        );
      }
      if (chartDataProps.data_compare_time.type_chart == "month") {
        labels_all.sort((a, b) =>
          moment(a, "MM/YYYY").isBefore(moment(b, "MM/YYYY")) ? -1 : 1
        );
      }
      var dataSets_all_prime = [];
      var dataSets_all_compare = [];
      var check_prime = false;
      var check_compare = false;
      labels_all.forEach((item) => {
        for (let [index, _item] of chartDataState_prime.labels.entries()) {
          if (item == _item) {
            check_prime = true;
            dataSets_all_prime.push(
              chartDataState_prime.datasets[0].data[index]
            );
            break;
          } else {
          }
        }
        if (check_prime == false) {
          dataSets_all_prime.push(0);
        }
        for (let [index, _item] of chartDataState_compare.labels.entries()) {
          if (item == _item) {
            check_compare = true;

            dataSets_all_compare.push(
              chartDataState_compare.datasets[0].data[index]
            );
            break;
          } else {
          }
        }
        if (check_compare == false) {
          dataSets_all_compare.push(0);
        }
      });
      typeChartShow = "ALL";
      chartData.labels = labels_all;
      chartData.datasets[0].data = dataSets_all_prime;
      chartData.datasets[0].backgroundColor = "blue";
      chartData.datasets[0].label = "prime";

      chartData.datasets[1].data = dataSets_all_compare;
      chartData.datasets[1].backgroundColor = "red";
      chartData.datasets[1].label = "compare";
    }
    this.setState({
      chartDataPrime: chartDataState_prime,
      chartDataCompare: chartDataState_compare,
      chartData: chartData,
      typeChartShow: typeChartShow,
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(nextProps.overview, this.props.overview) ||
      this.state.actionChart != nextState.actionChart
    ) {
      this.getData(
        nextProps.overview,
        this.state.chartDataPrime,
        this.state.chartDataCompare,
        this.state.chartData,
        nextState.actionChart
      );
      // var actionChart = nextState.actionChart
      // console.log(actionChart)
      // var typeChartShow = "PRIME"
      // var time = "";
      // var parseNumberTime = 0;
      // var chartDataProps = nextProps.overview;
      // var chartDataState_prime = { ...this.state.chartDataPrime };
      // var chartDataState_compare = { ...this.state.chartDataCompare };
      // var chartData = { ...this.state.chartData }
      // var labels_prime = [];
      // var dataSets_prime = [];
      // chartDataProps.data_prime_time.charts.forEach((item) => {
      //     dataSets_prime.push(item[actionChart]);
      //     if (chartDataProps.data_prime_time.type_chart == "hour") {
      //         time = moment(item.time, "YYYY-MM-DD HH:mm:ss").format("HH");
      //         parseNumberTime = Number(time) + "h";
      //         labels_prime.push(parseNumberTime);
      //     } else if (chartDataProps.data_prime_time.type_chart == "day") {
      //         time = moment(item.time, "YYYY-MM-DD").format("DD/MM");
      //         labels_prime.push(time);
      //     } else if (chartDataProps.data_prime_time.type_chart == "month") {
      //         time = moment(item.time, "YYYY-MM").format("MM/YYYY");
      //         parseNumberTime = time;
      //         labels_prime.push(parseNumberTime);
      //     }
      // });
      // chartDataState_prime.datasets[0].data = dataSets_prime;
      // chartDataState_prime.datasets[0].backgroundColor = "#17a2b8"
      // chartDataState_compare.datasets[0].label = "prime_date"

      // chartDataState_prime.labels = labels_prime;

      // if (chartDataProps.data_compare_time != null) {
      //     var labels_compare = [];
      //     var dataSets_compare = [];
      //     chartDataProps.data_compare_time.charts.forEach((item) => {
      //         console.log(item)
      //         dataSets_compare.push(item[actionChart]);
      //         if (chartDataProps.data_compare_time.type_chart == "hour") {
      //             time = moment(item.time, "YYYY-MM-DD HH:mm:ss").format("HH");
      //             parseNumberTime = Number(time) + "h";
      //             labels_compare.push(parseNumberTime);
      //         } else if (chartDataProps.data_compare_time.type_chart == "day") {
      //             time = moment(item.time, "YYYY-MM-DD").format("DD/MM");
      //             labels_compare.push(time);
      //         } else if (chartDataProps.data_compare_time.type_chart == "month") {
      //             time = moment(item.time, "YYYY-MM").format("MM/YYYY");
      //             parseNumberTime = time;
      //             labels_compare.push(parseNumberTime);
      //         }
      //     });

      //     chartDataState_compare.datasets[0].data = dataSets_compare;
      //     chartDataState_compare.datasets[0].backgroundColor = "red"
      //     chartDataState_compare.datasets[0].label = "compare_date"

      //     chartDataState_compare.labels = labels_compare;

      // }

      // if (chartDataProps.data_compare_time != null) {
      //     var dataSets_all_prime = [];
      //     var labels_all = [...chartDataState_prime.labels]
      //     chartDataState_compare.labels.forEach(item => {
      //         var check = false;
      //         for (const _item of labels_all) {
      //             console.log(_item, item, _item == item)
      //             if (item == _item) {
      //                 check = false;
      //                 break
      //             }
      //             else {
      //                 check = item
      //             }

      //         }
      //         if (check != false) {
      //             console.log(check)
      //             labels_all.push(check)
      //         }
      //     })
      //     if (chartDataProps.data_compare_time.type_chart == "day") {
      //         labels_all.sort((a, b) =>
      //             moment(a, 'DD/MM').isBefore(moment(b, 'DD/MM')) ? -1 : 1

      //         )
      //     }
      //     if (chartDataProps.data_compare_time.type_chart == "hour") {
      //         labels_all.sort((a, b) =>
      //             moment(a.replace("h", ""), 'HH').isBefore(moment(b.replace("h", ""), 'HH')) ? -1 : 1

      //         )
      //     }
      //     if (chartDataProps.data_compare_time.type_chart == "month") {
      //         labels_all.sort((a, b) =>
      //             moment(a, 'MM/YYYY').isBefore(moment(b, 'MM/YYYY')) ? -1 : 1

      //         )
      //     }
      //     var dataSets_all_prime = [];
      //     var dataSets_all_compare = [];
      //     var check_prime = false;
      //     var check_compare = false
      //     labels_all.forEach(item => {

      //         for (let [index, _item] of chartDataState_prime.labels.entries()) {
      //             if (item == _item) {
      //                 check_prime = true
      //                 dataSets_all_prime.push(chartDataState_prime.datasets[0].data[index])
      //                 break
      //             }
      //             else {
      //             }

      //         }
      //         if (check_prime == false) {
      //             dataSets_all_prime.push(0)

      //         }
      //         for (let [index, _item] of chartDataState_compare.labels.entries()) {
      //             if (item == _item) {
      //                 check_compare = true

      //                 dataSets_all_compare.push(chartDataState_compare.datasets[0].data[index])
      //                 break
      //             }
      //             else {
      //             }

      //         }
      //         if (check_compare == false) {
      //             dataSets_all_compare.push(0)

      //         }
      //     })
      //     typeChartShow = "ALL"
      //     chartData.labels = labels_all
      //     chartData.datasets[0].data = dataSets_all_prime
      //     chartData.datasets[0].backgroundColor = "blue"
      //     chartData.datasets[0].label = "prime"

      //     chartData.datasets[1].data = dataSets_all_compare
      //     chartData.datasets[1].backgroundColor = "red"
      //     chartData.datasets[1].label = "compare"

      // }
      // this.setState({
      //     chartDataPrime: chartDataState_prime, chartDataCompare: chartDataState_compare, chartData: chartData, typeChartShow: typeChartShow
      // });
    }
    return true;
  }

  getChartData() {
    this.setState({
      chartData: {
        labels: [],
        datasets: [
          {
            lineWidth: 10,
            label: "Doanh thu",
            data: [],
            backgroundColor: "#17a2b8",
          },
          {},
        ],
      },
    });
  }

  componentDidMount() {
    var { agency_by_customer_id, store_code } = this.props;
    this.getData(
      this.props.overview,
      this.state.chartDataPrime,
      this.state.chartDataCompare,
      this.state.chartData,
      this.state.actionChart
    );

    if (agency_by_customer_id != null) {
      console.log(agency_by_customer_id);
      this.props.fetchCustomerId(store_code, agency_by_customer_id);
    }

    var date = helper.getDateForChartDay();

    this.setState({
      datePrime: {
        from: date.from,
        to: date.to,
        datePrime: {
          from: moment().format("DD-MM-YYYY"),
          to: moment().format("DD-MM-YYYY"),
        },
      },
    });
  }
  onchangeDate = (value) => {
    var resetId = helper.randomString(10);

    this.setState({ typeDate: value, reset: resetId });
  };

  handleGetDatePost = (date, typeSelect) => {
    this.setState({
      datePrime: {
        from: date.datePrime.from,
        to: date.datePrime.to,
      },
      dateCompare: {
        from: date.dateCompare.from,
        to: date.dateCompare.to,
      },
      isCompare: date.isCompare,
      typeSelect: typeSelect,
    });
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
    var { store_code, agency_by_customer_id } = this.props;
    this.props.fetchOverview(
      store_code,
      `?date_from=${from}&date_to=${to}&agency_by_customer_id=${agency_by_customer_id}`
    );
  };
  fromPrime = () => {
    this.setState({
      typeChartShow: "PRIME",
    });
  };
  fromCompare = () => {
    this.setState({
      typeChartShow: "COMPARE",
    });
  };
  fromAllDate = () => {
    this.setState({
      typeChartShow: "ALL",
    });
  };
  showData = () => {
    var { typeChartShow, chartDataPrime, chartDataCompare, chartData } =
      this.state;

    switch (typeChartShow) {
      case "PRIME":
        return chartDataPrime;
      case "COMPARE":
        return chartDataCompare;
      case "ALL":
        return chartData;
      default:
        break;
    }
  };
  actionChart = (action) => {
    this.setState({ actionChart: action });
  };
  render() {
    var {
      nameTypeChart,
      showDateTime,
      typeDate,
      reset,
      dateCompare,
      datePrime,
      isCompare,
      actionChart,
      typeSelect,
    } = this.state;
    var { overview, badges, store_code } = this.props;
    console.log(
      this.state.chartDataCompare,
      this.state.chartDataPrime,
      this.state.chartData
    );

    var totalFinal =
      typeof overview.data_prime_time != "undefined"
        ? format(Number(overview.data_prime_time.total_after_discount_no_bonus))
        : 0;
    var total_order_count =
      typeof overview.data_prime_time != "undefined"
        ? overview.data_prime_time.total_order_count
        : 0;

    var disbleCompare =
      isCompare == false || isCompare == "hide" ? "hide" : "show";
    var _textLegendPrime_from = moment(datePrime.from, "YYYY-MM-DD").format(
      "DD-MM-YYYY"
    );
    var _textLegendPrime_to = moment(datePrime.to, "YYYY-MM-DD").format(
      "DD-MM-YYYY"
    );
    var _textLegendCompare_from = moment(dateCompare.from, "YYYY-MM-DD").format(
      "DD-MM-YYYY"
    );
    var _textLegendCompare_to = moment(dateCompare.to, "YYYY-MM-DD").format(
      "DD-MM-YYYY"
    );

    var textLegendPrime =
      _textLegendPrime_from == _textLegendPrime_to
        ? _textLegendPrime_from
        : _textLegendPrime_from + " đến " + _textLegendPrime_to;
    var textLegendCompare =
      _textLegendCompare_from == _textLegendCompare_to
        ? _textLegendCompare_from
        : _textLegendCompare_from + " đến " + _textLegendCompare_to;

    return (
      <div className="chart">
        <ModalPostDate
          agency_by_customer_id={this.props.agency_by_customer_id}
          reset={reset}
          handleGetDatePost={this.handleGetDatePost}
          store_code={store_code}
          typeDate={typeDate}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h5 style={{ display: "flex" }}>
            BÁO CÁO ĐẠI LÝ
            <div style={{ paddingLeft: "20px" }}>
              <i class="fas fa-arrow-circle-right"></i>
              <span
                style={{
                  color: "#17a2b8",
                  paddingLeft: "10px",
                }}
              >
                {this.props.customer?.name}
              </span>
            </div>
          </h5>

          <div className={showDateTime}>
            <DateRangePickerComponent
              id="daterangepicker"
              placeholder="Chọn từ ngày... đến ngày..."
              format="dd/MM/yyyy"
              onChange={this.onchangeDateFromTo}
            />
          </div>
          <div class="dropdown">
            <button
              style={{
                background: "white",
                border: "0px",
                color: "#4141bb",
              }}
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {typeSelect}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("DAY")}
                class="dropdown-item"
              >
                Ngày
              </a>
              <a
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("WEEK")}
                class="dropdown-item"
              >
                Tuần{" "}
              </a>
              <a
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("MONTH")}
                class="dropdown-item"
              >
                Tháng
              </a>
              <a
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("YEAR")}
                class="dropdown-item"
              >
                Năm
              </a>
              <a
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("OPTION")}
                class="dropdown-item"
              >
                Tùy chỉnh
              </a>
            </div>
          </div>
        </div>
        <br></br>
        <div class="row">
          <div
            class="col-xs-4  col-sm-12 col-md-12 col-lg-4"
            style={{ borderRight: "1px solid #c0bfbf" }}
          >
            {/* <DetailPayment
              overview={overview}
              badges={badges}
              store_code={store_code}
            /> */}
          </div>
          <div class="col-xs-8 col-sm-12 col-md-12 col-lg-8">
            {/* <DetailOrder
              overview={overview}
              badges={badges}
              store_code={store_code}
            /> */}
          </div>
        </div>
        <br></br>

        <div class="row">
          <div
            class="col-xl-6 col-lg-6"
            onClick={() => {
              this.actionChart("total_final");
            }}
          >
            <div class="card card-stats mb-4 mb-xl-0">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title card-size text-uppercase text-muted mb-0">
                      Tổng tiền hàng
                    </h5>
                    <span class="h2 card-h2 font-weight-bold mb-0">
                      {totalFinal}
                    </span>
                  </div>
                  <div class="col-auto">
                    <div class="icon icon-shape bg-danger text-white rounded-circle shadow">
                      <i class="fas fa-chart-bar"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-xl-6 col-lg-6"
            onClick={() => {
              this.actionChart("total_order_count");
            }}
          >
            <div class="card card-stats mb-4 mb-xl-0">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title card-size text-uppercase text-muted mb-0">
                      Số đơn hàng
                    </h5>
                    <span class="h2 card-h2 font-weight-bold mb-0">
                      {total_order_count}
                    </span>
                  </div>
                  <div class="col-auto">
                    <div class="icon icon-shape bg-warning text-white rounded-circle shadow">
                      <i class="fas fa-chart-pie"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div class="col-xl-4 col-lg-4" onClick={() => { this.actionChart("total_collaborator_reg_count") }}>
            <div class="card card-stats mb-4 mb-xl-0">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title card-size text-uppercase text-muted mb-0">
                      Số CTV tăng
                    </h5>
                    <span class="h2  card-h2 font-weight-bold mb-0">
                      {total_collaborator_reg_count}
                    </span>
                  </div>
                  <div class="col-auto">
                    <div class="icon icon-shape bg-yellow text-white rounded-circle shadow">
                      <i class="fas fa-users"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <br></br>

        <br></br>

        <div
          class="legend"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {/* <div className={disbleCompare} style={{ display: "flex", justifyContent: "center", margin: "0 20px" }}>
                        <div
                            onClick={this.fromAllDate}
                            style={{
                                width: "54px",
                                height: "15px",
                                background: "rgb(142 150 151)",
                                margin: "auto"

                            }}></div>
                        <span>&nbsp;&nbsp; Tất cả</span>

                    </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0 20px",
            }}
          >
            <div
              onClick={this.fromPrime}
              style={{
                width: "54px",
                height: "15px",
                background: "#17a2b8",
                margin: "auto",
              }}
            ></div>
            <span>&nbsp;&nbsp; {textLegendPrime}</span>
          </div>
          {this.props.overview?.data_compare_time != null &&
            typeof this.props.overview?.data_compare_time != "undefined" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "0 20px",
                }}
              >
                <div
                  onClick={this.fromCompare}
                  style={{
                    width: "54px",
                    height: "15px",
                    background: "red",
                    margin: "auto",
                  }}
                ></div>
                <span> &nbsp;&nbsp;{textLegendCompare}</span>
              </div>
            )}

          {/* <button onClick={this.fromAllDate} type="button" class="btn btn-default">tất cả</button>
          <button onClick={this.fromPrime} type="button" class="btn btn-default">from</button>
          <button onClick={this.fromCompare} type="button" class="btn btn-default">to</button> */}
        </div>

        <Bar
          data={this.showData}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                      if (actionChart == "total_final") return format(value);
                      return value;
                    },
                  },
                },
              ],
            },
            legend: {
              display: false,
              onClick: function (event, legendtItem) {},
              position: "bottom",
              labels: {
                strokeStyle: "red",
              },
            },
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    customer: state.customerReducers.customer.customerID,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  var branch_id = getBranchId();
  return {
    fetchOverview: (store_code, params) => {
      dispatch(reportAction.fetchOverview(store_code, branch_id, params));
    },
    fetchCustomerId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerId(store_code, customerId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chart);
