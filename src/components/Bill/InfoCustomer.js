import { data } from "jquery";
import React, { Component } from "react";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import getNamePaymentMethod from "../../ultis/payment_method";
import * as paymentAction from "../../actions/payment";
import { connect } from "react-redux";

import {
  filter_var,
  filter_arr,
  format,
  getDetailAdress,
} from "../../ultis/helpers";
import payment_method from "../../ultis/payment_method";
import { Link } from "react-router-dom";
import * as OrderFrom from "../../ultis/order_from";

class InfoCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // payment: []
    };
  }

  handleGetPaymentMethodName = (paymentMethodId) => {
    const payment = this.props.payment;
    return payment?.find((item) => item.id === paymentMethodId)?.name;
  };

  componentDidMount() {
    var { store_code } = this.props;

    this.props.fetchAllPayment(store_code);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.payment !== this.state.payment) {
  //     this.setState({
  //       payment: this.state.payment, 
  //     })
  //   }
  // }

  render() {

    var { bill, store_code } = this.props;
    var { payment_method_id, payment_method_name, payment_partner_name } = bill;

    var customer = bill.customer;
    var phone_customer =
      typeof customer == "undefined" || customer == null
        ? null
        : customer.phone_number;

    var name =
      typeof customer == "undefined" || customer == null ? null : customer.name;
    var orderTime = bill.created_at;
    var note = bill.customer_note == null ? "" : bill.customer_note;
    var payment = bill.payment_method_name;
    var { customer_address } = bill;
    var phone_number =
      typeof customer_address == "undefined" ? null : customer_address.phone;
    var email =
      typeof customer_address == "undefined" ? null : customer_address.email;

    var address_detail =
      typeof customer_address == "undefined"
        ? null
        : customer_address.address_detail;
    var wards_name =
      typeof customer_address == "undefined"
        ? null
        : customer_address.wards_name;
    var district_name =
      typeof customer_address == "undefined"
        ? null
        : customer_address.district_name;
    var province_name =
      typeof customer_address == "undefined"
        ? null
        : customer_address.province_name;
    var name_receipt =
      typeof customer_address == "undefined" ? null : customer_address.name;
    var id =
      typeof customer == "undefined" || customer == null ? null : customer.id;
    var order_from =
      bill.order_from == OrderFrom.ORDER_FROM_APP
        ? "App"
        : bill.order_from == OrderFrom.ORDER_FROM_POS_DELIVERY
        ? "POS giao vận"
        : bill.order_from == OrderFrom.ORDER_FROM_POS_IN_STORE
        ? "POS tại quầy"
        : bill.order_from == OrderFrom.ORDER_FROM_POS_SHIPPER
        ? "POS vận chuyển"
        : bill.order_from == OrderFrom.ORDER_FROM_WEB
        ? "Web"
        : "POS tại quầy";

    return (
      <div
        class="tab-pane active"
        id="duck"
        role="tabpanel"
        aria-labelledby="duck-tab"
      >
        <div class="row col-md-12 col-xs-12 form-group">
          <div class="info_user" style={{ marginTop: "20px" }}>
            <p class="sale_user_label" id="sale_user_name">
              <b>Đơn này từ {order_from}</b>
            </p>
            <p class="sale_user_label" id="sale_user_name">
              Khách hàng:{" "}
              <Link id="user_name" to={`/customer/detail/${store_code}/${id}`}>
                {name}
              </Link>
            </p>
            <p class="sale_user_label" id="sale_user_name">
              SĐT khách hàng: {phone_customer}
            </p>

            {getChannel() == IKITECH && (
              <div>
                {" "}
                <p class="sale_user_label" id="sale_user_name">
                  Người nhận: <span id="user_name">{name_receipt}</span>
                </p>
                <p class="sale_user_label">
                  SĐT người nhận: <span id="user_tel">{phone_number}</span>
                </p>
                <p class="sale_user_label" id="delivery_address">
                  Địa chỉ nhận:{" "}
                  <span id="user_address">
                    {getDetailAdress(
                      address_detail,
                      wards_name,
                      district_name,
                      province_name
                    )}
                  </span>
                </p>
              </div>
            )}

            <p class="sale_user_label">
              Email: <span id="user_tel">{email}</span>
            </p>
            <p class="sale_user_label" id="booking_time">
              Thời gian: <span id="booking_time_txt">{orderTime}</span>
            </p>
            <p class="sale_user_label" id="booking_time">
              Phương thức thanh toán:{" "}
              <span id="booking_time_txt">
                {this.handleGetPaymentMethodName(this.props.bill.payment_partner_id) || ""} 
                {/* {payment_method_name || ""} */}
                {/* {payment_partner_name} */}
              </span>
            </p>
            {bill.staff_name ? (
              <p class="sale_user_label" id="sale_user_name">
                Nhân viên bán hàng: {bill.staff_name}
              </p>
            ) : null}
            {bill.is_order_for_customer ? (
              <>
                <p class="sale_user_label" id="sale_user_name">
                  Đơn đặt hộ: {bill.order_code}
                </p>
                <p class="sale_user_label" id="sale_user_name">
                  Hoa hồng đặt đơn hộ:{" "}
                  {format(bill.total_commission_order_for_customer || 0)}
                </p>
              </>
            ) : null}
            {bill.collaborator_direct ? (
              <p class="sale_user_label" id="sale_user_name">
                CTV trực tiếp: {bill.collaborator_direct?.name}
              </p>
            ) : null}
            {bill.collaborator_indirect ? (
              <p class="sale_user_label" id="sale_user_name">
                CTV gián tiếp: {bill.collaborator_indirect?.name}
              </p>
            ) : null}
            {bill.agency_direct ? (
              <p class="sale_user_label" id="sale_user_name">
                Đại lý trực tiếp: {bill.agency_direct?.name}
              </p>
            ) : null}
            {bill.agency_indirect ? (
              <p class="sale_user_label" id="sale_user_name">
                Đại lý gián tiếp: {bill.agency_indirect?.name}
              </p>
            ) : null}
            <p class="sale_user_label">
              Ghi chú: <span id="user_note">{note}</span>
            </p>

            {getChannel() == IKIPOS && (
              <p class="sale_user_label">
                Phương thức thanh toán: &nbsp;
                <span class="cart_payment_method">
                  {getNamePaymentMethod(payment_method_id)}{" "}
                  {payment_partner_name}
                </span>
              </p>
            )}

            {/* {
                            getChannel() == IKITECH &&
                            <p class="sale_user_label">
                                Thanh toán:
                                <span class="cart_payment_method">{payment}</span>

                            </p>
                        } */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    payment: state.paymentReducers.payment.allPayment,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllPayment: (store_code) => {
      dispatch(paymentAction.fetchAllPayment(store_code));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoCustomer);
