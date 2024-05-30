import React, { Component } from "react";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import {
  filter_arr,
  format,
  getDetailAdress,
  formatNoD,
} from "../../../ultis/helpers";
import { getDDMMYYYHis } from "../../../ultis/date";
import BarcodeComponent from "../../../components/Partials/Barcode";

export default class ComponentTemplate2ToPrint extends Component {
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

  getSubAddress = (ad) => {
    if (typeof ad == "undefined" || ad == "" || ad == null) {
      return "";
    }

    return ad + ", ";
  };

  totalPromotion = () => {
    var bill = this.props.bill;
    return (
      (bill.product_discount_amount || 0) +
      (bill.voucher_discount_amount || 0) +
      (bill.combo_discount_amount || 0)
    );
  };

  getAddress = () => {
    String.prototype.rtrim = function (s) {
      return this.replace(new RegExp(s + "*$"), "");
    };

    var currentBranch = this.props.currentBranch;
    var store_address =
      this.getSubAddress(currentBranch.address_detail) +
      this.getSubAddress(currentBranch.wards_name) +
      this.getSubAddress(currentBranch.district_name) +
      this.getSubAddress(currentBranch.province_name);
    store_address = store_address.rtrim(", ");
    return store_address;
  };

  getDistribute = (line_item) => {
    var dis = "";

    var distributes_selected = {};
    if (
      line_item.distributes_selected != null &&
      line_item.distributes_selected.length > 0
    ) {
      distributes_selected = line_item.distributes_selected[0];
    }

    if (
      distributes_selected?.value != null &&
      distributes_selected?.value != ""
    ) {
      dis += distributes_selected?.value;
    }

    if (
      distributes_selected?.sub_element_distributes != null &&
      distributes_selected?.sub_element_distributes != ""
    ) {
      dis += ", " + distributes_selected?.sub_element_distributes;
    }

    if (dis.length > 0) {
      dis = "(" + dis + ")";
    }

    return dis;
  };

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
        <li style={{ listStyle: "none" }}>
          <span
            className="prName"
            style={{
              width: "100%",
              display: "inline-block",
              fontStyle: "italic",
            }}
          >
            {index + 1}. {element.name} {this.getDistribute(element)}{" "}
            {element.note ? ` (${element.note})` : ""}
          </span>

