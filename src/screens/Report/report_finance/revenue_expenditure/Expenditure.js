import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from "../../../../components/Partials/Alert";
import Footer from "../../../../components/Partials/Footer";
import Sidebar from "../../../../components/Partials/Sidebar";
import Topbar from "../../../../components/Partials/Topbar";
import * as Types from "../../../../constants/ActionType";
import * as reportAction from "../../../../actions/report";
import { MomentInput } from "react-moment-input";
import moment from "moment";
import { format } from "../../../../ultis/helpers";
import Pagination from "./Pagination";
import history from "../../../../history";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { getBranchId } from "../../../../ultis/branchUtils";
import { getQueryParams } from "../../../../ultis/helpers";

class Expenditure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtStart: "",
      txtEnd: "",
      time_from: "",
      time_to: "",
    };
  }
  componentDidMount() {
    const { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    var params = `branch_id=${branch_id}`;
    var from = getQueryParams("from");
    var to = getQueryParams("to");
    var date_from = getQueryParams("date_from");
    var date_to = getQueryParams("date_to");
    if (from && to) {
      params =
        params +
        `&date_from=${moment(from, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        )}&time_to=${moment(to, "DD-MM-YYYY").format("YYYY-MM-DD")}`;
      this.setState({
        time_from: moment(from, "DD-MM-YYYY").format("YYYY-MM-DD"),
        time_to: moment(to, "DD-MM-YYYY").format("YYYY-MM-DD"),
      });
    } else if (date_from && date_to) {
      params += `&date_from=${date_from}&date_to=${date_to}`;
      this.setState({
        time_from: date_from,
        time_to: date_to,
      });
    } else {
      params =
        params +
        `&date_from=${moment().format("YYYY-MM-DD")}&time_to=${moment().format(
          "YYYY-MM-DD"
        )}`;
      this.setState({
        time_from: moment().format("YYYY-MM-DD"),
        time_to: moment().format("YYYY-MM-DD"),
      });
    }

    this.props.fetchReportExpenditure(store_code, branch_id, 1, params);
    try {
      document.getElementsByClassName("r-input")[0].placeholder = "Chọn ngày";
      document.getElementsByClassName("r-input")[1].placeholder = "Chọn ngày";
    } catch (error) {}
  }

  handleFindItem = () => {
    const branch_id = localStorage.getItem("branch_id");
    const params = `date_from=${this.state.txtStart}&date_to=${this.state.txtEnd}&branch_id=${branch_id}`;
    const { store_code } = this.props.match.params;
    this.props.fetchReportExpenditure(store_code, branch_id, 1, params);
  };

  onChangeStart = (e) => {
    var time = moment(e, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.setState({
      txtStart: time,
    });
  };
  onChangeEnd = (e) => {
    var time = moment(e, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.setState({
      txtEnd: time,
    });
  };
  onchangeDateFromTo = (e) => {
    var from = "";
    var to = "";
    try {
      from = moment(e.value[0], "DD-MM-YYYY").format("YYYY-MM-DD");
      to = moment(e.value[1], "DD-MM-YYYY").format("YYYY-MM-DD");
    } catch (error) {
      from = null;
      to = null;
    }

    const branch_id = getBranchId();
    var params = `branch_id=${branch_id}`;
    const { store_code } = this.props.match.params;
    if ((from, to)) {
      params = params + `&date_from=${from}&date_to=${to}`;
    }
    this.props.fetchReportExpenditure(store_code, branch_id, 1, params);
    this.setState({ time_from: from, time_to: to });
  };
  showData = (reportExpenditure) => {
    var result = null;
    if (reportExpenditure) {
      result = reportExpenditure.map((item, index) => {
        return (
          <>
            <tr className="hover-product">
              <td>{index + 1}</td>
              <td>{item.code}</td>
              <td>{item.user?.name}</td>
              <td>{format(Number(item.current_money))}</td>
              <td>{format(Number(item.change_money))}</td>
              <td>{item.type_action_name}</td>
              <td>
                {moment(item.created_at, "YYYY-MM-DD").format("DD-MM-YYYY")}
              </td>
            </tr>
          </>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  goBack = () => {
    history.goBack();
  };

  render() {
    var { store_code } = this.props.match.params;
    var { time_from, time_to } = this.state;
    const reportExpenditure = this.props.reportExpenditure;
    const { txtStart, txtEnd } = this.state;
    var arrDate = null;

    if ((time_from, time_to)) {
      arrDate = [
        moment(time_from, "YYYY-MM-DD").format("DD/MM/YYYY"),
        moment(time_to, "YYYY-MM-DD").format("DD/MM/YYYY"),
      ];
    }
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />

              <div className="container-fluid">
                <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
                <div className="card">
                  <div
                    className="card-header py-3"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="stock-title text-primary">
                      <h4 style={{ display: "flex" }}>
                        Sổ quỹ
                        <div style={{ paddingLeft: "20px" }}>
                          <i class="fas fa-arrow-circle-right"></i>
                          <span
                            style={{
                              color: "#17a2b8",
                              paddingLeft: "10px",
                            }}
                          >
                            {format(Number(reportExpenditure.reserve))}
                          </span>
                        </div>
                      </h4>
                    </div>
                    <button
                      style={{ marginRight: "10px" }}
                      type="button"
                      onClick={this.goBack}
                      class="btn btn-warning  btn-sm"
                    >
                      <i class="fas fa-arrow-left"></i>&nbsp;Quay lại
                    </button>
                  </div>

                  <div className="card-body" style={{ minHeight: "500px" }}>
                    <div className="wap-header" style={{ display: "flex" }}>
                      <DateRangePickerComponent
                        value={[
                          new Date(moment(time_from, "YYYY-MM-DD")),
                          new Date(moment(time_to, "YYYY-MM-DD")),
                        ]}
                        id="daterangepicker"
                        placeholder="Khoảng thời gian..."
                        format="dd/MM/yyyy"
                        onChange={this.onchangeDateFromTo}
                      />
                    </div>
                    <div class="table-responsive">
                      <table
                        class="table  "
                        id="dataTable"
                        width="100%"
                        cellspacing="0"
                      >
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Mã phiếu</th>
                            <th>Người tạo</th>
                            <th>Số tiền</th>
                            <th>Thay đổi</th>
                            <th style={{ width: "20%" }}>Loại phiếu</th>
                            <th>Ngày tạo</th>
                          </tr>
                        </thead>

                        <tbody>{this.showData(reportExpenditure.data)}</tbody>
                      </table>
                    </div>
                    <Pagination
                      time_from={time_from}
                      time_to={time_to}
                      store_code={store_code}
                      reportExpenditure={reportExpenditure}
                      txtStart={txtStart}
                      txtEnd={txtEnd}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    reportExpenditure: state.reportReducers.reportExpenditure,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchReportExpenditure: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.fetchReportExpenditure(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Expenditure);
