import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  filter_arr,
  format,
  getQueryParams,
  randomString,
} from "../../ultis/helpers";
import { connect } from "react-redux";
import Pagination from "../../components/Bill/Pagination";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import * as billAction from "../../actions/bill";
import { shallowEqual } from "../../ultis/shallowEqual";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";
import * as OrderFrom from "../../ultis/order_from";
import ListComponentToPrint from "../../screens/Bill/ListComponentPrint";
import ReactToPrint from "react-to-print";
import * as Types from "../../constants/ActionType";
import * as billApi from "../../data/remote/bill";
import "./style.css";
import history from "../../history";
import { insertParam } from "../../ultis/helpers";
import styled from "styled-components";
import axios from "axios";
import { fetchNewNumberOrder, getNumberOrder } from "../../ultis/apiCaller";

const TableStyles = styled.div`
  .product_order_code {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const statusCode = {
  WAITING_FOR_PROGRESSING: "WAITING_FOR_PROGRESSING",
  PACKING: "PACKING",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  SHIPPING: "SHIPPING",
  RECEIVED_PRODUCT: "RECEIVED_PRODUCT",
  COMPLETED: "COMPLETED",
  USER_CANCELLED: "USER_CANCELLED",
  CUSTOMER_CANCELLED: "CUSTOMER_CANCELLED",
  DELIVERY_ERROR: "DELIVERY_ERROR",
  CUSTOMER_RETURNING: "CUSTOMER_RETURNING",
  CUSTOMER_HAS_RETURNS: "CUSTOMER_HAS_RETURNS",
};

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusOrder: "",
      changeStatusOrder: "",
      statusPayment: "",
      orderFrom: "",
      isLoading: false,
      selected: [],

      statuses: [
        // {
        //   name: "Chờ xử lý",
        //   code: "WAITING_FOR_PROGRESSING",
        //   accept: [
        //     statusCode["PACKING"],
        //     statusCode["OUT_OF_STOCK"],
        //     statusCode["SHIPPING"],
        //     statusCode["RECEIVED_PRODUCT"],
        //     statusCode["COMPLETED"],
        //     statusCode["USER_CANCELLED"],
        //     statusCode["CUSTOMER_CANCELLED"],
        //   ],
        // },
        {
          name: "Đang chuẩn bị hàng",
          code: "PACKING",
          accept: [
            statusCode["OUT_OF_STOCK"],
            statusCode["SHIPPING"],
            statusCode["RECEIVED_PRODUCT"],
            statusCode["COMPLETED"],
            statusCode["USER_CANCELLED"],
            statusCode["CUSTOMER_CANCELLED"],
          ],
        },
        // {
        //   name: "Hết hàng",
        //   code: "OUT_OF_STOCK",
        //   accept: [],
        // },
        {
          name: "Đang giao hàng",
          code: "SHIPPING",
          accept: [
            statusCode["RECEIVED_PRODUCT"],
            statusCode["COMPLETED"],
            statusCode["USER_CANCELLED"],
            statusCode["CUSTOMER_CANCELLED"],
            statusCode["DELIVERY_ERROR"],
            statusCode["CUSTOMER_RETURNING"],
            statusCode["CUSTOMER_HAS_RETURNS"],
          ],
        },
        {
          name: "Đã nhận hàng",
          code: "RECEIVED_PRODUCT",
          accept: [
            statusCode["COMPLETED"],
            statusCode["CUSTOMER_RETURNING"],
            statusCode["CUSTOMER_HAS_RETURNS"],
          ],
        },
        {
          name: "Đã hoàn thành",
          code: "COMPLETED",
          accept: [
            statusCode["CUSTOMER_RETURNING"],
            statusCode["CUSTOMER_HAS_RETURNS"],
          ],
        },
        // {
        //   name: "Shop đã hủy",
        //   code: "USER_CANCELLED",
        //   accept: [
        //     statusCode["CUSTOMER_RETURNING"],
        //     statusCode["CUSTOMER_HAS_RETURNS"],
        //   ],
        // },
        // {
        //   name: "Khách đã hủy",
        //   code: "CUSTOMER_CANCELLED",
        //   accept: [
        //     statusCode["CUSTOMER_RETURNING"],
        //     statusCode["CUSTOMER_HAS_RETURNS"],
        //   ],
        // },

        // {
        //   name: "Lỗi giao hàng",
        //   code: "DELIVERY_ERROR",
        //   accept: [
        //     statusCode["CUSTOMER_RETURNING"],
        //     statusCode["CUSTOMER_HAS_RETURNS"],
        //   ],
        // },

        // {
        //   name: "Chờ trả hàng",
        //   code: "CUSTOMER_RETURNING",
        //   accept: [statusCode["CUSTOMER_HAS_RETURNS"]],
        // },
        // {
        //   name: "Đã trả hàng",
        //   code: "CUSTOMER_HAS_RETURNS",
        //   accept: [],
        // },
      ],
    };
    this.syncArr = [];
    this.asyncElm = null;
    this.useLoading = false;
  }

  showChatBox = (customerId, customerImg, customerName, status) => {
    this.props.handleShowChatBox(customerId, customerImg, customerName, status);
  };

  componentWillMount() {
    if (this.props.statusOrder != "" || this.props.statusPayment != "") {
      this.setState({
        statusOrder: this.props.statusOrder,
        statusPayment: this.props.statusPayment,
      });
    }
  }

  onchangeStatusOrder = (e) => {
    var { value } = e.target;
    this.setState({ statusOrder: value });
    var { statusPayment, statusOrder, orderFrom } = this.state;
    var {
      store_code,
      time_from,
      time_to,
      numPage,
      searchValue,
      collaborator_by_customer_id,
      statusTime,
    } = this.props;
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    var params = this.props.getParams(
      time_from,
      time_to,
      searchValue,
      value,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id,
      statusTime
    );
    insertParam({
      order_status_code: value,
      page: 1,
    });
    this.props.onchangeStatusOrder(value);
    var params_agency =
      this.props.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.props.agency_by_customer_id}`
        : null;
    this.props.fetchAllBill(store_code, 1, branchIds, params, params_agency);
  };
  onchangeStatusPayment = (e) => {
    var { value } = e.target;
    this.setState({ statusPayment: value });
    var { statusPayment, statusOrder, orderFrom } = this.state;
    var {
      store_code,
      time_from,
      time_to,
      numPage,
      searchValue,
      collaborator_by_customer_id,
      statusTime,
    } = this.props;
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;

    var params = this.props.getParams(
      time_from,
      time_to,
      searchValue,
      statusOrder,
      value,
      numPage,
      orderFrom,
      collaborator_by_customer_id,
      statusTime
    );
    insertParam({
      payment_status_code: value,
      page: 1,
    });
    this.props.onchangeStatusPayment(value);
    var params_agency =
      this.props.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.props.agency_by_customer_id}`
        : null;
    this.props.fetchAllBill(store_code, 1, branchIds, params, params_agency);
  };

  onchangeOrderFrom = (e) => {
    var { value } = e.target;
    this.setState({ orderFrom: value });
    var { statusPayment, statusOrder, orderFrom } = this.state;
    var {
      store_code,
      time_from,
      time_to,
      numPage,
      searchValue,
      collaborator_by_customer_id,
      statusTime,
    } = this.props;
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    var params = this.props.getParams(
      time_from,
      time_to,
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      value,
      collaborator_by_customer_id,
      statusTime
    );
    insertParam({
      order_from_list: value,
      page: 1,
    });
    this.props.onchangeOrderFrom(value);
    var params_agency =
      this.props.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.props.agency_by_customer_id}`
        : null;
    this.props.fetchAllBill(store_code, 1, branchIds, params, params_agency);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      (this.props.statusOrder != nextProps.statusOrder ||
        this.props.statusPayment != nextProps.statusPayment ||
        nextState.statusPayment != nextProps.statusPayment ||
        nextState.statusOrder != nextProps.statusOrder ||
        !shallowEqual(nextProps.bills, this.props.bills)) &&
      nextState.isLoading == false
    ) {
      this.setState({
        statusOrder: nextProps.statusOrder,
        statusPayment: nextProps.statusPayment,
        isLoading: true,
      });
    }
    return true;
  }
  componentWillReceiveProps(nextProps) {
    if (
      (this.props.statusOrder != nextProps.statusOrder ||
        this.props.statusPayment != nextProps.statusPayment ||
        this.state.statusPayment != nextProps.statusPayment ||
        this.state.statusOrder != nextProps.statusOrder) &&
      this.state.isLoading == true
    )
      this.setState({
        statusOrder: nextProps.statusOrder,
        statusPayment: nextProps.statusPayment,
      });

    if (nextProps.runAsync !== this.props.runAsync) {
      this.useLoading = true;
      this.asyncElm?.click();
    }
    if (
      (nextProps.isLoading !== this.props.isLoading ||
        !shallowEqual(nextProps.bills, this.props.bill)) &&
      nextProps.runAsync == this.props.runAsync
    ) {
      this.useLoading = false;
      this.asyncElm?.click();
    }
  }

  countItem = (list) => {
    var result = "";
    var length = 0;
    if (list.length > 0) {
      result = list.map((data, index) => {
        length = data.quantity + length;
      });
    }
    return length;
  };

  colorWithPaymentColor = (payment_status_code) => {
    if (payment_status_code == "WAITING_FOR_PROGRESSING") {
      return "warning";
    }
    if (payment_status_code == "UNPAID") {
      return "danger";
    }
    if (payment_status_code == "PARTIALLY_PAID") {
      return "warning";
    }
    if (payment_status_code == "REFUNDS") {
      return "dark";
    }

    return "success";
  };

  colorWithOrderStatusColor = (order_status_code) => {
    if (
      order_status_code == "WAITING_FOR_PROGRESSING" ||
      order_status_code == "PACKING" ||
      order_status_code == "SHIPPING" ||
      order_status_code == "WAIT_FOR_PAYMENT"
    ) {
      return "warning";
    }
    if (
      order_status_code == "DELIVERY_ERROR" ||
      order_status_code == "DELIVERY_ERROR" ||
      order_status_code == "CUSTOMER_CANCELLED" ||
      order_status_code == "USER_CANCELLED" ||
      order_status_code == "OUT_OF_STOCK"
    ) {
      return "danger";
    }
    if (
      order_status_code == "REFUNDS" ||
      order_status_code == "CUSTOMER_RETURNING" ||
      order_status_code == "CUSTOMER_HAS_RETURNS"
    ) {
      return "dark";
    }

    return "success";
  };
  onChangeSelected = (e, data) => {
    var { checked } = e.target;
    var selected = [...this.state.selected];
    if (checked == true) {
      selected.push(data);
    } else {
      for (const [index, item] of selected.entries()) {
        if (item.id == data.id) {
          selected.splice(index, 1);
        }
      }
    }
    this.setState({ selected });
  };
  onClickItemOrder = (e, store_code, order_code) => {
    if (e.target.name !== "checked") {
      var { statusOrder, statusPayment } = this.state;
      var params = `?param=true&page=${getQueryParams("page")}`;
      if (statusOrder) params = params + `&order_status_code=${statusOrder}`;
      if (statusPayment)
        params = params + `&payment_status_code=${statusPayment}`;
      fetchNewNumberOrder();
      history.push(`/order/detail/${store_code}/${order_code}${params}`);
    }
  };

  checkSelected = (id) => {
    var selected = [...this.state.selected];
    if (selected.length > 0) {
      for (const item of selected) {
        if (item.id == id) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  checkLoadingSyncShip = (order_code) => {
    var syncArr = this.syncArr;
    if (syncArr?.length > 0) {
      return syncArr.filter(
        (v) => v.order_code == order_code && v.status == Types.LOADING
      )[0];
    }
    return false;
  };

  checkLoaded = (order_code) => {
    var syncArr = this.syncArr;
    if (syncArr?.length > 0) {
      return syncArr.filter(
        (v) => v.order_code == order_code && v.status == Types.SUCCESS
      )[0];
    }
    return false;
  };

  showData = (bill, per_page, current_page) => {
    var { store_code } = this.props;
    var result = null;
    if (bill.length > 0) {
      var { chat_allow } = this.props;
      result = bill.map((data, index) => {
        var checked = this.checkSelected(data.id);

        var _order_status_name = this.colorWithOrderStatusColor(
          data.order_status_code
        );
        var _payment_status_code = this.colorWithPaymentColor(
          data.payment_status_code
        );

        // if(itemLoaded &&
        //   itemLoaded.status === "SUCCESS" &&
        //   itemLoaded.payment_status_name !== null){
        //   }{
        //     _order_status_name = this.colorWithOrderStatusColor(
        //       data.order_status_code
        //     )
        //   }

        var countItem = this.countItem(data.line_items_at_time);
        var is_collaborator =
          data.collaborator_by_customer_id != null ? "check" : "close";
        var order_from =
          data.order_from == OrderFrom.ORDER_FROM_APP
            ? "App"
            : data.order_from == OrderFrom.ORDER_FROM_POS_DELIVERY
            ? "POS giao vận"
            : data.order_from == OrderFrom.ORDER_FROM_POS_IN_STORE
            ? "POS tại quầy"
            : data.order_from == OrderFrom.ORDER_FROM_POS_SHIPPER
            ? "POS vận chuyển"
            : data.order_from == OrderFrom.ORDER_FROM_WEB
            ? "Web"
            : "Pos tại quầy";

        var item = this.checkLoadingSyncShip(data.order_code);
        var itemLoaded = this.checkLoaded(data.order_code);
        return (
          <tr className="hover-product">
            <td>
              {" "}
              <input
                name="checked"
                style={{
                  height: "initial",
                  marginBottom: "0px",
                }}
                type="checkbox"
                checked={checked}
                onChange={(e) => this.onChangeSelected(e, data)}
              />
            </td>
            <td>{per_page * (current_page - 1) + (index + 1)}</td>
            <td
              onClick={(e) =>
                this.onClickItemOrder(e, store_code, data.order_code)
              }
            >
              <span
                style={{
                  color: "#5e72e4",
                }}
                className="product_order_code"
              >
                {data.order_code}
              </span>
            </td>
            <td>{data.customer_name ? data.customer_name : null}</td>
            {/* {
              getChannel() == IKITECH &&
              <td className="status_check"><i class={`fas fa-${is_collaborator} ${is_collaborator + "-status"} `}></i></td>
            } */}
            <td>{format(data.total_final)}</td>
            {getChannel() == IKITECH && <td>{order_from}</td>}
            <td>{data.created_at}</td>
            <td>
              {item && this.useLoading == true ? (
                <div style={{ display: "flex", "justify-content": "center" }}>
                  <div class="snippet" data-title=".dot-flashing">
                    <div class="stage">
                      <div class="dot-flashing"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <span
                  style={{ fontWeight: "500" }}
                  className={_payment_status_code}
                >
                  {itemLoaded &&
                  itemLoaded.status === "SUCCESS" &&
                  itemLoaded.payment_status_name !== null &&
                  typeof itemLoaded.payment_status_name !== "undefined"
                    ? itemLoaded.payment_status_name
                    : data.payment_status_name}
                </span>
              )}
            </td>
            {getChannel() == IKITECH && (
              <td>
                {item && this.useLoading == true ? (
                  <div style={{ display: "flex", "justify-content": "center" }}>
                    <div class="snippet" data-title=".dot-flashing">
                      <div class="stage">
                        <div class="dot-flashing"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <span
                    style={{ fontWeight: "500" }}
                    className={_order_status_name}
                  >
                    {itemLoaded &&
                    itemLoaded.status === "SUCCESS" &&
                    itemLoaded.order_status_name !== null &&
                    typeof itemLoaded.order_status_name !== "undefined"
                      ? itemLoaded.order_status_name
                      : data.order_status_name}
                  </span>
                )}
              </td>
            )}
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  optionsPaymentStatus = (statusPayment) => {
    return (
      <select
        value={statusPayment || ""}
        name=""
        id="input"
        class="form-control"
        r
        equired="required"
        onChange={this.onchangeStatusPayment}
      >
        <option disabled>--Trạng thái thanh toán--</option>

        <option value="">Tất cả</option>
        <option value="UNPAID">Chưa thanh toán</option>
        {
          <React.Fragment>
            {/* <option value="WAITING_FOR_PROGRESSING">Chờ xử lý</option> */}
            {/* <option value="CUSTOMER_CANCELLED">Đã hủy</option> */}
            <option value="PARTIALLY_PAID">Đã thanh toán một phần</option>
          </React.Fragment>
        }

        <option value="PAID">Đã thanh toán</option>
        <option value="REFUNDS">Đã hoàn tiền</option>
      </select>
    );
  };

  optionsOrderFrom = (orderFrom) => {
    return (
      <select
        value={orderFrom || ""}
        name=""
        id="input"
        class="form-control"
        onChange={this.onchangeOrderFrom}
      >
        <option disabled>Nguồn</option>

        <option value="">Tất cả</option>
        <option value={OrderFrom.ORDER_FROM_POS_IN_STORE}>Pos tại quầy</option>
        <option value={OrderFrom.ORDER_FROM_POS_DELIVERY}>Pos giao vận</option>
        <option value={OrderFrom.ORDER_FROM_WEB}>Web</option>
        <option value={OrderFrom.ORDER_FROM_APP}>App</option>
      </select>
    );
  };

  optionOrderStatus = (statusOrder) => {
    if (getChannel() == IKITECH) {
      return (
        <select
          value={statusOrder || ""}
          name=""
          id="input"
          class="form-control"
          required="required"
          onChange={this.onchangeStatusOrder}
        >
          <option disabled>--Trạng thái đơn hàng--</option>

          <option value="">Tất cả</option>

          <option value="WAITING_FOR_PROGRESSING">Chờ xử lý</option>
          <option value="PACKING">Đang chuẩn bị hàng</option>
          <option value="OUT_OF_STOCK">Hết hàng</option>
          <option value="USER_CANCELLED">Shop hủy</option>
          <option value="CUSTOMER_CANCELLED">Khách đã hủy</option>
          <option value="SHIPPING">Đang giao hàng</option>
          <option value="DELIVERY_ERROR">Lỗi giao hàng</option>
          <option value="COMPLETED">Đã hoàn thành</option>
          <option value="CUSTOMER_RETURNING">Chờ trả hàng</option>
          <option value="CUSTOMER_HAS_RETURNS">Đã trả hàng</option>
        </select>
      );
    }

    if (getChannel() == IKIPOS) {
      return (
        <select
          value={statusOrder || ""}
          name=""
          id="input"
          class="form-control"
          required="required"
          onChange={this.onchangeStatusOrder}
        >
          <option value="">Tất cả</option>
          <option value="USER_CANCELLED">Shop hủy</option>
          <option value="CUSTOMER_CANCELLED">Khách đã hủy</option>
          <option value="COMPLETED">Đã hoàn thành</option>
          <option value="CUSTOMER_HAS_RETURNS">Đã trả hàng</option>
        </select>
      );
    }
  };
  onChangeSelectAll = (e) => {
    var checked = e.target.checked;
    var { bills } = this.props;
    var _selected = [...this.state.selected];

    var listBills = filter_arr(bills.data);

    if (listBills.length > 0) {
      if (checked == false) {
        this.setState({ selected: [] });
      } else {
        _selected = [];
        listBills.forEach((bill) => {
          _selected.push(bill);
        });
        this.setState({ selected: _selected });
      }
    }
  };

  handleSyncShipment = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    var data = [];
    var { store_code, bills } = this.props;
    fetchNewNumberOrder();
    var listBill = typeof bills.data == "undefined" ? [] : bills.data;

    // var bills = listBill?.map((v, i) => v.order_code) || [];
    var bills = listBill?.map((v, i) => ({
      order_code: v.order_code,
      flag_order: getNumberOrder(),
    }));

    if (bills.length > 0) {
      this.syncArr = bills?.map((order_code) => {
        return {
          order_code: order_code,
          payment_status: null,
          order_status: null,
          status: Types.LOADING,
        };
      });
      this.setState({ reload: randomString(10) });
      for (const itemBill of bills) {
        var order_code = itemBill.order_code;

        if (getNumberOrder() != itemBill.flag_order) return;
        try {
          var res = await billApi.syncShipment(store_code, order_code, {
            allow_update: true,
          });

          if (res.data.success == true) {
            // eslint-disable-next-line no-loop-func
            data = this.syncArr?.map((v) => {
              if (v.order_code === order_code) {
                return {
                  order_code: order_code,
                  order_status_name: res.data?.data.order_status_name,
                  payment_status_name: res.data?.data.payment_status_name,
                  payment_status: res.data.data?.payment_status,
                  order_status: res.data.data?.order_status,
                  status: Types.SUCCESS,
                };
              } else {
                return v;
              }
            });
          }
        } catch (error) {
          data = this.syncArr?.map((v) => {
            if (v.order_code === order_code) {
              return {
                order_code: order_code,
                payment_status: null,
                order_status: null,
                status: Types.FAILURE,
              };
            } else {
              return v;
            }
          });
        }
        this.syncArr = [...data];
        this.setState({ reload: randomString(10) });
      }
    }
  };

  onChangeStatusMulti = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  changeMultiStatusOrder = () => {
    var {
      store_code,
      updateListStatusOrder,
      time_from,
      time_to,
      numPage,
      searchValue,
      collaborator_by_customer_id,
      statusTime,
      paginate,
    } = this.props;
    const { selected, statusPayment, statusOrder, orderFrom } = this.state;

    const { changeStatusOrder } = this.state;
    const data = {
      order_codes:
        selected?.length > 0 ? selected.map((item) => item.order_code) : [],
      order_status_code: changeStatusOrder,
    };
    updateListStatusOrder(data, store_code, () => {
      const branch_id = getBranchId();
      const branch_ids = getBranchIds();
      const branchIds = branch_ids ? branch_ids : branch_id;
      var params = this.props.getParams(
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

      this.setState({ selected: [] });
      this.props.onchangeOrderFrom(orderFrom);
      var params_agency =
        this.props.agency_by_customer_id != null
          ? `&agency_by_customer_id=${this.props.agency_by_customer_id}`
          : null;

      this.props.fetchAllBill(
        store_code,
        paginate,
        branchIds,
        params,
        params_agency
      );
    });
  };
  render() {
    var { store_code, bills, numPage, badges, currentBranch, stores } =
      this.props;
    var {
      statusOrder,
      statusPayment,
      orderFrom,
      selected,
      changeStatusOrder,
      statuses,
    } = this.state;

    var per_page = bills.per_page;
    var current_page = bills.current_page;
    var listBill = bills.data ?? [];
    var _selected =
      selected.length > 0 && selected.length == bills.data?.length
        ? true
        : false;
    var multiPrint = selected.length > 0 ? "show" : "hide";
    return (
      <TableStyles>
        <button
          // onClick={(e) => this.handleMultiDelCallBack(e, selected)}
          // data-toggle="modal"
          // data-target="#removeMultiModal"
          ref={(ref) => (this.asyncElm = ref)}
          style={{ marginLeft: "10px", display: "none" }}
          class={`btn btn-primary btn-sm`}
          title="Đồng bộ trạng thái đơn hàng với đơn vị vận chuyển"
          onClick={() => {
            this.handleSyncShipment();
          }}
        >
          <i class="fa fa-sync"></i> Đồng bộ {listBill.length} trạng thái giao
          hàng
        </button>
        <div class="table-responsive">
          <select
            value={changeStatusOrder || ""}
            name="changeStatusOrder"
            id="input"
            required="required"
            onChange={this.onChangeStatusMulti}
            placeholder="Chuyển trạng thái"
            className={`form-control ${multiPrint}`}
            style={{
              display: "inline-block",
              width: "190px",
            }}
          >
            <option value="" disabled>
              Trạng thái đơn hàng
            </option>
            {statuses.map((status) => (
              <option value={status.code} key={status.code}>
                {status.name}
              </option>
            ))}
          </select>
          <button
            style={{ marginLeft: "10px" }}
            title="Chuyển trạng thái đơn hàng"
            class={`btn btn-primary btn-sm ${multiPrint}`}
            disabled={!changeStatusOrder}
            onClick={this.changeMultiStatusOrder}
          >
            Chuyển trạng thái
          </button>
          <ReactToPrint
            trigger={() => {
              return (
                <button
                  // onClick={(e) => this.handleMultiDelCallBack(e, selected)}
                  // data-toggle="modal"
                  // data-target="#removeMultiModal"
                  style={{ marginLeft: "10px" }}
                  title="In đơn hàng"
                  class={`btn btn-danger btn-sm ${multiPrint}`}
                >
                  <i class="fa fa-print"></i> In {selected.length} đơn hàng
                </button>
              );
            }}
            content={() => this.componentRef}
          />

          <div className="print-source " style={{ display: "none" }}>
            {getChannel() == IKITECH &&
              selected.length > 0 &&
              currentBranch != null &&
              stores.length > 0 && (
                <ListComponentToPrint
                  currentBranch={currentBranch}
                  badges={badges}
                  bills={selected}
                  store_code={store_code}
                  stores={stores}
                  ref={(el) => (this.componentRef = el)}
                />
              )}
          </div>

          <table
            class="table table-border "
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={_selected}
                    onChange={this.onChangeSelectAll}
                  />
                </th>
                <th>STT</th>
                <th>Mã đơn</th>
                <th>Tên người nhận</th>

                {/* {getChannel() == IKITECH &&
                  <th>Cộng tác viên</th>
                } */}
                <th>Tổng tiền</th>
                {getChannel() == IKITECH && (
                  <th>{this.optionsOrderFrom(this.props.orderFrom)}</th>
                )}
                <th>Thời gian tạo đơn</th>

                <th>{this.optionsPaymentStatus(statusPayment)}</th>
                {getChannel() == IKITECH && (
                  <th>{this.optionOrderStatus(statusOrder)}</th>
                )}

                {/* {getChannel() == IKITECH && <th>Hành động</th>} */}
              </tr>
            </thead>

            <tbody>{this.showData(listBill, per_page, current_page)}</tbody>
          </table>
        </div>
      </TableStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stores: state.storeReducers.store.allStore,
    badges: state.badgeReducers.allBadge,
    currentBranch: state.branchReducers.branch.currentBranch,
    syncArray: state.billReducers.bill.syncArray,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllBill: (id, page, branch_id, params, param_agency) => {
      dispatch(
        billAction.fetchAllBill(id, page, branch_id, params, param_agency)
      );
    },
    syncShipment: (store_code, order_code, data, syncArr) => {
      dispatch(billAction.syncShipment(store_code, order_code, data, syncArr));
    },
    updateListStatusOrder: (data, store_code, onSuccess) => {
      dispatch(billAction.updateListStatusOrder(data, store_code, onSuccess));
    },
    syncShipmentStatus: (data) => {
      dispatch(data);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
