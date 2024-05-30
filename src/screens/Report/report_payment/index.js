import React, { Component } from "react";
import { MomentInput } from "react-moment-input";
import Alert from "../../../components/Partials/Alert";
import Footer from "../../../components/Partials/Footer";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import * as Types from "../../../constants/ActionType";
import ChartFinance from "../../../components/Report/ChartFinance";
import NotAccess from "../../../components/Partials/NotAccess";
import { connect } from "react-redux";
import Table from "./Table";
import { getBranchId, getBranchIds } from "../../../ultis/branchUtils";
import * as billAction from "../../../actions/bill";
import { format } from "../../../ultis/helpers";
import Pagination from "./Pagination";
import queryString from "query-string";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { getQueryParams, insertParam } from "../../../ultis/helpers";
import Select from "react-select";
import * as paymentAction from "../../../actions/payment";
import history from "../../../history";

class ReportPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profitToltal: "",
      methodPaymentId: null,
      totalPrice: 0,
      numPage: 20,
      statusPayment: "",
      time_from: moment().startOf("month").format("YYYY-MM-DD"),
      time_to: moment().format("YYYY-MM-DD"),
      statusOrder: "",
      statusTime: "",
      agency_by_customer_id:
        queryString.parse(window.location.search).agency_by_customer_id || null,
      collaborator_by_customer_id:
        queryString.parse(window.location.search).collaborator_by_customer_id ||
        null,
      orderFrom: "",
      searchValue: "",
      selectedOption: null,
    };
  }

  handleGetTotalPriceByMethodPayment = (methodPaymentId) => {
    var {
      status_payment,
      status_order,
      limit,
      searchValue,
      hasPhone,
      phone,
      time_to,
      time_from,
      orderFrom,
      collaborator_by_customer_id,
      statusTime,
      getParams,
      setPaginate,
    } = this.state;
    let params = this.getParams(
      time_from,
      time_to,
      searchValue,
      status_order,
      status_payment,
      limit,
      orderFrom,
      collaborator_by_customer_id,
      statusTime
    );
    const branchId = getBranchId();
    const branchIds = getBranchIds();
    const branch = branchIds ? branchIds : branchId;
    const { store_code } = this.props.match.params;
    // insertParam({
    //   methodPaymentId: methodPaymentId ? methodPaymentId : "",
    // });

    // const {methodPaymentId} = this.state;
    if (!methodPaymentId) {
      this.props.fetchAllBillByMethodPayment(
        store_code,
        1,
        branch,
        params,
        null,
        undefined
      );
    } else {
      this.props.fetchAllBillByMethodPayment(
        store_code,
        1,
        branch,
        params,
        null,
        methodPaymentId
      );
    }
  };

  getParams = (
    from,
    to,
    searchValue,
    statusOrder,
    statusPayment,
    numPage,
    orderFrom,
    collaborator_by_customer_id,
    statusTime,
    user,
    methodPaymentId
  ) => {
    var params = ``;
    if (to != "" && to != null) {
      const toYYYYMMDD = to?.split("-").reverse().join("-");
      params = params + `&time_to=${toYYYYMMDD}`;
    }
    if (from != "" && from != null) {
      const fromYYYYMMDD = from?.split("-").reverse().join("-");
      params = params + `&time_from=${fromYYYYMMDD}`;
    }
    if (methodPaymentId != null && methodPaymentId != "") {
      params = params + `&methodPaymentId=${methodPaymentId}`;
    }
    if (statusTime != null && statusTime != "") {
      params = params + `&type_query_time=${statusTime}`;
    }
    if (searchValue != "" && searchValue != null) {
      params = params + `&search=${searchValue}`;
    }
    if (statusOrder != "" && statusOrder != null) {
      params = params + `&order_status_code=${statusOrder}`;
    }
    if (statusPayment != "" && statusPayment != null) {
      params = params + `&payment_status_code=${statusPayment}`;
    }
    if (numPage != "" && numPage != null) {
      params = params + `&limit=${numPage}`;
    }
    if (orderFrom != "" && orderFrom != null) {
      params = params + `&order_from_list=${orderFrom}`;
    }
    if (
      collaborator_by_customer_id != "" &&
      collaborator_by_customer_id != null
    ) {
      params =
        params + `&collaborator_by_customer_id=${collaborator_by_customer_id}`;
    }
    if (this.isSale()) {
      params += `&sale_staff_id=${user?.id || this.props.user.id}`;
    }
    return params;
  };

  isSale = () => {
    const pathName = window.location.pathname.split("/");
    const isCheckedSale = pathName[1] === "cusSale";
    return isCheckedSale;
  };

  setPaginate = (page) => {
    this.setState({
      paginate: page,
    });
  };

  onchangeDateFrom = (date) => {
    var from = "";
    var { store_code } = this.props.match.params;
    var {
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id,
      statusTime,
      time_to,
      methodPaymentId,
    } = this.state;
    from = date ? moment(date).format("YYYY-MM-DD") : "";
    console.log("date", date);
    console.log("from", from);
    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;

    var params = this.getParams(
      from,
      time_to,
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id,
      statusTime,
      methodPaymentId
    );

    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    insertParam({
      from: date ? from : "",
    });

    this.props.fetchAllBillByMethodPayment(
      store_code,
      1,
      branchIds,
      params,
      params_agency,
      methodPaymentId ? methodPaymentId : undefined
    );
    this.setState({ time_from: from });
  };
  onchangeDateTo = (date) => {
    var to = "";
    var { store_code } = this.props.match.params;
    var {
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id,
      statusTime,
      time_from,
      methodPaymentId,
    } = this.state;
    to = date ? moment(date).format("YYYY-MM-DD") : "";
    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;

    var params = this.getParams(
      time_from,
      to,
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id,
      statusTime,
      methodPaymentId
    );

    console.log("params1", params);

    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    insertParam({
      to: date ? to : "",
    });

    this.props.fetchAllBillByMethodPayment(
      store_code,
      1,
      branchIds,
      params,
      params_agency,
      methodPaymentId ? methodPaymentId : undefined
    );
    this.setState({ time_to: to });
  };

  componentDidMount() {
    const branchId = getBranchId();
    const branchIds = getBranchIds();
    const branch = branchIds ? branchIds : branchId;
    var { store_code } = this.props.match.params;
    const { methodPaymentId } = this.state;
    const params = `&time_from=${moment()
      .startOf("month")
      .format("YYYY-MM-DD")}&time_to=${moment().format("YYYY-MM-DD")}`;
    history.push(
      `?time_from=${moment()
        .startOf("month")
        .format("YYYY-MM-DD")}&time_to=${moment().format("YYYY-MM-DD")}`
    );

    // this.props.fetchAllBill(store_code, 1, branch, null, null);
    if (!methodPaymentId) {
      this.props.fetchAllBillByMethodPayment(
        store_code,
        1,
        branch,
        null,
        params,
        undefined
      );
    } else {
      this.props.fetchAllBillByMethodPayment(
        store_code,
        1,
        branch,
        params,
        null,
        methodPaymentId
      );
    }
    this.props.fetchAllPayment(store_code);

    this.setState({ totalPrice: this.props.bills.total_price });
  }

  exportAllBillByMethodPaymen = () => {
    const branchId = getBranchId();
    const branchIds = getBranchIds();
    const branch = branchIds ? branchIds : branchId;
    var { store_code } = this.props.match.params;
    const { methodPaymentId } = this.state;
    const params = `&time_from=${moment()
      .startOf("month")
      .format("YYYY-MM-DD")}&time_to=${moment().format("YYYY-MM-DD")}`;
    history.push(
      `?time_from=${moment()
        .startOf("month")
        .format("YYYY-MM-DD")}&time_to=${moment().format("YYYY-MM-DD")}`
    );

    // this.props.fetchAllBill(store_code, 1, branch, null, null);
    if (!methodPaymentId) {
      this.props.exportAllBillByMethodPayment(
        store_code,
        1,
        branch,
        params,
        null,
        undefined
      );
    } else {
      this.props.exportAllBillByMethodPayment(
        store_code,
        1,
        branch,
        params,
        null,
        methodPaymentId
      );
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.methodPaymentId !== this.state.methodPaymentId) {
      this.handleGetTotalPriceByMethodPayment(this.state.methodPaymentId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.report_payment != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.report_payment;
      this.setState({ isLoading: true, isShow });
    }
  }

  render() {
    const { store_code } = this.props.match.params;
    const { isShow, methodPaymentId } = this.state;

    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              {/* {typeof isShow == "undefined" ? (
                <div style={{ height: "500px" }}></div>
              ) : isShow == true ? ( */}
              <div className="container-fluid">
                {/* <Alert
                    type={Types.ALERT_UID_STATUS}
                    alert={this.props.alert}
                  /> */}

                <div className="card">
                  <div
                    className="card-header py-3"
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <h6 className="m-0 title_content font-weight-bold text-primary">
                      Báo cáo thanh toán
                    </h6>

                    <button
                      style={{ margin: "auto 0px" }}
                      onClick={this.exportAllBillByMethodPaymen}
                      class={`btn btn-success btn-icon-split btn-sm `}
                    >
                      <span class="icon text-white-50">
                        <i class="fas fa-file-export"></i>
                      </span>
                      <span style={{ color: "white" }} class="text">
                        Export Excel
                      </span>
                    </button>
                  </div>
                  <div
                    className="card-body"
                    style={{
                      minHeight: "400px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          Số đơn:{" "}
                          <span
                            style={{
                              color: "red",
                              fontWeight: "500",
                              fontSize: "18px",
                            }}
                          >
                            {this.props.bills.total}
                          </span>
                        </div>
                        <div>
                          Tổng tiền:{" "}
                          <span
                            style={{
                              color: "red",
                              fontWeight: "500",
                              fontSize: "18px",
                            }}
                          >
                            {format(
                              this.state.totalPrice ||
                                this.props.bills.total_price
                            )}
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            minWidth: "230px",
                          }}
                        >
                          <Select
                            closeMenuOnSelect={true}
                            options={[
                              { value: "", label: "Tất cả" },
                              { value: "0", label: "Thanh toán trực tiếp" },
                              {
                                value: "cod",
                                label: "COD",
                              },
                              { value: "2", label: "Thanh toán qua VNPay" },
                              { value: "3", label: "Thanh toán qua Onepay" },
                              { value: "4", label: "Thanh toán qua Momo" },
                            ]}
                            placeholder={"Chọn phương thức thanh toán"}
                            value={this.state.selectedOption}
                            onChange={(selectedOption) => {
                              this.setState({
                                methodPaymentId: selectedOption.value,
                                selectedOption: selectedOption,
                              });
                            }}
                            noOptionsMessage={() => "Không tìm thấy kết quả"}
                          />
                        </div>
                        {/* </div> */}

                        <div
                          className="input-group-append input-date"
                          style={{
                            display: "flex",
                            gap: "16px",
                            alignItems: "center",
                          }}
                        >
                          <Flatpickr
                            data-enable-time
                            value={new Date(this.state.time_from)}
                            className="date_from"
                            placeholder="Chọn ngày bắt đầu..."
                            options={{
                              altInput: true,
                              dateFormat: "DD-MM-YYYY",
                              altFormat: "DD-MM-YYYY",
                              allowInput: true,
                              enableTime: false,
                              maxDate: this.state.time_to,
                              parseDate: (datestr, format) => {
                                return moment(datestr, format, true).toDate();
                              },
                              formatDate: (date, format, locale) => {
                                return moment(date).format(format);
                              },
                            }}
                            onChange={([date]) => this.onchangeDateFrom(date)}
                          />
                          <Flatpickr
                            data-enable-time
                            value={new Date(this.state.time_to)}
                            className="date_to"
                            placeholder="Chọn ngày kết thúc..."
                            options={{
                              altInput: true,
                              dateFormat: "DD-MM-YYYY",
                              altFormat: "DD-MM-YYYY",
                              allowInput: true,
                              enableTime: false,
                              minDate: this.state.time_from,
                              parseDate: (datestr, format) => {
                                return moment(datestr, format, true).toDate();
                              },
                              formatDate: (date, format, locale) => {
                                return moment(date).format(format);
                              },
                            }}
                            onChange={([date]) => this.onchangeDateTo(date)}
                          />
                        </div>
                      </div>
                    </div>
                    <Table
                      storeCode={store_code}
                      bills={this.props.bills}
                      payment={this.props.payment}
                    />

                    <Pagination
                      time_from={this.state.time_from}
                      time_to={this.state.time_to}
                      orderFrom={this.state.orderFrom}
                      searchValue={this.state.searchValue}
                      limit={this.state.numPage}
                      status_payment={this.state.statusPayment}
                      store_code={store_code}
                      getParams={this.getParams}
                      bills={this.props.bills}
                      status_order={this.state.statusOrder}
                      collaborator_by_customer_id={
                        this.state.collaborator_by_customer_id
                      }
                      agency_by_customer_id={this.state.agency_by_customer_id}
                      statusTime={this.state.statusTime}
                      setPaginate={this.setPaginate}
                      paymentMethodId={this.state.paymentMethodId}
                    />
                  </div>
                </div>
              </div>
              {/* ) : (
                <NotAccess />
              )} */}
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
    permission: state.authReducers.permission.data,
    bills: state.billReducers.bill.allBill,
    payment: state.paymentReducers.payment.allPayment,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllBill: (id, page, branch_id, params, params_agency) => {
      dispatch(
        billAction.fetchAllBill(id, page, branch_id, params, params_agency)
      );
    },
    fetchAllBillByMethodPayment: (
      id,
      page = 1,
      branch_id,
      params = null,
      params_agency = null,
      methodPaymentId
    ) => {
      dispatch(
        billAction.fetchAllBillByMethodPayment(
          id,
          page,
          branch_id,
          params,
          params_agency,
          methodPaymentId
        )
      );
    },
    fetchAllPayment: (store_code) => {
      dispatch(paymentAction.fetchAllPayment(store_code));
    },
    exportAllBillByMethodPayment: (
      id,
      page = 1,
      branch_id,
      params = null,
      params_agency = null,
      methodPaymentId
    ) => {
      dispatch(
        billAction.exportAllBillByMethodPayment(
          id,
          page,
          branch_id,
          params,
          params_agency,
          methodPaymentId
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportPayment);
