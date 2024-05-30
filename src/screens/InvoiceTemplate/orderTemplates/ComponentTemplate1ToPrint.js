import React, { Component } from "react";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { filter_arr, format, getDetailAdress } from "../../../ultis/helpers";
import { getDDMMYYYHis } from "../../../ultis/date";
import BarcodeComponent from "../../../components/Partials/Barcode";

export default class ComponentTemplate1ToPrint extends Component {
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
      var valueDistribute = "";
      if (
        element.distributes_selected != null &&
        element.distributes_selected.length > 0
      ) {
        var dis = element.distributes_selected[0];
        if (dis.value != null) {
          valueDistribute = " - " + dis.value;

          if (dis.sub_element_distributes != null) {
            valueDistribute =
              valueDistribute + " " + dis.sub_element_distributes;
          }
        }
      }

      arr.push(
        <tr>
          <td>{index + 1}</td>
          <td style={{ textAlign: "start" }}>
            <div>
              <div>
                {element.name}
                {valueDistribute}
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
          <td>{element.quantity}</td>
          <td>{format(element.item_price)}</td>
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
    arr.push(
      <React.Fragment>
        <tr>
          <td></td>

          <td style={{ textAlign: "start" }}>Tổng</td>
          <td></td>

          <td style={{ textAlign: "end" }} colSpan="3">
            {format(bill.total_final || 0)}
          </td>
        </tr>
      </React.Fragment>
    );
    arr.push(
      <React.Fragment>
        <tr>
          <td></td>

          <td style={{ textAlign: "start" }}>Điểm/Xu</td>
          <td></td>

          <td style={{ textAlign: "end" }} colSpan="3">
            {bill.points_awarded_to_customer || 0}
          </td>
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
    var { bill, badges, store, currentBranch } = this.props;

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
      <div style={{ margin: "30px", fontSize: "26px" }}>
        <div className="row">
          <div className="col-4">
            <div
              style={{
                margin: 20,
              }}
            >
              <img
                style={{
                  width: "100%",
                }}
                src={store.logo_url}
                alt="Logo"
              />
            </div>
          </div>

          <div className="col-8">
            <div
              style={{
                lineHeight: "0px",
              }}
            >
              <p class="" id="sale_user_name">
                <span
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: 25,
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {" "}
                  {store.name ?? bill.store_name}
                </span>
              </p>
              <p
                class=""
                id="info"
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: 20,
                }}
              >
                <span>
                  <b>Địa chỉ:</b>{" "}
                </span>
                {store.address}
              </p>

              <p
                class=""
                id="info"
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: 20,
                }}
              >
                <span>
                  <b>SĐT/Zalo:</b> {store.user?.phone_number ?? bill.user_phone}{" "}
                  <b> - Mã số thuế:</b> {currentBranch.txt_code ?? ""}
                </span>
              </p>
              <p
                class=""
                id="info"
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: 20,
                }}
              >
                <span>
                  <b>Website:</b>
                </span>{" "}
                {badges.domain_customer ?? ""}
              </p>

              <p
                class=""
                id="info"
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: 20,
                }}
              >
                <span>
                  <b>STK:</b>
                </span>{" "}
                {currentBranch.account_number ?? ""} {currentBranch.bank ?? ""}{" "}
                {currentBranch.account_name ?? ""}
              </p>
            </div>

            <p
              style={{
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "left",

                margin: 0,
                padding: 0,
                marginTop: 8,
              }}
            >
              HÓA ĐƠN BÁN HÀNG
            </p>
            <p
              style={{
                fontSize: 20,
                textAlign: "left",
                margin: 0,
                padding: 0,
              }}
              className="order_code"
            >
              Mã: {bill.order_code ?? bill.order_code}
            </p>
            <div
              style={{
                fontSize: 20,
                textAlign: "left",
                margin: 0,
                padding: 0,
              }}
            >
              Ngày: {getDDMMYYYHis(bill.created_at)}
            </div>
            {bill?.order_ship_code?.from_shipper_code && (
              <div
                style={{
                  fontSize: 20,
                  textAlign: "left",
                  margin: 0,
                  padding: 0,
                }}
              >
                <p className="order_code">
                  Mã vận đơn ({bill?.order_ship_code?.from_shipper_code})
                  <BarcodeComponent
                    number={bill?.order_ship_code?.from_shipper_code}
                    displayValue={false}
                  />
                </p>
              </div>
            )}
          </div>
        </div>

        <div
          className="parent"
          style={{
            border: "none",
            fontSize: "20px",
          }}
        >
          <div className="row">
            <div
              class="col-12-print"
              style={{
                fontSize: "20px",
              }}
            >
              <div class="">
                <p class="" id="sale_user_name">
                  <span style={{ fontWeight: "500", fontSize: "20px" }}>
                    <b> Tên khách hàng: </b>
                    {state?.customer_name ??
                      bill.customer_name ??
                      bill?.customer?.name ??
                      ""}
                  </span>
                </p>
                <p class="" id="info" style={{ fontSize: "20px" }}>
                  <span>
                    <b>Địa chỉ: </b>
                  </span>{" "}
                  {getDetailAdress(
                    bill.customer_address?.address_detail,
                    bill.customer_address?.wards_name,
                    bill.customer_address?.district_name,
                    bill.customer_address?.province_name
                  )}
                </p>
                <p class="" id="info" style={{ fontSize: "20px" }}>
                  <span>
                    <b>Số điện thoại: </b>
                  </span>{" "}
                  {state?.customer_phone ??
                    bill.customer_phone ??
                    bill?.customer?.phone_number ??
                    ""}
                </p>
                <p class="" id="info" style={{ fontSize: "20px" }}>
                  <span>
                    <b>Điểm/Xu: </b>
                  </span>{" "}
                  {bill?.customer?.point ?? "0"}
                </p>
              </div>

              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đ.Giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>{this.showListProduct()}</tbody>
              </table>

              <p
                class=""
                id="info"
                style={{
                  marginTop: 10,
                }}
              >
                <span>Ghi chú: </span> {bill?.customer_note ?? ""}
              </p>
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
          <div className="row">
            <div class="col-6-not-border" style={{ position: "relative" }}>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Người mua hàng
              </p>

              <div>
                <div
                  style={{
                    fontSize: "20px",
                    position: "absolute",
                    bottom: "5px",
                  }}
                ></div>
              </div>
            </div>
            <div class="col-6-not-border" style={{ position: "relative" }}>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Người bán hàng
              </p>

              <div>
                <div
                  style={{
                    fontSize: "20px",
                    position: "absolute",
                    bottom: "5px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
