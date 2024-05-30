import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import Alert from "../../components/Partials/Alert";
import * as Types from "../../constants/ActionType";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as billAction from "../../actions/bill";
import Form from "../../components/Bill/Form";
import { shallowEqual } from "../../ultis/shallowEqual";
import ReactToPrint from "react-to-print";
import ListComponentToPrint from "./ListComponentPrint";
import ComponentToPrintPos from "./ComponentToPrintPos";
import getChannel, { IKITECH, IKIPOS } from "../../ultis/channel";
import * as shipmentAction from "../../actions/shipment";
import * as posAction from "../../actions/post_order";

import history from "../../history";
import ModalDeleteOrder from "../../components/Bill/ModalDeleteOrder";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatBox: "show",
      showModalDeleteOrder: false,
      orderSelected: {},
    };
  }
  componentDidMount() {
    var { store_code, order_code, billId } = this.props.match.params;
    this.props.fetchBillId(store_code, order_code);
    this.props.fetchHistoryPay(store_code, order_code);
    this.props.fetchAllShipment(store_code);
    this.props.refreshEditOrder(false);
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.bill, this.props.bill)) {
      var { store_code } = this.props.match.params;
      var customerId = nextProps.bill.customer_id;

      if (nextProps.bill.customer != null) {
        this.props.fetchChatId(store_code, customerId);
        const branch_id = getBranchId();
        const branch_ids = getBranchIds();
        const branchIds = branch_ids ? branch_ids : branch_id;

        this.props.fetchAllBill(
          store_code,
          1,
          branchIds,
          null,
          `&phone_number=${nextProps.bill.phone_number}`
        );
      }
    }
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;
      var isShow = permissions.order_list;
      var chat_allow = permissions.chat_allow;
      var order_allow_change_status = permissions.order_allow_change_status;

      this.setState({
        isLoading: true,
        chat_allow,
        isShow,
        order_allow_change_status,
      });
    }
  }

  goBack = () => {
    history.goBack();
  };
  handleEditOrder = () => {
    const { order_code } = this.props.bill;
    const { store_code } = this.props.badges;
    const paidOrder =
      Number(this.props.bill.total_final) -
      Number(this.props.bill.remaining_amount);
    const orderFrom = this.props.bill.order_from;
    history.push(
      `/pos/${store_code}/${order_code}?paid=${paidOrder}&from=${orderFrom}`
    );
  };
  handleShowModalDelete = () => {
    this.setOrderSelected(this.props.bill);
    this.setShowModalDeleteOrder(true);
  };
  setOrderSelected = (orderSelected) => {
    this.setState({ orderSelected });
  };

  setShowModalDeleteOrder = (showModal) => {
    this.setState({ showModalDeleteOrder: showModal });
  };
  render() {
    var arrBills = [];
    var { store_code, order_code, billId } = this.props.match.params;
    var {
      bill,
      billHistoty,
      chat,
      stores,
      badges,
      historyPay,
      bills,
      currentBranch,
      shipment,
    } = this.props;
    var {
      showChatBox,
      chat_allow,
      isShow,
      order_allow_change_status,
      showModalDeleteOrder,
      orderSelected,
    } = this.state;
    if (bill) arrBills.push(bill);
    if (this.props.auth) {
      console.log("componentRef::: ", this.componentRef);
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div style={{ marginBottom: "25px" }} id="content">
                <Topbar store_code={store_code} />
                <div className="container-fluid">
                  <Alert
                    type={Types.ALERT_UID_STATUS}
                    alert={this.props.alert}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4 className="h4 title_content mb-0 text-gray-800">
                      Chi tiết đơn hàng
                    </h4>{" "}
                    <div>
                      <button
                        style={{ marginRight: "10px" }}
                        type="button"
                        onClick={this.goBack}
                        class="btn btn-warning  btn-sm"
                      >
                        <i class="fas fa-arrow-left"></i>&nbsp;Quay lại
                      </button>
                      <button
                        style={{ marginRight: "10px" }}
                        type="button"
                        onClick={this.handleShowModalDelete}
                        class="btn btn-danger  btn-sm"
                      >
                        <i className="fa fa-trash"></i>&nbsp;Xóa
                      </button>
                      <button
                        style={{ marginRight: "10px" }}
                        type="button"
                        onClick={this.handleEditOrder}
                        class="btn btn-success  btn-sm"
                      >
                        <i className="fa fa-edit"></i>&nbsp;Chỉnh sửa
                      </button>
                      <ReactToPrint
                        trigger={() => {
                          return (
                            <button
                              type="button"
                              class="btn btn-primary  btn-sm"
                            >
                              <i class="fas fa-print"></i>&nbsp;In hóa đơn
                            </button>
                          );
                        }}
                        content={() => this.componentRef}
                      />

                      <div
                        className="print-source "
                        style={{ display: "none" }}
                      >
                        {getChannel() == IKITECH &&
                          currentBranch != null &&
                          stores.length > 0 && (
                            <ListComponentToPrint
                              badges={badges}
                              bills={arrBills}
                              store_code={store_code}
                              stores={stores}
                              ref={(el) => (this.componentRef = el)}
                              currentBranch={this.props.currentBranch}
                            />
                          )}
                        {getChannel() == IKIPOS &&
                          currentBranch != null &&
                          stores.length > 0 && (
                            <ComponentToPrintPos
                              badges={badges}
                              bill={bill}
                              store_code={store_code}
                              stores={stores}
                              ref={(el) => (this.componentRef = el)}
                              currentBranch={this.props.currentBranch}
                            />
                          )}
                      </div>
                    </div>
                  </div>

                  <br></br>

                  <Form
                    shipment={shipment}
                    bills={bills}
                    historyPay={historyPay}
                    chat_allow={chat_allow}
                    order_allow_change_status={order_allow_change_status}
                    showChatBox={showChatBox}
                    chat={chat}
                    billId={billId}
                    order_code={order_code}
                    store_code={store_code}
                    bill={bill}
                    billHistoty={billHistoty}
                  ></Form>
                </div>
                {/* : <NotAccess />} */}
              </div>
              {!showModalDeleteOrder ? null : (
                <ModalDeleteOrder
                  store_code={store_code}
                  orderSelected={orderSelected}
                  setOrderSelected={this.setOrderSelected}
                  setShowModalDeleteOrder={this.setShowModalDeleteOrder}
                ></ModalDeleteOrder>
              )}
              <Footer />
            </div>
          </div>
        </div>
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
    shipment: state.shipmentReducers.shipment.allShipment,

    bill: state.billReducers.bill.billID,
    auth: state.authReducers.login.authentication,
    billHistoty: state.billReducers.bill.billHistory,
    historyPay: state.billReducers.bill.historyPay,
    alert: state.billReducers.alert.alert_uid,
    chat: state.chatReducers.chat.chatID,
    permission: state.authReducers.permission.data,
    stores: state.storeReducers.store.allStore,
    badges: state.badgeReducers.allBadge,
    currentBranch: state.branchReducers.branch.currentBranch,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchBillId: (store_code, billId) => {
      dispatch(billAction.fetchBillId(store_code, billId));
    },
    fetchHistoryPay: (store_code, order_code) => {
      dispatch(billAction.fetchHistoryPay(store_code, order_code));
    },
    fetchBillHistory: (store_code, billId) => {
      dispatch(billAction.fetchBillHistory(store_code, billId));
    },
    fetchChatId: (store_code, customerId) => {
      dispatch(billAction.fetchChatId(store_code, customerId));
    },
    fetchAllBill: (id, page, branch_id, params, params_agency) => {
      dispatch(
        billAction.fetchAllBill(id, page, branch_id, params, params_agency)
      );
    },
    fetchAllShipment: (store_code) => {
      dispatch(shipmentAction.fetchAllShipment(store_code));
    },
    refreshEditOrder: (data) => {
      dispatch(posAction.refreshEditOrder(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
