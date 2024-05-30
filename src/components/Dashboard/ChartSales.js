import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { shallowEqual } from "../../ultis/shallowEqual";
import { format } from "../../ultis/helpers";
import moment from "moment";
import * as helper from "../../ultis/helpers";
import * as dashboardAction from "../../actions/dashboard";
import { connect } from "react-redux";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { getBranchId } from "../../ultis/branchUtils";

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
    };
  }

  componentWillMount() {
    this.loadData(this.props.overview);
  }

  loadData = (overview) => {
    var time = "";
    var parseNumberTime = 0;
    var chartDataProps = overview;
    var chartDataState = { ...this.state.chartData };
    var labels = [];
    var dataSets = [];
    (chartDataProps?.data_prime_time?.charts ?? []).forEach((item) => {
      dataSets.push(item.total_final);
      if (chartDataProps.data_prime_time.type_chart == "hour") {
        time = moment(item.time, "YYYY-MM-DD HH:mm:ss").format("HH");
        parseNumberTime = Number(time) + "h";
        labels.push(parseNumberTime);
      } else if (chartDataProps.data_prime_time.type_chart == "day") {
        time = moment(item.time, "YYYY-MM-DD").format("DD/MM");
        labels.push(time);
      } else if (chartDataProps.data_prime_time.type_chart == "month") {
        time = moment(item.time, "YYYY-MM").format("MM/YYYY");
        parseNumberTime = time;
        labels.push(parseNumberTime);
      }
    });
    chartDataState.datasets[0].data = dataSets;

    chartDataState.labels = labels;

    this.setState({ chartData: chartDataState });
  };

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.overview, this.props.overview)) {
      this.loadData(nextProps.overview);
    }
  }

  // getChartData() {
  //   this.setState({
  //     chartData: {
  //       labels: [],
  //       datasets: [
  //         {
  //           label: "Doanh thu",
  //           data: [],
  //           backgroundColor: "#17a2b8",
  //         },
  //       ],
  //     },
  //   });
  // }

  componentDidMount() {
    // this.getChartData();
  }
  onchangeDate = (e) => {
    console.log(e);
    var { value } = e.target;

    var date = "";
    switch (value) {
      case "HOM-NAY":
        this.setState({ nameTypeChart: "HÔM NAY" });
        date = helper.getDateForChartHour();
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
      this.props.fetchOverview(
        store_code,
        `?date_from=${date.from}&date_to=${date.to}`
      );
  };

  showModal = () => {
    window.$("#postDateModal").modal("show");
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
    this.props.fetchOverview(store_code, `?date_from=${from}&date_to=${to}`);
  };
  render() {
    var { nameTypeChart, showDateTime } = this.state;
    var { overview } = this.props;
    var totalFinal =
      typeof overview.data_prime_time != "undefined"
        ? format(Number(overview.data_prime_time.total_final))
        : 0;
    console.log(this.props.overview, this.state.chartData);
    return (
      <div className="chart">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h5 style={{ display: "flex" }}>
            DOANH THU {nameTypeChart}
            <div style={{ paddingLeft: "20px" }}>
              <i class="fas fa-arrow-circle-right"></i>
              <span
                style={{
                  color: "#17a2b8",
                  paddingLeft: "10px",
                }}
              >
                {totalFinal}
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
          <select
            onChange={this.onchangeDate}
            style={{ maxWidth: "170px" }}
            name=""
            id="input"
            class="form-control"
            required="required"
          >
            <option value="THANG-NAY">Tháng này</option>
            <option value="HOM-NAY">Hôm nay</option>
            <option value="TUAN-NAY">Tuần này</option>
            <option value="NAM-NAY">Năm này</option>
            <option value="TUY-CHINH">Tùy chỉnh</option>
          </select>
        </div>
        <br></br>
        <Bar
          data={this.state.chartData}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                      return format(value);
                    },
                  },
                },
              ],
            },
            legend: {
              position: "bottom",
              onClick: () => {},
            },
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  var branch_id = getBranchId();
  return {
    fetchOverview: (store_code, params) => {
      dispatch(dashboardAction.fetchOverview(store_code, branch_id, params));
    },
  };
};
export default connect(null, mapDispatchToProps)(Chart);