          <span
            className="price"
            style={{
              width: "25%",
              display: "inline-block",
              paddingRight: "3px",
              textAlign: "right",
              verticalAlign: "top",
            }}
          >
            {formatNoD(element.item_price)}
          </span>
          <span
            className="qtt"
            style={{
              width: "30%",
              display: "inline-block",
              paddingRight: "3px",
              textAlign: "right",
              fontStyle: "italic",
              fontWeight: "bold",
              verticalAlign: "top",
            }}
          >
            {formatNoD(element.quantity)}
          </span>
          <span
            className="money"
            style={{
              width: "35%",
              display: "inline-block",
              paddingRight: "3px",
              textAlign: "right",
              verticalAlign: "top",
            }}
          >
            {formatNoD(element.quantity * element.item_price)}
          </span>
          <span
            style={{
              width: "100%",
              display: "inline-block",
              borderBottom: "dashed 1px",
            }}
          />
        </li>
      );
    });

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
    var { bill, badges, currentBranch } = this.props;
    var total_product =
      Array.isArray(bill.line_items_at_time) == true
        ? bill.line_items_at_time.length
        : 0;
    var store_address = "";

    const pageStyle = `
   
    @page {
      size: 2.5in ${this.props.heightPage}in;
    }
  `;

    return (
      <div
        style={{
          marginRight: "70%",
        }}
      >
        <style>{pageStyle}</style>
        <div
          style={{
            margin: "0 auto",
            fontSize: "12px",
            lineHeight: "normal",
            width: "100%",
          }}
        >
          <div style={{ padding: "5px 2px", width: "100%" }}>
            {badges.store_name?.length > 0 && (
              <div style={{ padding: "0px 0", textAlign: "center" }}>
                <h6 style={{ textTransform: "uppercase" }}>
                  {" "}
                  {(badges.store_name ?? "").toUpperCase()}{" "}
                </h6>
              </div>
            )}
            <div
              style={{
                lineHeight: "1",
                overflowWrap: "break-word",
              }}
            >
              {this.getAddress().length > 0 && (
                <div
                  style={{
                    padding: "0px 0 0",
                    fontSize: "10px",
                    textAlign: "center",
                  }}
                >
                  <h6 style={{ fontSize: "10px", fontWeight: "normal" }}>
                    {" "}
                    {this.getAddress()}{" "}
                    {currentBranch != null &&
                      currentBranch.phone.length > 0 &&
                      "-" + currentBranch.phone}
                  </h6>
                </div>
              )}

              <div
                style={{
                  padding: "0px 0 0",
                  marginTop: -5,
                  fontWeight: "normal",
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                <h6
                  style={{
                    fontWeight: "normal",
                    padding: "0px 0 0",
                  }}
                >
                  Hóa đơn bán hàng ({bill.order_code})
                </h6>
              </div>

              {bill?.order_ship_code?.from_shipper_code && (
                <div
                  style={{
                    padding: "0px 0 0",
                    marginTop: -5,
                    fontWeight: "normal",
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "normal",
                      padding: "0px 0 0",
                    }}
                  >
                    Mã vận đơn: ({bill?.order_ship_code?.from_shipper_code})
                    <BarcodeComponent
                      number={bill?.order_ship_code?.from_shipper_code}
                      displayValue={false}
                      style={{
                        height: 30,
                      }}
                    />
                  </p>
                </div>
              )}
            </div>
            <br />
            <ul
              className="prlist"
              style={{
                padding: 0,
                margin: 0,
                width: "100%",
              }}
            >
              <li style={{ listStyle: "none" }} className="prHeader">
                <span
                  className="prtitle"
                  style={{
                    width: "100%",
                    display: "inline-block",
                    fontStyle: "italic",
                  }}
                >
                  <b>Sản phẩm</b>
                </span>
                <span
                  className="price"
                  style={{
                    width: "25%",
                    display: "inline-block",
                    paddingRight: "3px",
                    textAlign: "right",
                    verticalAlign: "top",
                  }}
                >
                  <b>Giá</b>
                </span>
                <span
                  className="qtt"
                  style={{
                    width: "30%",
                    display: "inline-block",
                    paddingRight: "3px",
                    textAlign: "right",
                    fontStyle: "italic",
                    fontWeight: "bold",
                    verticalAlign: "top",
                  }}
                >
                  <b>SL</b>
                </span>
                <span
                  className="money"
                  style={{
                    width: "35%",
                    display: "inline-block",
                    paddingRight: "3px",
                    textAlign: "right",
                    verticalAlign: "top",
                  }}
                >
                  <b>Tiền</b>
                </span>
                <span
                  style={{
                    width: "100%",
                    display: "inline-block",
                    borderBottom: "dashed 1px",
                  }}
                />
              </li>
              {this.showListProduct()}

              {this.totalPromotion() > 0 && (
                <li style={{ fontWeight: "bold", listStyle: "none" }}>
                  <span
                    className="price"
                    style={{
                      width: "25%",
                      display: "inline-block",
                      paddingRight: "3px",
                      textAlign: "right",
                      verticalAlign: "top",
                    }}
                  />
                  <span
                    className="qtt"
                    style={{
                      width: "30%",
                      display: "inline-block",
                      paddingRight: "3px",
                      textAlign: "right",
                      fontStyle: "italic",
                      fontWeight: "bold",
                      verticalAlign: "top",
                    }}
                  >
                    {/* {formatNoD(this.totalQuantity())} */}
                    Giảm giá, Voucher, Combo
                  </span>
                  <span
                    className="money"
                    style={{
                      width: "35%",
                      display: "inline-block",
                      paddingRight: "3px",
                      textAlign: "right",
                      verticalAlign: "top",
                    }}
                  >
                    -{formatNoD(this.totalPromotion())}
                  </span>
                </li>
              )}
              {bill.total_shipping_fee > 0 && (
                <li style={{ fontWeight: "bold", listStyle: "none" }}>
                  <span
                    className="price"
                    style={{
                      width: "5%",
                      display: "inline-block",
                      paddingRight: "3px",
                      textAlign: "right",
                      verticalAlign: "top",
                    }}
                  />
                  <span
                    className="qtt"
                    style={{
                      width: "50%",
                      display: "inline-block",
                      paddingRight: "3px",
                      textAlign: "right",
                      fontStyle: "italic",
                      fontWeight: "bold",
                      verticalAlign: "top",
                    }}
                  >
                    {/* {formatNoD(this.totalQuantity())} */}
                    Phí vận chuyển
                  </span>
                  <span
                    className="money"
                    style={{
                      width: "35%",
                      display: "inline-block",
                      paddingRight: "3px",
                      textAlign: "right",
                      verticalAlign: "top",
                    }}
                  >
                    +{formatNoD(bill.total_shipping_fee)}
                  </span>
                </li>
              )}
              {bill.discount > 0 && (
                <li style={{ fontWeight: "bold", listStyle: "none" }}>
                  <span
                    className="price"
                    style={{
                      width: "5%",
                      display: "inline-block",
                      paddingRight: "3px",
                      textAlign: "right",
                      verticalAlign: "top",
                    }}
                  />
                  <span
                    className="qtt"
                    style={{
                      width: "50%",
                      display: "inline-block",
                      paddingRight: "3px",
                      textAlign: "right",
                      fontStyle: "italic",
                      fontWeight: "bold",
                      verticalAlign: "top",
                    }}
                  >
                    {/* {formatNoD(this.totalQuantity())} */}
                    Chiết khấu
                  </span>
                  <span
                    className="money"
                    style={{
                      width: "35%",
                      display: "inline-block",
                      paddingRight: "3px",
                      textAlign: "right",
                      verticalAlign: "top",
                    }}
                  >
                    -{formatNoD(bill.discount)}
                  </span>
                </li>
              )}
              <li
                style={{ fontWeight: "bold", listStyle: "none", paddingTop: 5 }}
              >
                <span
                  className="price"
                  style={{
                    width: "5%",
                    display: "inline-block",
                    paddingRight: "3px",
                    textAlign: "right",
                    verticalAlign: "top",
                  }}
                />
                <span
                  className="qtt"
                  style={{
                    width: "50%",
                    display: "inline-block",
                    paddingRight: "3px",
                    textAlign: "right",
                    fontStyle: "italic",
                    fontWeight: "bold",
                    verticalAlign: "top",
                  }}
                >
                  {/* {formatNoD(this.totalQuantity())} */}
                  Tổng cộng:
                </span>
                <span
                  className="money"
                  style={{
                    width: "35%",
                    display: "inline-block",
                    paddingRight: "3px",
                    textAlign: "right",
                    verticalAlign: "top",
                  }}
                >
                  {formatNoD(bill.total_final)}
                </span>
                <span
                  style={{
                    width: "100%",
                    display: "inline-block",
                    borderBottom: "dashed 1px",
                  }}
                />
              </li>
            </ul>
            <br />
            <div>
              <p>
                <b>Ngày:</b> {bill.created_at}
              </p>
              {/* <p><b>Thu ngân:</b></p> */}
              <p>
                <b>Ghi chú:</b> {bill.customer_note}
              </p>
              <p>
                <b>Khách hàng:</b> {bill.customer_name} {bill.customer_phone}
              </p>
            </div>
            <div
              style={{
                padding: "8px 0 5px",
                textAlign: "center",
                borderTop: "1px solid #444",
                fontSize: "10px",
              }}
            >
              <h6 style={{ textTransform: "uppercase" }}>
                Cám ơn quý khách đã mua hàng!
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
