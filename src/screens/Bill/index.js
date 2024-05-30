import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import Table from "../../components/Bill/Table";
import { Redirect } from "react-router-dom";
import { connect, shallowEqual } from "react-redux";
import Loading from "../Loading";
import * as billAction from "../../actions/bill";
import Chat from "../../components/Chat";
import Pagination from "../../components/Bill/Pagination";
import NotAccess from "../../components/Partials/NotAccess";
import queryString from "query-string";
import * as customerAction from "../../actions/customer";
import moment from "moment";
import * as helper from "../../ultis/helpers";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";
import history from "../../history";
import { getQueryParams, insertParam } from "../../ultis/helpers";
import styled from "styled-components";
import Flatpickr from "react-flatpickr";

const BillStyles = styled.div`
  .total-item-custom {
    .total-sale_user_name {
      display: flex;
      align-items: center;
      select {
        color: #6e707e;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .input-date {
        height: 100%;
        .date_from {
          border-radius: 0 !important;
        }
        .date_to {
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
          border-left-width: 0 !important;
        }
        .form-control:focus {
          border-color: #d1d3e2 !important;
          box-shadow: none !important;
        }
      }
    }
  }
`;

class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatBox: "hide",
      customerId: "",
      customerImg: "",
      statusOrder: "",
      isSearch: false,
      searchValue: "",
      statusPayment: "",
      runAsync: "",
      orderFrom: "",
      numPage: 10,
      agency_by_customer_id:
        queryString.parse(window.location.search).agency_by_customer_id || null,
      collaborator_by_customer_id:
        queryString.parse(window.location.search).collaborator_by_customer_id ||
        null,
      time_from: "",
      time_to: "",
      loadingShipment: "",
      paginate: 1,
      statusTime: "",
      date: new Date(),
    };
  }
  closeChatBox = (status) => {
    this.setState({
      showChatBox: status,
    });
  };

  setPaginate = (page) => {
    this.setState({
      paginate: page,
    });
  };
  onChangeNumPage = (e) => {
    var { store_code } = this.props.match.params;
    var {
      statusOrder,
      statusPayment,
      searchValue,
      orderFrom,
      time_from,
      time_to,
      collaborator_by_customer_id,
      statusTime,
    } = this.state;
    var numPage = e.target.value;
    this.setState({
      numPage,
    });
    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;

    var params = "";
    params =
      params +
      this.getParams(
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
    insertParam({
      limit: numPage,
      page: 1,
    });
    // var params = `&search=${searchValue}&order_status_code=${statusOrder}&payment_status_code=${statusPayment}&limit=${numPage}`
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    this.props.fetchAllBill(store_code, 1, branchIds, params, params_agency);
  };
  goBack = () => {
    var { store_code } = this.props.match.params;
    var { collaborator_by_customer_id, agency_by_customer_id } = this.state;
    const search = getQueryParams("search");
    const page = getQueryParams("page") || 1;
    const params = `&page=${page}${search ? `&search=${search}` : ""}`;
    if (agency_by_customer_id != null)
      history.replace(`/agency/${store_code}?tab-index=1${params}`);
    else {
      history.replace(`/collaborator/${store_code}?tab-index=1${params}`);
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    const { user } = this.props;
    if (!shallowEqual(user, nextProps.user)) {
      var { store_code, status_code } = this.props.match.params;
      var orderFrom = getQueryParams("order_from_list");
      var limit = getQueryParams("limit");
      var search = getQueryParams("search");
      var from = getQueryParams("from");
      var to = getQueryParams("to");
      var statusTime = getQueryParams("type_query_time");
      var statusOrder = getQueryParams("order_status_code");
      var statusPayment = getQueryParams("payment_status_code");
      var paginate = getQueryParams("page");
      var { collaborator_by_customer_id, numPage } = this.state;

      if (
        this.props.customer.id !== this.state.agency_by_customer_id &&
        this.state.agency_by_customer_id != null
      ) {
        this.props.fetchCustomerId(
          store_code,
          this.state.agency_by_customer_id
        );
      }

      if (
        this.props.customer.id !== this.state.collaborator_by_customer_id &&
        this.state.collaborator_by_customer_id != null
      ) {
        this.props.fetchCustomerId(
          store_code,
          this.state.collaborator_by_customer_id
        );
      }

      var params_agency =
        this.state.agency_by_customer_id != null
          ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
          : null;
      // var status = status_code;
      // var params =
      //   typeof status_code == "undefined"
      //     ? ""
      //     : status_code != "PAID"
      //     ? `&field_by=order_status_code&field_by_value=${status_code}`
      //     : `&field_by=payment_status_code&field_by_value=${status_code}`;
      if (from) {
        this.setState({
          time_from: from,
        });
      }
      if (to) {
        this.setState({
          time_to: to,
        });
      }
      if (statusTime) {
        this.setState({
          statusTime: statusTime,
        });
      }
      if (search) {
        this.setState({
          searchValue: search,
        });
      }
      if (limit) {
        this.setState({
          numPage: limit,
        });
      }
      if (orderFrom) {
        this.setState({
          orderFrom: orderFrom,
        });
      }
      if (statusOrder) {
        this.setState({
          statusOrder: statusOrder,
        });
      }
      if (statusPayment) {
        this.setState({
          statusPayment: statusPayment,
        });
      }
      if (paginate) {
        this.setPaginate(paginate);
      }
      var params = "";
      params =
        params +
        this.getParams(
          from,
          to,
          search,
          statusOrder,
          statusPayment,
          limit || numPage,
          orderFrom,
          collaborator_by_customer_id,
          statusTime,
          nextProps.user
        );
      const branch_id = getBranchId();
      const branch_ids = getBranchIds();
      const branchIds = branch_ids ? branch_ids : branch_id;

      var page = getQueryParams("page") ?? 1;
      this.props.fetchAllBill(
        store_code,
        page,
        branchIds,
        params,
        params_agency
      );
      this.setState({ loadingShipment: helper.randomString(10) });
    }
    return true;
  }

  componentDidMount() {
    var { store_code, status_code } = this.props.match.params;
    var orderFrom = getQueryParams("order_from_list");
    var limit = getQueryParams("limit");
    var search = getQueryParams("search");
    var from = getQueryParams("from");
    var to = getQueryParams("to");
    var statusTime = getQueryParams("type_query_time");
    var statusOrder = getQueryParams("order_status_code");
    var statusPayment = getQueryParams("payment_status_code");
    var paginate = getQueryParams("page");
    var { collaborator_by_customer_id, numPage } = this.state;

    if (
      this.props.customer.id !== this.state.agency_by_customer_id &&
      this.state.agency_by_customer_id != null
    ) {
      this.props.fetchCustomerId(store_code, this.state.agency_by_customer_id);
    }

    if (
      this.props.customer.id !== this.state.collaborator_by_customer_id &&
      this.state.collaborator_by_customer_id != null
    ) {
      this.props.fetchCustomerId(
        store_code,
        this.state.collaborator_by_customer_id
      );
    }

    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;
    // var status = status_code;
    // var params =
    //   typeof status_code == "undefined"
    //     ? ""
    //     : status_code != "PAID"
    //     ? `&field_by=order_status_code&field_by_value=${status_code}`
    //     : `&field_by=payment_status_code&field_by_value=${status_code}`;
    if (from) {
      this.setState({
        time_from: from,
      });
    }
    if (to) {
      this.setState({
        time_to: to,
      });
    }
    if (statusTime) {
      this.setState({
        statusTime: statusTime,
      });
    }
    if (search) {
      this.setState({
        searchValue: search,
      });
    }
    if (limit) {
      this.setState({
        numPage: limit,
      });
    }
    if (orderFrom) {
      this.setState({
        orderFrom: orderFrom,
      });
    }
    if (statusOrder) {
      this.setState({
        statusOrder: statusOrder,
      });
    }
    if (statusPayment) {
      this.setState({
        statusPayment: statusPayment,
      });
    }

    if (paginate) {
      this.setPaginate(paginate);
    }
    var params = "";
    params =
      params +
      this.getParams(
        from,
        to,
        search,
        statusOrder,
        statusPayment,
        limit || numPage,
        orderFrom,
        collaborator_by_customer_id,
        statusTime
      );

    // var status_order = status == "PAID" ? null : status;
    // var status_payment = status == "PAID" ? status : null;
    // if (status_order != null) this.setState({ statusOrder: status_order });
    // if (statusOrder) this.setState({ statusOrder: statusOrder });
    // if (statusPayment) this.setState({ statusPayment: statusPayment });

    // if (status_payment != null)
    //   this.setState({ statusPayment: status_payment });
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;

    var page = getQueryParams("page") ?? 1;
    this.props.fetchAllBill(store_code, page, branchIds, params, params_agency);
    this.setState({ loadingShipment: helper.randomString(10) });
  }
  isSale = () => {
    const pathName = window.location.pathname.split("/");
    const isCheckedSale = pathName[1] === "cusSale";
    return isCheckedSale;
  };
  handleShowChatBox = (customerId, customerImg, customerName, status) => {
    var { store_code } = this.props.match.params;

    this.setState({
      showChatBox: status,
      customerId: customerId,
      customerImg: customerImg,
      customerName: customerName,
    });
    this.props.fetchChatId(store_code, customerId);
  };
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  onchangeStatusOrder = (data) => {
    this.setState({ statusOrder: data });
  };
  onchangeStatusPayment = (data) => {
    this.setState({ statusPayment: data });
  };
  onchangeOrderFrom = (data) => {
    this.setState({ orderFrom: data });
  };
  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props.match.params;
    var {
      searchValue,
      numPage,
      time_from,
      time_to,
      statusOrder,
      statusPayment,
      orderFrom,
      collaborator_by_customer_id,
      statusTime,
    } = this.state;
    var params = "";
    params = this.getParams(
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
    // history.push(`/order/${store_code}?page=1${params ? `${params}` : ""}`);
    insertParam({
      search: searchValue,
    });
    // this.setState({ statusPayment: "", statusOrder: "", numPage: 20 });
    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    this.props.fetchAllBill(store_code, 1, branchIds, params, params_agency);
  };

  fetchAllData = () => {
    var { store_code } = this.props.match.params;
    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    this.props.fetchAllBill(store_code, 1, branchIds, null, params_agency);
  };

  getParamDate = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const time_from = queryParams.get("time_from");
    const time_to = queryParams.get("time_to");
    var params = `&time_from=${time_from}&time_to=${time_to}`;
    return params;
  };

  componentWillReceiveProps(nextProps, nextState) {
    // if (this.state.paramDate != this.getParamDate() && this.state.paramDate.from != null) {
    //   this.setState({
    //     paramDate: this.getParamDate()
    //   })

    //   var { store_code } = this.props.match.params;
    //   const branch_id = getBranchId()
    //   var params_agency =
    //   this.state.agency_by_customer_id != null
    //     ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
    //     : null;
    //   this.props.fetchAllBill(store_code, 1, branch_id, this.getParamDate(), params_agency);
    // }

    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;
      var isShow = permissions.order_list || this.isSale();
      var chat_allow = permissions.chat_allow;
      var order_export_to_excel = permissions.order_export_to_excel;

      this.setState({
        isLoading: true,
        chat_allow,
        isShow,
        order_export_to_excel,
      });
    }
  }

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

  exportAllListOrder = () => {
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
    this.props.exportAllListOrder(
      store_code,
      1,
      branchIds,
      params,
      params_agency
    );
  };

  exportAllListOrderMisa = () => {
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
    this.props.exportAllListOrderMisa(
      store_code,
      1,
      branchIds,
      params,
      params_agency
    );
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
    from = date ? moment(date, "DD-MM-YYYY").format("DD-MM-YYYY") : "";
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

    this.props.fetchAllBill(store_code, 1, branchIds, params, params_agency);
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
    to = date ? moment(date, "DD-MM-YYYY").format("DD-MM-YYYY") : "";

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

    this.props.fetchAllBill(store_code, 1, branchIds, params, params_agency);
    this.setState({ time_to: to });
  };

  onChangeStatusTime = (e) => {
    const statusTimeValue = e.target.value;
    var {
      time_from,
      time_to,
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id,
    } = this.state;
    var { store_code } = this.props.match.params;

    var params = this.getParams(
      time_from,
      time_to,
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id,
      statusTimeValue
    );
    this.setState({
      statusTime: statusTimeValue,
    });

    insertParam({ type_query_time: statusTimeValue });
    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    this.props.fetchAllBill(store_code, 1, branchIds, params, params_agency);
  };

  render() {
    var { store_code } = this.props.match.params;
    var { bills, chat, customer } = this.props;
    var {
      showChatBox,
      customerId,
      customerImg,
      customerName,
      statusOrder,
      isSearch,
      searchValue,
      statusPayment,
      statusOrder,
      numPage,
      chat_allow,
      isShow,
      time_from,
      time_to,
      orderFrom,
      runAsync,
      collaborator_by_customer_id,
      agency_by_customer_id,
      statusTime,
      order_export_to_excel,
    } = this.state;
    var listBill = typeof bills.data == "undefined" ? [] : bills.data;

    if (this.props.auth) {
      return (
        <BillStyles id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <div className="container-fluid">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Đơn hàng{" "}
                        {typeof customer.id != "undefined" &&
                        customer.id == this.state.agency_by_customer_id
                          ? `của Đại lý ${customer.name}`
                          : null}
                        {typeof customer.id != "undefined" &&
                        customer.id == this.state.collaborator_by_customer_id
                          ? `của CTV ${customer.name}`
                          : null}
                      </h4>{" "}
                      {getQueryParams("tab-index") && (
                        <button
                          style={{ marginRight: "10px" }}
                          type="button"
                          onClick={this.goBack}
                          class="btn btn-warning  btn-sm"
                        >
                          <i class="fas fa-arrow-left"></i>&nbsp;Trở về
                        </button>
                      )}
                    </div>

                    <br></br>
                    <div className="card shadow ">
                      <div className="card-header py-3">
                        <div
                          class="row"
                          style={{ "justify-content": "space-between" }}
                        >
                          <form onSubmit={this.searchData}>
                            <div
                              class="input-group mb-6"
                              style={{ padding: "0 20px" }}
                            >
                              <input
                                style={{ maxWidth: "400px", minWidth: "300px" }}
                                type="search"
                                name="txtSearch"
                                value={searchValue}
                                onChange={this.onChangeSearch}
                                class="form-control"
                                placeholder="Tìm mã đơn, tên, SĐT"
                              />
                              <div class="input-group-append">
                                <button class="btn btn-primary" type="submit">
                                  <i class="fa fa-search"></i>
                                </button>
                              </div>
                            </div>
                          </form>
                          <div>
                            {order_export_to_excel ? (
                              <>
                                <button
                                  style={{
                                    margin: "auto 0px",
                                    marginRight: 15,
                                  }}
                                  onClick={this.exportAllListOrderMisa}
                                  class={`btn btn-info btn-icon-split btn-sm `}
                                >
                                  <span class="icon text-white-50">
                                    <i class="fas fa-file-export"></i>
                                  </span>
                                  <span style={{ color: "white" }} class="text">
                                    Export Excel Misa
                                  </span>
                                </button>

                                <button
                                  style={{
                                    margin: "auto 0px",
                                    marginRight: 15,
                                  }}
                                  onClick={this.exportAllListOrder}
                                  class={`btn btn-success btn-icon-split btn-sm `}
                                >
                                  <span class="icon text-white-50">
                                    <i class="fas fa-file-export"></i>
                                  </span>
                                  <span style={{ color: "white" }} class="text">
                                    Export Excel Ikitech
                                  </span>
                                </button>
                              </>
                            ) : null}

                            <button
                              style={{
                                margin: "auto 0px",
                              }}
                              class={`btn btn-primary btn-sm`}
                              title="Đồng bộ trạng thái đơn hàng với đơn vị vận chuyển"
                              onClick={() => {
                                this.setState({
                                  runAsync: helper.randomString(10),
                                });
                              }}
                            >
                              <i class="fa fa-sync"></i> Đồng bộ trạng thái giao
                              hàng
                            </button>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p
                            class="total-item total-item-custom"
                            id="sale_user_name"
                          >
                            <div className="total-sale_user_name input-group">
                              <select
                                value={statusTime}
                                name=""
                                id="input"
                                class="form-control"
                                required="required"
                                onChange={this.onChangeStatusTime}
                              >
                                <option value="time_order">
                                  Thời gian tạo đơn
                                </option>
                                <option value="last_time_change_order_status">
                                  Thời gian trạng thái cuối
                                </option>
                              </select>
                              <div className="input-group-append input-date">
                                <Flatpickr
                                  data-enable-time
                                  value={
                                    new Date(moment(time_from, "DD-MM-YYYY"))
                                  }
                                  className="date_from"
                                  placeholder="Chọn ngày bắt đầu..."
                                  options={{
                                    altInput: true,
                                    dateFormat: "DD-MM-YYYY",
                                    altFormat: "DD-MM-YYYY",
                                    allowInput: true,
                                    enableTime: false,
                                    maxDate: time_to,
                                    parseDate: (datestr, format) => {
                                      return moment(
                                        datestr,
                                        format,
                                        true
                                      ).toDate();
                                    },
                                    formatDate: (date, format, locale) => {
                                      // locale can also be used
                                      return moment(date).format(format);
                                    },
                                  }}
                                  onChange={([date]) =>
                                    this.onchangeDateFrom(date)
                                  }
                                  onClose={(selectedDates, dateStr) => {
                                    // Thực hiện chỉ khi dropdown đóng lại
                                    this.onchangeDateFrom(selectedDates[0]);
                                  }}
                                />
                                <Flatpickr
                                  data-enable-time
                                  value={
                                    new Date(moment(time_to, "DD-MM-YYYY"))
                                  }
                                  className="date_to"
                                  placeholder="Chọn ngày kết thúc..."
                                  options={{
                                    altInput: true,
                                    dateFormat: "DD-MM-YYYY",
                                    altFormat: "DD-MM-YYYY",
                                    allowInput: true,
                                    enableTime: false,
                                    minDate: time_from,
                                    parseDate: (datestr, format) => {
                                      return moment(
                                        datestr,
                                        format,
                                        true
                                      ).toDate();
                                    },
                                    formatDate: (date, format, locale) => {
                                      // locale can also be used
                                      return moment(date).format(format);
                                    },
                                  }}
                                  onChange={([date]) =>
                                    this.onchangeDateTo(date)
                                  }
                                  onClose={(selectedDates, dateStr) => {
                                    // Thực hiện chỉ khi dropdown đóng lại
                                    this.onchangeDateTo(selectedDates[0]);
                                  }}
                                />
                              </div>
                            </div>
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "column",
                          }}
                        >
                          <div
                            className="bill-total"
                            style={{
                              marginTop: "15px",
                              paddingLeft: "20px",
                            }}
                          >
                            <span
                              className="text-total_item"
                              id="user_name"
                              style={{
                                display: "inline-block",
                                marginRight: "5px",
                              }}
                            >
                              Hóa đơn:
                            </span>
                            <span className="num-total_item">
                              {bills.total} đơn
                            </span>
                          </div>
                          <div
                            className="bill-total"
                            style={{
                              marginTop: "15px",
                              paddingLeft: "20px",
                            }}
                          >
                            <span
                              className="text-total_item"
                              id="user_name"
                              style={{
                                display: "inline-block",
                                marginRight: "5px",
                              }}
                            >
                              Tổng tiền:
                            </span>
                            <span className="num-total_item">
                              {helper.format(bills.total_price)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <Table
                          isLoading={this.state.loadingShipment}
                          runAsync={runAsync}
                          onchangeOrderFrom={this.onchangeOrderFrom}
                          getParams={this.getParams}
                          time_from={time_from}
                          time_to={time_to}
                          statusTime={statusTime}
                          orderFrom={orderFrom}
                          searchValue={searchValue}
                          chat_allow={chat_allow}
                          onchangeStatusOrder={this.onchangeStatusOrder}
                          onchangeStatusPayment={this.onchangeStatusPayment}
                          numPage={numPage}
                          statusOrder={statusOrder}
                          statusPayment={statusPayment}
                          collaborator_by_customer_id={
                            collaborator_by_customer_id
                          }
                          paginate={this.state.paginate}
                          agency_by_customer_id={agency_by_customer_id}
                          handleShowChatBox={this.handleShowChatBox}
                          store_code={store_code}
                          bills={bills}
                        />
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <div style={{ display: "flex" }}>
                            <span
                              style={{
                                margin: "20px 10px auto auto",
                              }}
                            >
                              Hiển thị
                            </span>
                            <select
                              style={{
                                margin: "auto",
                                marginTop: "10px",
                                marginRight: "20px",
                                width: "70px",
                              }}
                              onChange={this.onChangeNumPage}
                              value={numPage}
                              name="numPage"
                              class="form-control"
                            >
                              <option value="10">10</option>
                              <option value="20" selected>
                                20
                              </option>
                              <option value="50">50</option>
                            </select>
                          </div>

                          <Pagination
                            time_from={time_from}
                            time_to={time_to}
                            orderFrom={orderFrom}
                            searchValue={searchValue}
                            limit={numPage}
                            status_payment={statusPayment}
                            store_code={store_code}
                            getParams={this.getParams}
                            bills={bills}
                            status_order={statusOrder}
                            collaborator_by_customer_id={
                              collaborator_by_customer_id
                            }
                            agency_by_customer_id={agency_by_customer_id}
                            statusTime={statusTime}
                            setPaginate={this.setPaginate}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />
            </div>
            <Chat
              customerName={customerName}
              customerImg={customerImg}
              customerId={customerId}
              chat={chat}
              store_code={store_code}
              closeChatBox={this.closeChatBox}
              showChatBox={showChatBox}
            ></Chat>
          </div>
        </BillStyles>
      );
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    bills: state.billReducers.bill.allBill,
    auth: state.authReducers.login.authentication,
    chat: state.chatReducers.chat.chatID,
    permission: state.authReducers.permission.data,
    customer: state.customerReducers.customer.customerID,
    user: state.userReducers.user.userID,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllBill: (id, page, branch_id, params, params_agency) => {
      dispatch(
        billAction.fetchAllBill(id, page, branch_id, params, params_agency)
      );
    },
    fetchChatId: (store_code, customerId) => {
      dispatch(billAction.fetchChatId(store_code, customerId));
    },

    fetchCustomerId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerId(store_code, customerId));
    },
    exportAllListOrder: (id, page, branch_id, params, params_agency) => {
      dispatch(
        billAction.exportAllListOrder(
          id,
          page,
          branch_id,
          params,
          params_agency
        )
      );
    },
    exportAllListOrderMisa: (id, page, branch_id, params, params_agency) => {
      dispatch(
        billAction.exportAllListOrderMisa(
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
export default connect(mapStateToProps, mapDispatchToProps)(Bill);
