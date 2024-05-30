import React, { Component } from "react";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { format, getDetailAdress } from "../../../ultis/helpers";
import { getDDMMYYYHis } from "../../../ultis/date";

export default class ComponentTemplate0ToPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(this.props.stores, nextProps.stores) ||
      typeof this.state.user_name == "undefined"
    ) {
      var stores = nextProps.stores;
      (stores ?? []).forEach((element, index) => {
        if (element.store_code == this.props.store_code) {
          this.setState({
            user_name: stores[index].user.name,
            store_name: stores[index].name,
            user_phone: stores[index].user.phone_number,
          });
        }
      });
    }
    if (
      !shallowEqual(this.props.bill, nextProps.bill) ||
      typeof this.state.customer_name == "undefined"
    ) {
      var bill = nextProps.bill;
      if (typeof bill.order_code != "undefined" && bill.order_code != null) {
        var address = "";
        if (
          typeof bill.customer_address != "undefined" &&
          bill.customer_address != null
        ) {
          address = {
            customer_name: bill.customer_address.name,

            customer_address: getDetailAdress(
              bill.customer_address.address_detail,
              bill.customer_address?.wards_name,
              bill.customer_address?.district_name,
              bill.customer_address?.province_name
            ),

            customer_phone: bill.customer_address.phone,
          };
        } else {
          address = {
            customer_name: bill.customer_name,
            customer_address: getDetailAdress(
              bill.customer_address_detail,
              bill.customer_address?.wards_name,
              bill.customer_address?.district_name,
              bill.customer_address?.province_name
            ),

            customer_phone: bill.customer_address?.phone,
          };
        }
        this.setState({
          ...address,
          order_code: bill.order_code,
          order_date: bill.created_at,
          total_final: bill.total_final,
        });
      }
    }
  }

  showListProduct = () => {
    var arr = [];
    var bill = this.props.bill;
    if (
      typeof bill.line_items_at_time == "undefined" ||
      bill.line_items_at_time == null
    ) {
      return null;
    }
    bill.line_items_at_time.forEach((element, index) => {
      arr.push(
        <tr>
          <td>{index + 1}</td>
          <td style={{ textAlign: "start" }}>
            <div>
              <div>
                {element.name}{" "}
                {element.distributes_selected != null &&
                element.distributes_selected.length > 0
                  ? (" - " + element.distributes_selected[0].value ?? " ") +
                    " " +
                    (element.distributes_selected[0].sub_element_distributes ??
                      "")
                  : ""}{" "}
                {element.is_bonus == true ? "(Thưởng)" : ""}
              </div>
              {element.note ? (
                <div
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {element.note}
                </div>
              ) : null}
            </div>
          </td>
          <td>{format(element.price_before_override)}</td>
          <td>{element.quantity}</td>
          <td style={{ textAlign: "end" }}>
            {element.is_bonus == true
              ? format(0)
              : format(element.price_before_override * element.quantity)}
          </td>
        </tr>
      );
    });
    arr.push(
      <React.Fragment>
        {bill.total_shipping_fee > 0 && (
          <tr>
            <td></td>

            <td style={{ textAlign: "start" }}>Phí vận chuyển</td>
            <td></td>

            <td style={{ textAlign: "end" }} colSpan="3">
              + {format(bill.total_shipping_fee || 0)}
            </td>
          </tr>
        )}
        <tr>
          <td></td>

          <td style={{ textAlign: "start" }}>Giảm giá, Voucher, Combo</td>
          <td></td>

          <td></td>
          {(bill.product_discount_amount || 0) +
            (bill.voucher_discount_amount || 0) +
            (bill.combo_discount_amount || 0) >
          0 ? (
            <td style={{ textAlign: "end" }} colSpan="3">
              -{" "}
              {format(
                (bill.product_discount_amount || 0) +
                  (bill.voucher_discount_amount || 0) +
                  (bill.combo_discount_amount || 0)
              )}
            </td>
          ) : (
            <td></td>
          )}
        </tr>
      </React.Fragment>
    );
    return arr;
  };

  showBonusAgency = () => {
    var bill = this.props.bill;
    var { bonus_agency_history } = bill;
    var { reward_value, reward_name } = bonus_agency_history;

    var arr = [];
    arr.push(
      <tr>
        <td>{reward_name}</td>
        <td style={{ textAlign: "end" }}>{format(reward_value)}</td>
      </tr>
    );

    return arr;
  };

  render() {
    var state = this.state;
    var { bill, badges, store } = this.props;
    var total_product =
      Array.isArray(bill.line_items_at_time) == true
        ? bill.line_items_at_time.length
        : 0;
    var store_address =
      typeof badges.address_pickup == "undefined"
        ? null
        : badges.address_pickup == null
        ? null
        : badges.address_pickup.address_detail +
          ", " +
          badges.address_pickup.wards_name +
          ", " +
          badges.address_pickup.district_name +
          ", " +
          badges.address_pickup.province_name;
    return (
      <div className="parent" style={{ margin: "30px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p className="order_code" style={{ fontSize: 16 }}>
            Mã đơn hàng : {state.order_code ?? bill.order_code}
          </p>

          {bill?.order_ship_code?.from_shipper_code && (
            <div
              style={{
                padding: "0px 0 0",
                marginTop: -5,
                fontWeight: "normal",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  fontWeight: "normal",
                  padding: "0px 0 0",
                }}
              >
                Mã vận đơn: ({bill?.order_ship_code?.from_shipper_code})
              </p>
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-6">
            <div class="">
              <strong>Từ:</strong>
              <p class="" id="sale_user_name">
                <span style={{ fontWeight: "500" }}>
                  {" "}
                  Tên: {state.store_name ?? bill.store_name}
                </span>
              </p>
              <p class="" id="info">
                <span>Chi nhánh: </span>
                {this.props.currentBranch.name}
              </p>
              <p class="" id="info">
                <span>Địa chỉ: </span>
                {store.address}
              </p>
              <p class="" id="info">
                <span>Số điện thoại:</span>{" "}
                {/* {store.user?.phone_number ?? bill.user_phone} */}
                {this.props.currentBranch.phone || ""}
              </p>
            </div>
          </div>
          <div className="col-6" style={{ "border-left": "1px dashed" }}>
            <div class="">
              <strong>Đến:</strong>

              <p class="" id="sale_user_name">
                <span style={{ fontWeight: "500" }}>
                  Tên:{" "}
                  {state?.customer_name ??
                    bill.customer_name ??
                    bill?.customer?.name ??
                    ""}
                </span>
              </p>
              <p class="" id="info">
                <span>Địa chỉ: </span>{" "}
                {getDetailAdress(
                  bill.customer_address?.address_detail,
                  bill.customer_address?.wards_name,
                  bill.customer_address?.district_name,
                  bill.customer_address?.province_name
                )}
              </p>
              <p class="" id="info">
                <span>Số điện thoại: </span>{" "}
                {state?.customer_phone ??
                  bill.customer_phone ??
                  bill?.customer?.phone_number ??
                  ""}
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
              {getDDMMYYYHis(bill.created_at)}
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
                  <th>Đ.Giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>{this.showListProduct()}</tbody>
            </table>
          </div>
        </div>

        {bill.bonus_agency_history != null && (
          <div className="row">
            <div class="col-12-print">
              <p className="order_code">Thưởng cho đại lý</p>

              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Tên phần thưởng</th>
                    <th>Trị giá</th>
                  </tr>
                </thead>
                <tbody>{this.showBonusAgency()}</tbody>
              </table>
            </div>
          </div>
        )}
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
                <strong> {format(bill.total_final_before_override)}</strong>
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
                      {state.store_name}!{" "}
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
