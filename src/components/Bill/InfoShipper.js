import { data } from "jquery";
import React, { Component } from "react";
import * as billAction from "../../actions/bill";
import * as shipmentAction from "../../actions/shipment";
import { connect, shallowEqual } from "react-redux";
import ChooseShipper from "./ChooseShipper";
import moment from "moment";
import styled from "styled-components";
import { formatNumber, formatNumberV2 } from "../../ultis/helpers";
import ModalCancelDelivery from "./ModalCancelDelivery";
import * as Types from "../../constants/ActionType";

const InfoShipperStyles = styled.div`
  .shipping__packet {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    .shipping__packet__main {
      position: relative;
      .shipping__packet__item {
        svg {
          width: 20px;
          height: 20px;
        }
        .input-group-text {
          width: 40px;
          height: 100%;
          justify-content: center;
        }
      }
      .shipping__packet_text {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        color: #99979c;
        font-size: 14px;
      }
    }
  }
  .content-delivery-cart-parent {
    font-size: 16px;
    padding: 5px 15px 5px 0;
    color: black;
    .content-delivery-cart {
      padding: 0.5rem 1.5625rem !important;
      margin: 0;
      display: flex;
      column-gap: 20px;
      align-items: center;
      input {
        border-radius: 5px;
      }
      span {
        font-weight: 500;
        flex-shrink: 0;
      }
    }
  }
  .content-delivery-cart-child {
    .content-delivery-cart {
      display: flex;
      justify-content: space-between;
      .content-delivery-cart-description {
        display: flex;
        align-items: center;
        flex-grow: 1;
        padding-left: 5px;
        label {
          flex-grow: 1;
          margin-bottom: 0;
        }
      }
    }
  }
  .custom-checkbox {
    width: 10px;
    height: 10px;
    border-radius: 100rem;
  }
`;
class InfoShipper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipperId: "",
      packet: {
        weight: "",
        height: "",
        length: "",
        width: "",
        cod: 0,
      },
      isUpdated: false,
      status: [
        "WAITING_FOR_PROGRESSING",
        "PACKING",
        "SHIPPING",
        "DELIVERY_ERROR",
        "CUSTOMER_RETURNING",
      ],
      shipmentInfo: {
        ship_speed_code_selected: null,
        data: null,
      },
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { bill, store_code } = this.props;
    console.log("bill", bill);
    if (!shallowEqual(bill, nextProps.bill)) {
      const newPacket = {
        weight: nextProps?.bill?.package_weight,
        height: nextProps?.bill?.package_height,
        length: nextProps?.bill?.package_length,
        width: nextProps?.bill?.package_width,
        cod: nextProps?.bill?.cod,
      };
      this.setState({
        shipperId: nextProps?.bill?.partner_shipper_id,
        packet: newPacket,
      });

      if (!this.state.isOnce) {
        const data = {
          money_collection: nextProps.bill?.cod,
          receiver_province_id: nextProps.bill?.customer_province,
          receiver_district_id: nextProps.bill?.customer_district,
          receiver_wards_id: nextProps.bill?.customer_wards,
          receiver_address: nextProps.bill?.customer_address_detail,
          branch_id: nextProps.bill?.branch_id,
          weight: nextProps.bill?.package_weight,
          length: nextProps.bill?.package_length,
          width: nextProps.bill?.package_width,
          height: nextProps.bill?.package_height,
        };

        this.props.calculateShipmentV2(
          store_code,
          nextProps?.bill?.partner_shipper_id,
          data,
          (data) => {
            this.setState({
              shipmentInfo: {
                shipment_selected:
                  data.fee_with_type_ship?.length > 0
                    ? data.fee_with_type_ship.find(
                        (item) =>
                          item.ship_speed_code ==
                          nextProps.bill?.ship_speed_code
                      )
                    : null,
                data,
              },
            });
          }
        );

        this.setState({
          isOnce: true,
        });
      }
    }
    return true;
  }

  setIsUpdated = (isUpdated) => {
    this.setState({ isUpdated });
  };
  onChange = (e) => {
    const { isUpdated } = this.state;
    const { packet } = this.state;
    const value = e.target.value;
    // const _value = formatNumber(value);
    const _value = value;

    const name = e.target.name;
    if (!isUpdated) return;

    this.setState({
      packet: {
        ...packet,
        [name]: name === "cod" ? value : _value,
      },
    });
  };
  handleShippingPacket = () => {
    var { order_code, store_code, updateShippingPackage } = this.props;
    var { packet } = this.state;
    const formData = {
      package_weight: packet.weight,
      package_length: packet.length,
      package_width: packet.width,
      package_height: packet.height,
      cod: packet.cod,
    };
    updateShippingPackage(store_code, order_code, formData, () => {
      this.setIsUpdated(false);
    });
  };

  changeStatus = (statusCode, name) => {
    this.props.handleUpdateStatusOrder({
      order_status_code: statusCode,
      statusName: name,
    });
  };

  sendOrderToDelivery = () => {
    var { bill, order_code, store_code } = this.props;
    const { shipperId } = this.state;
    if (shipperId === null || shipperId < 0) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Thất bại",
          disable: "show",
          content: "Chưa chọn đơn vị vận chuyển",
        },
      });
      return;
    }

    this.props.sendOrderToDelivery(
      null,
      store_code,
      bill.id,
      order_code,
      "SHIPPING",
      bill
    );
  };
  cancelConnectToDelivery = () => {
    var { bill, order_code, store_code } = this.props;

    this.props.cancelConnectToDelivery(
      store_code,
      bill.id,
      order_code,
      "WAITING_FOR_PROGRESSING"
    );
  };

  showShipment = () => {
    var result = null;
    var { shipment } = this.props;
    if (shipment?.length > 0) {
      result = shipment.map((data) => {
        return <option value={data.id}>{data.name}</option>;
      });
    }
    return result;
  };
  onChangeShipper = (e) => {
    var { value } = e.target;
    var { bill, order_code, store_code } = this.props;

    if (value == "") {
      this.setState({
        error: "Chưa chọn phương thức vận chuyển",
      });
    }

    const data = {
      money_collection: bill.cod,
      receiver_province_id: bill.customer_province,
      receiver_district_id: bill.customer_district,
      receiver_wards_id: bill.customer_wards,
      receiver_address: bill.customer_address_detail,
      branch_id: bill.branch_id,
      weight: bill.package_weight,
      length: bill.package_length,
      width: bill.package_width,
      height: bill.package_height,
    };

    this.props.calculateShipmentV2(store_code, value, data, (data) => {
      this.setState({
        shipmentInfo: {
          shipment_selected: null,
          data,
        },
      });
    });
  };
  handleShowCancelButton = () => {
    const { bill } = this.props;
    console.log("InfoShipper ~ bill:", bill?.order_status_code);
    const { status } = this.state;
    if (status.includes(bill?.order_status_code)) {
      return true;
    }
    return false;
  };
  handleShipmentFeeSelect = (data) => {
    this.setState({
      shipmentInfo: {
        ...this.state.shipmentInfo,
        shipment_selected: data,
      },
    });
  };
  changeShipmentFee = () => {
    var { order_code, store_code } = this.props;
    const { shipmentInfo } = this.state;
    if (shipmentInfo.shipment_selected === null) return;
    this.props.updateOrder(
      {
        partner_shipper_id: shipmentInfo?.data?.partner_id,
        ship_speed_code: shipmentInfo?.shipment_selected?.ship_speed_code,
        total_shipping_fee: shipmentInfo?.shipment_selected?.fee,
      },
      store_code,
      order_code
    );
  };

  render() {
    var { bill, historyDeliveryStatus } = this.props;
    const { packet, isUpdated, shipmentInfo } = this.state;
    var shipper_name = bill.shipper_name;
    var agree =
      bill.order_status_code == "WAITING_FOR_PROGRESSING" ? "show" : "hide";
    var disable =
      this.props.order_allow_change_status == true ? "show" : "hide";

    // if(bill.partner_shipper_id === null) {
    //     return <ChooseShipper bill={bill} store_code={this.props.store_code} order_code = {bill.order_code}/>
    // }
    return (
      <InfoShipperStyles>
        {bill.sent_delivery == false ? (
          <div className="box box-warning cart_wrapper mb0">
            <div class="card-header py-3">
              <h6 class="m-0 title_content font-weight-bold text-primary">
                Giao vận
              </h6>
            </div>

            <div className="box-body table-responsive pt0">
              <div>
                <p className="sale_user_label bold">
                  Đơn vị vận chuyển:
                  <select
                    name="shipperId"
                    id="input"
                    class="form-control"
                    required=""
                    onChange={this.onChangeShipper}
                    value={this.state.shipperId}
                  >
                    <option value="">---Chọn đơn vị vận chuyển---</option>

                    {this.showShipment()}
                  </select>
                </p>
                {!isUpdated && shipmentInfo.data ? (
                  <>
                    <div className="delivery-cart">
                      <div className="content-delivery-cart-parent">
                        {shipmentInfo.data?.name}
                      </div>
                      <div className="content-delivery-cart-child">
                        {shipmentInfo.data?.fee_with_type_ship?.length > 0 &&
                          shipmentInfo.data?.fee_with_type_ship?.map(
                            (service) => (
                              <div className="content-delivery-cart">
                                <div className="content-delivery-cart-description">
                                  <input
                                    type="checkbox"
                                    name="delivery"
                                    id={service.ship_speed_code}
                                    checked={
                                      shipmentInfo.shipment_selected
                                        ?.ship_speed_code ===
                                      service.ship_speed_code
                                    }
                                    onChange={() =>
                                      this.handleShipmentFeeSelect(
                                        service,
                                        shipmentInfo.data?.partner_id
                                      )
                                    }
                                    style={{ display: "none" }}
                                  />
                                  <span
                                    className="custom-checkbox"
                                    onClick={() =>
                                      this.handleShipmentFeeSelect(
                                        service,
                                        shipmentInfo.data?.partner_id
                                      )
                                    }
                                    style={{
                                      cursor: "pointer",
                                      marginRight: "8px",
                                      flexShrink: 0,
                                      backgroundColor:
                                        shipmentInfo.shipment_selected
                                          ?.ship_speed_code ===
                                        service.ship_speed_code
                                          ? "#c62025"
                                          : "white",
                                      boxShadow: `${
                                        shipmentInfo.shipment_selected
                                          ?.ship_speed_code ===
                                        service.ship_speed_code
                                          ? `0 0 0 2px white, 0 0 0 3px #c62025`
                                          : "0 0 0 2px white, 0 0 0 3px #dadada"
                                      }`,
                                    }}
                                  ></span>
                                  <label
                                    htmlFor={service.ship_speed_code}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {service.description}
                                  </label>
                                </div>
                                <span>
                                  {service.fee
                                    ? `${formatNumberV2(service.fee)}đ`
                                    : "0đ"}
                                </span>
                              </div>
                            )
                          )}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={this.changeShipmentFee}
                        className="btn btn-primary  btn-sm"
                        style={{
                          marginRight: "10px",
                          opacity:
                            shipmentInfo.shipment_selected === null ? 0.7 : 1,
                        }}
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                  </>
                ) : null}
                <p
                  className="sale_user_label bold"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "15px",
                    marginBottom: "10px",
                  }}
                >
                  Thông tin kiện hàng:
                  {isUpdated ? (
                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={this.handleShippingPacket}
                    >
                      <i
                        className="fa fa-save"
                        style={{
                          marginTop: "0",
                        }}
                      ></i>
                      Lưu
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => this.setIsUpdated(true)}
                    >
                      <i
                        className="fa fa-edit"
                        style={{
                          marginTop: "0",
                        }}
                      ></i>
                      Sửa
                    </button>
                  )}
                </p>
                <div className="shipping__packet">
                  <div className="shipping__packet__main">
                    <div className="input-group shipping__packet__item">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                            />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Nhập cân nặng"
                        className="form-control"
                        name="weight"
                        value={packet.weight}
                        onChange={this.onChange}
                        disabled={!isUpdated}
                      />
                    </div>
                    <div className="shipping__packet_text">
                      khối lượng(gram)
                    </div>
                  </div>
                  <div className="shipping__packet__main">
                    <div className="input-group shipping__packet__item">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fas fa-arrows-alt-v"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Nhập chiều cao"
                        className="form-control"
                        name="height"
                        value={packet.height}
                        onChange={this.onChange}
                        disabled={!isUpdated}
                      />
                    </div>
                    <div className="shipping__packet_text">cao(cm)</div>
                  </div>

                  <div className="shipping__packet__main">
                    <div className="input-group shipping__packet__item">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fas fa-arrows-alt-h"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Nhập chiều dài"
                        className="form-control"
                        name="length"
                        value={packet.length}
                        onChange={this.onChange}
                        disabled={!isUpdated}
                      />
                    </div>
                    <div className="shipping__packet_text">dài(cm)</div>
                  </div>

                  <div className="shipping__packet__main">
                    <div className="input-group shipping__packet__item">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                            />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Nhập chiều rộng"
                        className="form-control"
                        name="width"
                        value={packet.width}
                        onChange={this.onChange}
                        disabled={!isUpdated}
                      />
                    </div>
                    <div className="shipping__packet_text">rộng(cm)</div>
                  </div>
                  <div className="shipping__packet__main">
                    <div className="input-group shipping__packet__item">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <svg
                            width="424"
                            height="454"
                            viewBox="0 0 424 454"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M322.097 350.228C321.915 350.374 321.781 350.465 321.593 350.598L204.749 426.75C203.318 427.678 201.953 427.89 200.315 427.429L128.112 407.237C124.612 406.248 121.252 406.248 117.831 407.225L63.891 422.655V349.197L130.235 330.321L199.09 348.772C206.939 350.877 211.621 358.974 209.517 366.829C207.406 374.684 199.309 379.36 191.46 377.261L120.774 358.319C117.122 357.342 113.368 359.508 112.379 363.165C111.396 366.823 113.562 370.583 117.231 371.56L187.905 390.496C190.362 391.157 192.83 391.472 195.268 391.472C206.708 391.472 217.279 384.491 221.647 373.646L317.984 330.333C319.161 329.805 320.156 329.708 321.411 329.987C331.52 332.246 330.838 342.966 322.097 350.228ZM50.184 439.487H14.688V338.103H50.183L50.184 439.487ZM94.3699 245.903V326.276L128.306 316.62C129.495 316.28 130.757 316.268 131.951 316.59L202.638 335.532C213.574 338.462 221.325 347.426 223.26 357.889L284.939 330.158V245.903H226.935V298.781C226.935 306.018 218.144 309.672 213.015 304.543L190.652 282.18L168.277 304.543C163.153 309.675 154.363 306.027 154.363 298.781V245.903H94.3699ZM168.071 245.903H213.228V285.377L197.804 269.941C193.855 265.999 187.444 266.005 183.496 269.941L168.072 285.377V245.903H168.071ZM324.401 316.607C320.276 315.685 316.225 316.098 312.361 317.832L298.653 323.994V239.048C298.653 235.263 295.578 232.194 291.799 232.194H87.516C83.731 232.194 80.662 235.263 80.662 239.048V330.175L63.867 334.955C63.618 329.09 58.784 324.395 52.864 324.395H12.002C5.92396 324.395 0.980957 329.339 0.980957 335.422V442.173C0.980957 448.251 5.92396 453.194 12.002 453.194H52.865C58.949 453.194 63.892 448.251 63.892 442.173V436.914L121.611 420.404C122.57 420.125 123.364 420.137 124.425 420.434L196.616 440.632C202.022 442.139 207.427 441.37 212.235 438.236L329.079 362.073C329.722 361.655 330.268 361.254 330.85 360.775C349.085 345.707 345.133 321.261 324.401 316.607ZM409.311 115.897H373.81V14.513H409.311V115.897ZM354.492 103.383C353.891 103.383 353.297 103.462 352.721 103.614C331.884 109.138 312.639 110.245 291.388 105.913C289.247 105.476 287.021 106.089 285.402 107.563L241.513 147.51C234.991 153.451 224.735 152.97 218.798 146.449C212.83 139.886 213.315 129.696 219.866 123.728L263.379 84.121C265.472 82.239 267.368 80.721 269.226 77.437C271.137 74.053 271.968 70.632 271.701 67.278C271.422 63.711 268.438 60.97 264.865 60.97H191.74L225.992 33.476C230.875 29.552 236.509 27.617 244.825 27.004C287.422 23.874 326.714 24.772 360.105 26.258V103.386H354.492V103.383ZM245.866 161.254H270.085L283.89 150.864V127.476L250.743 157.651C249.227 159.034 247.589 160.229 245.866 161.254ZM208.661 155.673C197.598 143.524 198.489 124.648 210.632 113.591L222.466 102.825H115.933L106.125 112.626V151.445L115.933 161.253H215.503C212.992 159.762 210.681 157.893 208.661 155.673ZM323.449 189.403C324.699 189.403 325.76 188.342 325.76 187.08V121.974C316.353 122.562 307.042 122.217 297.604 120.889V154.291C297.604 156.444 296.585 158.47 294.869 159.768L276.491 173.585C275.302 174.483 273.859 174.962 272.366 174.962H113.088C111.268 174.962 109.534 174.24 108.242 172.954L94.425 159.131C93.139 157.851 92.417 156.104 92.417 154.291V109.789C92.417 107.969 93.139 106.229 94.425 104.943L108.242 91.12C109.534 89.834 111.269 89.112 113.088 89.112H237.532L253.393 74.676H66.572C65.316 74.676 64.249 75.737 64.249 76.993V187.08C64.249 188.342 65.316 189.403 66.572 189.403H323.449ZM411.998 0.804993H371.123C365.051 0.804993 360.102 5.74799 360.102 11.826V12.536C326.433 11.05 286.856 10.17 243.828 13.331C232.674 14.15 224.528 17.067 217.407 22.781L169.854 60.969H66.572C57.734 60.969 50.541 68.157 50.541 76.994V187.08C50.541 195.918 57.734 203.111 66.572 203.111H323.449C332.286 203.111 339.468 195.918 339.468 187.08V120.464C344.66 119.639 349.913 118.529 355.377 117.091H360.102V118.577C360.102 124.661 365.051 129.604 371.123 129.604H411.998C418.075 129.604 423.019 124.66 423.019 118.577V11.826C423.019 5.74799 418.076 0.804993 411.998 0.804993Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Nhập tiền thu hộ"
                        className="form-control"
                        name="cod"
                        value={packet.cod}
                        onChange={this.onChange}
                        disabled={!isUpdated}
                      />
                    </div>
                    <div className="shipping__packet_text">thu hộ</div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div class="m-3">
                  <button
                    type="button"
                    onClick={() => this.sendOrderToDelivery()}
                    className="btn btn-primary  btn-sm"
                    style={{
                      marginRight: "10px",
                      opacity:
                        this.state.shipperId === null ||
                        this.state.shipperId < 0
                          ? 0.7
                          : 1,
                    }}
                  >
                    <i className="fas fa-shipping-fast"></i>
                    &nbsp;Đăng đơn hàng
                  </button>
                </div>
              </div>

              <p
                class="text-justify text-center"
                style={{
                  fontSize: 13,
                }}
              >
                {" "}
                Chuyển đơn hàng sang đơn vị vận chuyển
              </p>
            </div>
          </div>
        ) : (
          <div className="box box-warning cart_wrapper mb0">
            <div class="card-header py-3">
              <h6 class="m-0 title_content font-weight-bold text-primary">
                Trạng thái giao vận
              </h6>
            </div>

            <div className="box-body table-responsive pt0">
              <div className="mt-3">
                <p className="sale_user_label bold" style={{ color: "grey" }}>
                  Đơn vị vận chuyển:
                </p>
                <div id="total_before">{shipper_name}</div>
              </div>

              {bill?.order_ship_code?.from_shipper_code != null && (
                <div className="mt-3">
                  <p className="sale_user_label bold" style={{ color: "grey" }}>
                    Mã vận đơn:
                  </p>
                  <div id="total_before">
                    {bill?.order_ship_code?.from_shipper_code}
                  </div>
                </div>
              )}

              {historyDeliveryStatus.map((history) => (
                <div class="mt-3" id="item_fee">
                  <div className="sale_user_label bold">
                    {history.status_text}:
                  </div>
                  <div>
                    <span>
                      {" "}
                      {moment(history.time).format("DD-MM-YYYY HH:mm")}
                    </span>
                  </div>
                </div>
              ))}

              {this.handleShowCancelButton() ? (
                <div style={{ textAlign: "center" }}>
                  <div class="m-3">
                    <button
                      type="button"
                      className="btn btn-danger  btn-sm"
                      style={{ marginRight: "10px" }}
                      data-toggle="modal"
                      data-target="#cancelDelivery"
                    >
                      <i className="fas fa-shipping-fast"></i>
                      &nbsp;Hủy kết nối vận chuyển
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
        <ModalCancelDelivery
          cancelConnectToDelivery={this.cancelConnectToDelivery}
        ></ModalCancelDelivery>
      </InfoShipperStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    historyDeliveryStatus: state.billReducers.bill.historyDeliveryStatus,
    shipment: state.shipmentReducers.shipment.allShipment,
    loadShipper: state.loadingReducers.disable_shipper,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    sendOrderToDelivery: (
      data,
      store_code,
      billId,
      order_code,
      order_status_code,
      bill
    ) => {
      dispatch(
        billAction.sendOrderToDelivery(
          data,
          store_code,
          billId,
          order_code,
          order_status_code,
          bill
        )
      );
    },
    cancelConnectToDelivery: (
      store_code,
      billId,
      order_code,
      order_status_code
    ) => {
      dispatch(
        billAction.cancelConnectToDelivery(
          store_code,
          billId,
          order_code,
          order_status_code
        )
      );
    },
    updateOrder: (data, store_code, order_code, onSuccess) => {
      dispatch(billAction.updateOrder(data, store_code, order_code, onSuccess));
    },
    calculateShipmentV2: (store_code, partner_id, data, onSuccess) => {
      dispatch(
        shipmentAction.calculateShipmentV2(
          store_code,
          partner_id,
          data,
          onSuccess
        )
      );
    },
    updateShippingPackage: (store_code, order_code, data, funcModal) => {
      dispatch(
        billAction.updateShippingPackage(
          store_code,
          order_code,
          data,
          funcModal
        )
      );
    },
    showError: (action) => {
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoShipper);
