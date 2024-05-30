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

class ReportProduct extends Component {
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
    // const { bills } = this.props;
    // const data = bills?.data || [];

    // const result = data.reduce((acc, cur) => {
    //   if (
    //     !methodPaymentId ||
    //     cur.payment_method_id === Number(methodPaymentId)
    //   ) {
    //     acc += cur.total_final;
    //   }
    //   return acc;
    // }, 0);
    // console.log("result", result);

    // this.setState({ totalPrice: result });
    // return format(result);
    const branchId = getBranchId();
    const branchIds = getBranchIds();
    const branch = branchIds ? branchIds : branchId;
    const { store_code } = this.props.match.params;
    insertParam({
      methodPaymentId: methodPaymentId ? methodPaymentId : "",
    });

    this.props.fetchReportProducSold(
      store_code,
      1,
      branch,
      null,
      null,
      undefined
    );
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
    user
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
    } = this.state;
    from = date ? moment(date).format("YYYY-MM-DD") : "";
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
      statusTime
    );

    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    insertParam({
      from: date ? from : "",
    });

    this.props.fetchReportProducSold(
      store_code,
      1,
      branchIds,
      params,
      params_agency
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
      statusTime
    );

    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    insertParam({
      to: date ? to : "",
    });

    this.props.fetchReportProducSold(
      store_code,
      1,
      branchIds,
      params,
      params_agency
    );
    this.setState({ time_to: to });
  };

  searchData = (e) => {
    e.preventDefault();
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
      time_to,
    } = this.state;
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;

    this.setState({ page: 1 });
    var params = this.getParams(
      time_from,
      time_to,
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id,
      statusTime
    );
    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;
    // history.push(`/product/index/${store_code}?page=1${params}`);
    this.props.fetchReportProducSold(
      store_code,
      1,
      branchIds,
      params,
      params_agency
    );
  };

  exportReportProductSold = () => {
    var { store_code } = this.props.match.params;
    var {
      time_from,
      time_to,
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id,
      statusTime,
    } = this.state;

    var params = this.getParams(
      time_from,
      time_to,
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id,
      statusTime
    );
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;
    this.props.exportReportProductSold(
      store_code,
      1,
      branchIds,
      params,
      params_agency
    );
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

    this.props.fetchReportProducSold(
      store_code,
      1,
      branch,
      params,
      null,
      undefined
    );

    this.props.fetchAllPayment(store_code);

    this.setState({ totalPrice: this.props.bills.total_price });
  }

  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevState.methodPaymentId !== this.state.methodPaymentId) {
  //       this.handleGetTotalPriceByMethodPayment(this.state.methodPaymentId);
  //     }
  //   }

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
                      Báo cáo sản phẩm
                    </h6>

                    <button
                      style={{ margin: "auto 0px" }}
                      onClick={this.exportReportProductSold}
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
                  <div className="card-body">
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
                        <div
                          style={{
                            minWidth: "230px",
                          }}
                        >
                          <form onSubmit={this.searchData}>
                            <div class="input-group mb-6">
                              <input
                                style={{ maxWidth: "400px", minWidth: "200px" }}
                                type="search"
                                name="txtSearch"
                                value={this.state.searchValue}
                                onChange={(e) => {
                                  this.setState({
                                    searchValue: e.target.value,
                                  });
                                }}
                                class="form-control"
                                placeholder="Tìm kiếm sản phẩm"
                              />
                              <div class="input-group-append">
                                <button class="btn btn-primary" type="submit">
                                  <i class="fa fa-search"></i>
                                </button>
                              </div>
                            </div>

                            {/* <p class="total-item" id="sale_user_name">
                              <span className="num-total_item">
                                {products.total}&nbsp;
                              </span>
                              <span className="text-total_item" id="user_name">
                                sản phẩm
                              </span>
                            </p> */}
                          </form>
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
                            // onClose={(selectedDates, dateStr) => {
                            //   this.onchangeDateFrom(selectedDates[0]);
                            // }}
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
                            // onClose={(selectedDates, dateStr) => {
                            //   this.onchangeDateTo(selectedDates[0]);
                            // }}
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
    fetchReportProducSold: (id, page, branch_id, params, params_agency) => {
      dispatch(
        billAction.fetchReportProducSold(
          id,
          page,
          branch_id,
          params,
          params_agency
        )
      );
    },
    exportReportProductSold: (id, page, branch_id, params, params_agency) => {
      dispatch(
        billAction.exportReportProductSold(
          id,
          page,
          branch_id,
          params,
          params_agency
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportProduct);
