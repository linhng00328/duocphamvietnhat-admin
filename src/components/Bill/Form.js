import React, { Component } from "react";
import PaymentStatus from "./PaymentStatus";
import ModalOrder from "./ModalOrder";
import ModalPayment from "./ModalPayment";
import Chat from "../Chat";
import OrderStatus from "./OrderStatus";
import TotalBill from "./TotalBill";
import TotalBillPos from "./TotalBillPos";

import InfoProduct from "./InfoProduct";
import InfoProductPos from "./InfoProductPos";

import InfoCustomer from "./InfoCustomer";
import InfoCustomerPos from "./InfoCustomerPos";

import OrderHistory from "./OrderHistory";
import * as Env from "../../ultis/default";
import InfoBonusAgency from "./InfoBonusAgency";
import InfoShipper from "./InfoShipper";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import PaymentHistory from "./PaymentHistory";
import ChangeBranch from "./ChangeBranch";

import * as OrderFrom from "../../ultis/order_from";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: {},
      paymentData: {},
      showChatBox: "show",
      check: false,
      css_IKIPOS: "col-lg-9 col-md-8 col-sm-12  pl0 pr8",
      css_IKITECH: "col-lg-7 col-md-8 col-sm-12  pl0 pr8",
    };
  }

  handleUpdateStatusOrder = (data) => {
    var { order_code, store_code, billId } = this.props;
    var order = {};
    var value = {
      order_code: order_code,
      order_status_code: data.order_status_code,
      store_code,
      billId,
      statusName: data.statusName,
    };
    order.value = value;
    order.nameModal = "đơn hàng";

    this.setState({ orderData: order });
  };

  handleUpdateStatusPayment = (data) => {
    var { order_code, store_code, billId, chat } = this.props;
    var payment = {};
    var value = {
      order_code: order_code,
      payment_status_code: data.payment_status_code,
      store_code,
      billId,
      statusName: data.statusName,
    };
    payment.value = value;
    payment.nameModal = "thanh toán";

    this.setState({ paymentData: payment });
  };

  check = (status) => {
    this.setState({ check: status });
  };

  render() {
    var {
      bill,
      billHistoty,
      order_code,
      store_code,
      billId,
      chat,
      order_allow_change_status,
      historyPay,
      bills,
      shipment,
    } = this.props;
    var {
      orderData,
      paymentData,
      showChatBox,
      check,
      css_IKIPOS,
      css_IKITECH,
    } = this.state;
    var customerImg =
      typeof bill.customer == "undefined" || bill.customer == null
        ? Env.IMG_NOT_FOUND
        : bill.customer.avatar_image;
    var customerId = bill.customer_id;
    var customerName =
      typeof bill.customer == "undefined" || bill.customer == null
        ? "Trống"
        : bill.customer.name;

    return (
      <React.Fragment>
        <ModalOrder
          data={orderData}
          billId={billId}
          order_code={order_code}
          store_code={store_code}
          order_id={bill.id}
        />
        <ModalPayment
          data={paymentData}
          billId={billId}
          order_code={order_code}
          store_code={store_code}
          order_id={bill.id}
        />
        <section className="content">
          <div className="row">
            {getChannel() == IKITECH &&
              bill.order_from !== OrderFrom.ORDER_FROM_POS_IN_STORE &&
              bill.order_from !== null && (
                <div className="col-lg-2 col-md-4 col-sm-12 ">
                  <div className="row" id="sale_nav_container">
                    <div className="" style={{ width: "100%" }}>
                      <aside class="side-menu">
                        <OrderStatus
                          showBoard={
                            bill.order_status_code !== "USER_CANCELLED" &&
                            bill.order_status_code !== "CUSTOMER_CANCELLED"
                              ? true
                              : false
                          }
                          order_allow_change_status={order_allow_change_status}
                          handleUpdateStatusOrder={this.handleUpdateStatusOrder}
                          billId={billId}
                          order_code={order_code}
                          store_code={store_code}
                          bill={bill}
                        />
                      </aside>
                    </div>

                    <div
                      className=""
                      style={{ width: "100%", marginTop: "-5px" }}
                    >
                      <aside class="side-menu">
                        <PaymentStatus
                          order_allow_change_status={order_allow_change_status}
                          showBoard={
                            bill.order_status_code !== "USER_CANCELLED" &&
                            bill.order_status_code !== "CUSTOMER_CANCELLED"
                              ? true
                              : false
                          }
                          handleUpdateStatusPayment={
                            this.handleUpdateStatusPayment
                          }
                          bill={bill}
                        />
                      </aside>
                    </div>
                  </div>
                </div>
              )}

            <div
              className={
                getChannel() == IKIPOS ||
                bill.order_from == OrderFrom.ORDER_FROM_POS_IN_STORE ||
                bill.order_from == null
                  ? css_IKIPOS
                  : css_IKITECH
              }
            >
              {getChannel() == IKIPOS ? (
                <InfoProductPos
                  check={check}
                  store_code={store_code}
                  bills={bills}
                  bill={bill}
                />
              ) : (
                <InfoProductPos
                  check={check}
                  store_code={store_code}
                  bills={bills}
                  bill={bill}
                />
              )}
              <InfoBonusAgency store_code={store_code} bill={bill} />

              <div style={{ marginTop: "10px" }} className=" tab">
                <div class="">
                  <div class="row">
                    <div class="col-12 col-md-12 col-lg-12">
                      <ul class="nav nav-tabs nav-fill" role="tablist">
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            data-toggle="tab"
                            href="#duck"
                            role="tab"
                            aria-controls="duck"
                            aria-selected="true"
                          >
                            Thông tin khách hàng
                          </a>
                        </li>

                        {getChannel() == IKITECH && (
                          <li class="nav-item">
                            <a
                              class="nav-link "
                              data-toggle="tab"
                              href="#chicken"
                              role="tab"
                              aria-controls="chicken"
                              aria-selected="false"
                            >
                              Lịch sử đơn hàng
                            </a>
                          </li>
                        )}
                        {
                          <li class="nav-item">
                            <a
                              class="nav-link "
                              data-toggle="tab"
                              href="#car"
                              role="tab"
                              aria-controls="car"
                              aria-selected="false"
                            >
                              Lịch sử thanh toán
                            </a>
                          </li>
                        }
                      </ul>

                      <div class="tab-content card" style={{ padding: "10px" }}>
                        {getChannel() == IKITECH && (
                          <InfoCustomer
                            bill={bill}
                            bills={bills}
                            store_code={store_code}
                          />
                        )}
                        {getChannel() == IKIPOS && (
                          <InfoCustomerPos
                            bill={bill}
                            bills={bills}
                            store_code={store_code}
                          />
                        )}

                        {/* <OrderHistory billHistoty={billHistoty} /> */}
                        {getChannel() == IKITECH &&
                          bills.data &&
                          bills.data.length > 0 && (
                            <OrderHistory billHistoty={billHistoty} />
                          )}

                        {bills.data && bills.data.length > 0 && (
                          <PaymentHistory
                            bills={bills.data}
                            historyPay={historyPay}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>

            <div className="col-lg-3 pr8 col-md-12   col-sm-12">
              <div className="row">
                <div className="card col-12 pl0" id="user_cart_info">
                  {typeof bill.id != "undefined" && (
                    <TotalBillPos
                      store_code={store_code}
                      order_code={order_code}
                      check={this.check}
                      order_allow_change_status={order_allow_change_status}
                      handleUpdateStatusOrder={this.handleUpdateStatusOrder}
                      bill={bill}
                    />
                  )}
                </div>

                <hr />

                {getChannel() == IKITECH &&
                  bill.order_from !== OrderFrom.ORDER_FROM_POS_IN_STORE &&
                  bill.order_from !== null &&
                  bill.order_status_code !== "CUSTOMER_HAS_RETURNS" && (
                    <div className="card col-12 pl0" id="user_cart_info">
                      <InfoShipper
                        order_allow_change_status={order_allow_change_status}
                        order_code={order_code}
                        store_code={store_code}
                        handleUpdateStatusOrder={this.handleUpdateStatusOrder}
                        bill={bill}
                      />
                    </div>
                  )}

                <hr />
                {getChannel() == IKITECH &&
                  bill.order_from !== OrderFrom.ORDER_FROM_POS_IN_STORE &&
                  bill.order_from !== null &&
                  bill.order_status_code !== "COMPLETED" &&
                  bill.order_status_code !== "SHIPPING" &&
                  bill.order_status_code !== "CUSTOMER_HAS_RETURNS" && (
                    <div className="card col-12 pl0" id="user_cart_info">
                      <ChangeBranch
                        order_allow_change_status={order_allow_change_status}
                        order_code={order_code}
                        store_code={store_code}
                        handleUpdateStatusOrder={this.handleUpdateStatusOrder}
                        bill={bill}
                      />
                    </div>
                  )}
                {getChannel() == IKITECH && (
                  <Chat
                    customerName={customerName}
                    showChatBox={showChatBox}
                    customerImg={customerImg}
                    customerId={customerId}
                    chat={chat}
                    store_code={store_code}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="modal fade in " id="preview_img">
            <div className="modal-dialog">
              <div className="modal-content">
                <img id="img_chat" />
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Form;
