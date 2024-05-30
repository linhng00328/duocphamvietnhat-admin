import React, { Component } from "react";
import { format, getDetailAdress } from "../../../ultis/helpers";
import { getDDMMYYYHis } from "../../../ultis/date";

class PrintOrderEcommerceContent extends Component {
  showListProduct = () => {
    var arr = [];
    var order = this.props.order;
    if (
      typeof order.line_items_at_time == "undefined" ||
      order.line_items_at_time == null
    ) {
      return null;
    }
    order.line_items_at_time.forEach((element, index) => {
      arr.push(
        <tr>
          <td>{index + 1}</td>
          <td style={{ textAlign: "start" }}>
            {element.name} {element.is_bonus == true ? "(Thưởng)" : ""}
          </td>
          <td>{element.quantity}</td>
          <td style={{ textAlign: "end" }}>
            {element.is_bonus == true
              ? format(0)
              : format(element.item_price * element.quantity)}
          </td>
        </tr>
      );
    });
    arr.push(
      <React.Fragment>
        {order.total_shipping_fee > 0 && (
          <tr>
            <td></td>

            <td style={{ textAlign: "start" }}>Phí vận chuyển</td>
            <td></td>

            <td style={{ textAlign: "end" }} colSpan="3">
              + {format(order.total_shipping_fee || 0)}
            </td>
          </tr>
        )}
        <tr>
          <td></td>

          <td style={{ textAlign: "start" }}>Giảm giá, Voucher, Combo</td>
          <td></td>

          {(order.product_discount_amount || 0) +
            (order.voucher_discount_amount || 0) +
            (order.combo_discount_amount || 0) >
            0 && (
            <td style={{ textAlign: "end" }} colSpan="3">
              -{" "}
              {format(
                (order.product_discount_amount || 0) +
                  (order.voucher_discount_amount || 0) +
                  (order.combo_discount_amount || 0)
              )}
            </td>
          )}
        </tr>
      </React.Fragment>
    );
    return arr;
  };
  render() {
    const { order } = this.props;
    var state = this.state;

    const total_product =
      Array.isArray(order.line_items_at_time) == true
        ? order.line_items_at_time.length
        : 0;

    return (
      <div className="parent" style={{ margin: "30px" }}>
        <p className="order_code">Mã đơn hàng : {order.order_code}</p>

        <div className="row">
          <div className="col-6">
            <div class="">
              <strong>Từ:</strong>
              <p class="" id="sale_user_name">
                <span style={{ fontWeight: "500" }}>
                  {" "}
                  Tên: {order.shop_name}
                </span>
              </p>
              <p class="" id="info">
                <span>Địa chỉ: </span>
                {getDetailAdress(
                  order.customer?.address_detail,
                  order.customer?.wards_name,
                  order.customer?.district_name,
                  order.customer?.province_name
                )}
              </p>
              <p class="" id="info">
                <span>Số điện thoại:</span> {order.customer?.phone}
              </p>
            </div>
          </div>
          <div className="col-6" style={{ "border-left": "1px dashed" }}>
            <div class="">
              <strong>Đến:</strong>

              <p class="" id="sale_user_name">
                <span style={{ fontWeight: "500" }}>
                  Tên: {order.customer_name}
                </span>
              </p>
              <p class="" id="info">
                <span>Địa chỉ: </span>{" "}
                {getDetailAdress(
                  order?.customer_address_detail,
                  order?.customer_wards_name,
                  order?.customer_district_name,
                  order?.customer_province_name
                )}
              </p>
              <p class="" id="info">
                <span>Số điện thoại: </span> {order.customer_phone}
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div class="col-12-print" style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "25px",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Ngày đặt hàng
            </p>

            <div style={{ fontSize: "18px", textAlign: "center" }}>
              {getDDMMYYYHis(order.created_at)}
            </div>
          </div>
        </div>

        <div className="row">
          <div class="col-12-print">
            <p className="order_code">
              Nội dung đơn hàng : (Tổng số lượng sản phẩm: {total_product})
            </p>

            <table class="table table-hover">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>{this.showListProduct()}</tbody>
            </table>
          </div>
        </div>

        <div
          className="row"
          style={{ borderTop: "1px dashed", borderBottom: "1px dashed" }}
        >
          <div class="col-6-not-border" style={{ position: "relative" }}>
            <p
              style={{
                fontSize: "25px",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Tiền thu người nhận:
            </p>

            <div>
              <div style={{ fontSize: "25px", textAlign: "center" }}>
                <strong> {format(order.total_final)}</strong>
              </div>

              <div
                style={{
                  fontSize: "14px",
                  position: "absolute",
                  bottom: "5px",
                }}
              >
                <div>
                  <center>
                    {" "}
                    <i>
                      Quý khách vui lòng kiểm tra danh sách đơn hàng trước khi
                      nhận hàng.
                    </i>{" "}
                  </center>
                </div>
                <div>
                  <center>
                    {" "}
                    <i>
                      Cảm ơn quý khách đã tin tưởng sử dụng sản phẩm của{" "}
                      {order.store_name}!{" "}
                    </i>
                  </center>
                </div>{" "}
              </div>
            </div>
          </div>
          <div class="col-6-not-border">
            <div
              style={{
                height: "190px",
                margin: "10px",
                border: "1px dashed",
                padding: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Chữ kí người nhận:
              </p>

              <div style={{ fontSize: "18px", textAlign: "center" }}>
                Xác nhận hàng nguyên vẹn không bóp/méo , bể vỡ
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PrintOrderEcommerceContent;
