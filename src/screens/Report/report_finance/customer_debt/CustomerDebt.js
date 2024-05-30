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
import { format, getQueryParams } from "../../../../ultis/helpers";
import Pagination from "./Pagination";
import history from "../../../../history";
import { getBranchId } from "../../../../ultis/branchUtils";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
class CustomerDebt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time_from: "",
      time_to: "",
    };
  }
  componentDidMount() {
    const { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    var params = `branch_id=${branch_id}`;
    var date_from = getQueryParams("date_from");
    var date_to = getQueryParams("date_to");

    if (date_from && date_to) {
      params += `&date_from=${date_from}&date_to=${date_to}`;
      this.setState({
        time_from: date_from,
        time_to: date_to,
      });
    }

    this.props.fetchAllCustomerDebt(store_code, branch_id, 1, params);
    try {
      document.getElementsByClassName("r-input")[0].placeholder = "Hôm nay";
    } catch (error) {}
  }

  onChangeStart = (e) => {
    var time = moment(e, "DD-MM-YYYY").format("YYYY-MM-DD");
    console.log("time", time);
    this.setState({
      txtStart: time,
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
    this.props.fetchAllCustomerDebt(store_code, branch_id, 1, params);
    this.setState({ time_from: from, time_to: to });
  };
  changePage = (store_code, customerId) => {
    var { paginate } = this.props;

    history.push(
      `/customer/detail/${store_code}/${customerId}?redirect_report=true`
    );
  };
  showData = (listCustomerDebt) => {
    var result = null;
    const { store_code } = this.props.match.params;

    if (listCustomerDebt) {
      result = listCustomerDebt.map((item, index) => {
        return (
          <>
            <tr
              className="hover-product"
              onClick={() => this.changePage(store_code, item.id)}
            >
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.phone_number}</td>
              <td>{item.email}</td>
              <td>{format(Number(item.debt))}</td>
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
    const { store_code } = this.props.match.params;
    const { custommerDebt } = this.props;
    var { time_from, time_to } = this.state;
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
                    <div
                      className="stock-title text-primary"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <h4 style={{ display: "flex" }}>
                        Công nợ phải thu khách hàng
                        <div style={{ paddingLeft: "20px" }}>
                          <i class="fas fa-arrow-circle-right"></i>
                          <span
                            style={{
                              color: "#17a2b8",
                              paddingLeft: "10px",
                            }}
                          >
                            {format(Number(custommerDebt.debt))}
                          </span>
                        </div>
                      </h4>
                      <button
                        style={{ marginRight: "10px" }}
                        type="button"
                        onClick={this.goBack}
                        class="btn btn-warning  btn-sm"
                      >
                        <i class="fas fa-arrow-left"></i>&nbsp;Quay lại
                      </button>
                    </div>
                  </div>

                  <div
                    class="form-group"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <label for="product_name" style={{ marginRight: "20px" }}>
                      Thời gian
                    </label>
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
                  </div>
                  <div className="card-body">
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
                            <th>Tên khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Tiền nợ</th>
                          </tr>
                        </thead>

                        <tbody>{this.showData(custommerDebt.data)}</tbody>
                      </table>
                    </div>
                    <Pagination
                      store_code={store_code}
                      custommerDebt={custommerDebt}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    custommerDebt: state.reportReducers.custommerDebt,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCustomerDebt: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.fetchAllCustomerDebt(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerDebt);
