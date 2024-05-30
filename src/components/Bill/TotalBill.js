import { data } from "jquery";
import React, { Component } from "react";
import { filter_var, filter_arr, format } from "../../ultis/helpers";

class TotalBill extends Component {
  constructor(props) {
    super(props);
  }

  changeStatus = (statusCode, name) => {
    this.props.handleUpdateStatusOrder({
      order_status_code: statusCode,
      statusName: name,
    });
  };

  render() {
    var { bill } = this.props;
    var shipper_name = bill.shipper_name;
    var total_shipping_fee = bill.total_shipping_fee || 0;
    var product_discount_amount = bill.product_discount_amount || 0;
    var voucher_discount_amount = bill.voucher_discount_amount || 0;
    var bonus_points_amount_used = bill.bonus_points_amount_used || 0;
    var discount = bill.discount || 0;
    var combo_discount_amount = bill.combo_discount_amount || 0;
    console.log(combo_discount_amount, combo_discount_amount > 0);
    var total_final = bill.total_final;
    var agree =
      bill.order_status_code == "WAITING_FOR_PROGRESSING" ? "show" : "hide";
    var cancel =
      bill.order_status_code != "WAITING_FOR_PROGRESSING" ? "show" : "hide";
    var disable =
      this.props.order_allow_change_status == true ? "show" : "hide";

    return (
      <div className="box box-warning cart_wrapper mb0">
        <div class="card-header py-3">
          <h6 class="m-0 title_content font-weight-bold text-primary">
            Tổng tiền
          </h6>
        </div>

        <div className="box-body table-responsive pt0">
          <br />
          <div>
            <p className="sale_user_label bold">
              Tổng tiền hàng:{" "}
              <span id="total_selected">
                {format(bill.total_before_discount || 0)}
              </span>
            </p>
          </div>
          {total_shipping_fee > 0 && (
            <div id="item_fee">
              <div className="sale_user_label bold">
                Phí giao hàng: <span>+ {format(total_shipping_fee)}</span>
              </div>
            </div>
          )}
          {product_discount_amount > 0 && (
            <div
              id={`item_fee ${product_discount_amount != 0 ? "show" : "hide"}`}
            >
              <div className="sale_user_label bold">
                <div> Giảm giá sản phẩm </div>:{" "}
                <span>- {format(product_discount_amount)}</span>
              </div>
            </div>
          )}
          {combo_discount_amount > 0 && (
            <div id={`item_fee ${combo_discount_amount > 0 ? "show" : "hide"}`}>
              <div className="sale_user_label bold">
                Giảm giá Combo : <span>- {format(combo_discount_amount)}</span>
              </div>
            </div>
          )}
          {voucher_discount_amount > 0 && (
            <div
              id={`item_fee ${voucher_discount_amount > 0 ? "show" : "hide"}`}
            >
              <div className="sale_user_label bold">
                Giảm giá Voucher :{" "}
                <span>- {format(voucher_discount_amount)}</span>
              </div>
            </div>
          )}
          {bonus_points_amount_used > 0 && (
            <div
              id={`item_fee ${bonus_points_amount_used > 0 ? "show" : "hide"}`}
            >
              <div className="sale_user_label bold">
                Sử dụng xu : <span>- {format(bonus_points_amount_used)}</span>
              </div>
            </div>
          )}
          {discount > 0 && (
            <div id={`item_fee ${discount > 0 ? "show" : "hide"}`}>
              <div className="sale_user_label bold">
                Chiết khấu : <span>- {format(discount)}</span>
              </div>
            </div>
          )}
          <div>
            <p className="sale_user_label bold">
              Tổng tiền:{" "}
              <span className="cart_payment_method">{format(total_final)}</span>
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <a
              id="sale_btn_accepted"
              className={`sale_btn_action sale_btn_action_10 btn btn-info w100p ${agree}`}
              data-toggle="modal"
              data-target="#postModal"
              onClick={() => {
                this.changeStatus("PACKING", "Đang chuẩn bị hàng");
              }}
            >
              <i className="fa fa-check" /> Phê duyệt
            </a>

            <a
              id="sale_btn_accepted"
              className={`sale_btn_action sale_btn_action_10 btn btn-danger w100p ${cancel}`}
              data-toggle="modal"
              data-target="#postModal"
              onClick={() => {
                this.changeStatus("USER_CANCELLED", "Shop đã hủy");
              }}
            >
              <i className="fa fa-times" /> Hủy đơn
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default TotalBill;
