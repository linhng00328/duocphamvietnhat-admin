import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import * as helper from "../../ultis/helpers";
import ModalPostDate from "./ModalPostDates";
import { connect } from "react-redux";
import * as reportAction from "../../actions/report";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";
import history from "../../history";

class ChartFinance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartDataPrime: {
        labels: [],
        datasets: [{ backgroundColor: ["blue", "red"] }],
      },
      datePrime: "",
      dateCompare: "",
      typeDate: "",
      reset: "",
      typeSelect: helper.getQueryParams("typeSelect") || "Hôm nay",
    };
  }
  componentDidMount() {
    this.setState({
      datePrime: {
        from:
          helper.getQueryParams("date_from") || moment().format("YYYY-MM-DD"),
        to: helper.getQueryParams("date_to") || moment().format("YYYY-MM-DD"),
      },
      dateCompare: {
        from: moment().subtract(1, "days").format("YYYY-MM-DD"),
        to: moment().subtract(1, "days").format("YYYY-MM-DD"),
      },
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.datePrime !== nextState.datePrime) {
      const branch_id = getBranchId();
      const branch_ids = getBranchIds();
      const branchIds = branch_ids ? branch_ids : branch_id;
      console.log(nextState.datePrime.from, nextState.datePrime.to);
      var datePrime_from = moment(nextState.datePrime.from).format(
        "YYYY-MM-DD"
      );
      var datePrime_to = moment(nextState.datePrime.to).format("YYYY-MM-DD");
      var dateCompare_from = moment(nextState.dateCompare.from).format(
        "YYYY-MM-DD"
      );
      var dateCompare_to = moment(nextState.dateCompare.to).format(
        "YYYY-MM-DD"
      );

      const params1 = `date_from=${datePrime_from}&date_to=${datePrime_to}${
        branch_ids ? "" : `&branch_id=${branch_id}`
      }`;
      const params2 = `date_from=${dateCompare_from}&date_to=${dateCompare_to}${
        branch_ids ? "" : `&branch_id=${branch_id}`
      }`;
      const { store_code } = this.props;

      const paramsDate = `&date_from=${datePrime_from}&date_to=${datePrime_to}`;

      this.props.fetchReportExpenditure(store_code, branchIds, 1, paramsDate);
      this.props.fetchAllSupplierDebt(store_code, branchIds, 1, paramsDate);
      this.props.fetchAllCustomerDebt(store_code, branchIds, 1, paramsDate);
      this.props.fetchReportProfit(store_code, branchIds, params1);
      this.props.fetchReportProfitCompare(store_code, branchIds, params2);
    }
    return true;
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.reportProfit !== nextProps.reportProfit ||
      this.props.compareProfit !== nextProps.compareProfit
    ) {
      var chartDataState_prime = { ...this.state.chartDataPrime };
      const { datePrime, dateCompare } = this.state;
      console.log(datePrime, dateCompare);
      const showDateChoose = datePrime.from + " - " + datePrime.to;
      const showDateCopare = dateCompare.from + " - " + dateCompare.to;
      const showDataCopare = nextProps.reportProfit.profit;
      const showDataChoose = nextProps.compareProfit.profit;
      chartDataState_prime.labels = [showDateCopare, showDateChoose];

      chartDataState_prime.datasets[0].data = [showDataChoose, showDataCopare];
      // chartDataState_prime.datasets[0].backgroundColor = "blue";
      // chartDataState_prime.datasets[0].label = "Lợi nhuận";

      this.setState({ chartDataPrime: chartDataState_prime });
      this.props.handleCallbackProfit(nextProps.reportProfit.profit);
    }
  }
  handleGetDatePost = (date, typeSelect) => {
    this.setState({
      datePrime: {
        from: date.datePrime.from,
        to: date.datePrime.to,
      },
      dateCompare: {
        from: date.dateCompare?.from ?? null,
        to: date.dateCompare?.to ?? null,
      },
      isCompare: date.dateCompare?.from != null ? date.isCompare : false,
      typeSelect: typeSelect,
    });

    history.push(
      `?date_from=${date?.datePrime?.from}&date_to=${date?.datePrime?.to}&typeSelect=${typeSelect}`
    );
  };
  onchangeDate = (value) => {
    var resetId = helper.randomString(10);

    this.setState({ typeDate: value, reset: resetId });
  };

  showData = () => {
    const { chartDataPrime } = this.state;
    return chartDataPrime;
  };
  render() {
    const { store_code } = this.props;
    const { typeDate, reset, typeSelect } = this.state;
    return (
      <div className="chart">
        <ModalPostDate
          reset={reset}
          handleGetDatePost={this.handleGetDatePost}
          store_code={store_code}
          typeDate={typeDate}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h5 style={{ display: "flex" }}>
            LỢI NHUẬN
            <div style={{ paddingLeft: "20px" }}>
              <i class="fas fa-arrow-circle-right"></i>
              <span
                style={{
                  color: "#17a2b8",
                  paddingLeft: "10px",
                }}
              >
                {helper.format(Number(this.props.reportProfit.profit))}
              </span>
            </div>
          </h5>
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
              <p
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("DAY")}
                class="dropdown-item"
                style={{ cursor: "pointer" }}
              >
                Ngày
              </p>
              <p
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("WEEK")}
                class="dropdown-item"
                style={{ cursor: "pointer" }}
              >
                Tuần{" "}
              </p>
              <p
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("MONTH")}
                class="dropdown-item"
                style={{ cursor: "pointer" }}
              >
                Tháng
              </p>
              <p
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("YEAR")}
                class="dropdown-item"
                style={{ cursor: "pointer" }}
              >
                Năm
              </p>
              <p
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("OPTION")}
                class="dropdown-item"
                style={{ cursor: "pointer" }}
              >
                Tùy chỉnh
              </p>
            </div>
          </div>
        </div>
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
              style={{
                width: "54px",
                height: "15px",
                background: "blue",
                margin: "auto",
              }}
            ></div>
            <span>&nbsp;&nbsp; Lợi nhuận</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0 20px",
            }}
          >
            <div
              style={{
                width: "54px",
                height: "15px",
                background: "red",
                margin: "auto",
              }}
            ></div>
            <span>&nbsp;&nbsp; Lợi nhuận</span>
          </div>
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
                  },
                },
              ],
              xAxes: [
                {
                  maxBarThickness: 100,
                },
              ],
            },
            legend: {
              display: false,
            },
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    reportProfit: state.reportReducers.reportProfit,
    compareProfit: state.reportReducers.compareProfit,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchReportProfit: (store_code, branch_id, params) => {
      dispatch(reportAction.fetchReportProfit(store_code, branch_id, params));
    },
    fetchReportProfitCompare: (store_code, branch_id, params) => {
      dispatch(
        reportAction.fetchReportProfitCompare(store_code, branch_id, params)
      );
    },
    fetchReportExpenditure: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.fetchReportExpenditure(store_code, branch_id, page, params)
      );
    },
    fetchAllSupplierDebt: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.fetchAllSupplierDebt(store_code, branch_id, page, params)
      );
    },
    fetchAllCustomerDebt: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.fetchAllCustomerDebt(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChartFinance);
