import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default";
import * as helper from "../../../ultis/helpers";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { format } from "../../../ultis/helpers";
import ModalImg from "../ModalImg";
import moment from "moment";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalImg: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    helper.loadExpandTable();
  }

  showModalImg = (url) => {
    this.setState({ modalImg: url });
  };

  showData = (historyPayment) => {
    var result = [];
    if (typeof historyPayment == "undefined") {
      return null;
    }
    if (historyPayment.length > 0) {
      historyPayment.forEach((data, index) => {
        var avatar =
          data.collaborator?.customer?.avatar_image == null
            ? Env.IMG_NOT_FOUND
            : data.collaborator?.customer?.avatar_image;
        var img_front =
          data.collaborator.front_card == null
            ? Env.IMG_NOT_FOUND
            : data.collaborator.front_card;
        var img_back =
          data.collaborator.back_card == null
            ? Env.IMG_NOT_FOUND
            : data.collaborator.back_card;
        var status =
          data.status == 0
            ? "Chờ xử lý"
            : data.status == 1
            ? "Hoãn lại"
            : "Đã thanh toán";
        var _status =
          data.status == 0
            ? "warning"
            : data.status == 1
            ? "danger"
            : "success";
        var address_default = "";

        if (
          data.collaborator?.customer != null &&
          typeof data.collaborator?.customer != "undefined"
        ) {
          if (
            typeof data.collaborator.customer?.default_address === "object" &&
            data.collaborator.customer?.default_address !== null
          ) {
            if (
              data.collaborator.customer.default_address.address_detail !==
                null &&
              data.collaborator.customer.default_address.address_detail !== ""
            ) {
              address_default =
                address_default +
                data.collaborator.customer.default_address.address_detail +
                ", ";
            }
            if (
              data.collaborator.customer.default_address.wards_name !== null &&
              data.collaborator.customer.default_address.wards_name !== ""
            ) {
              address_default =
                address_default +
                data.collaborator.customer.default_address.wards_name +
                ", ";
            }
            if (
              data.collaborator.customer.default_address.district_name !==
                null &&
              data.collaborator.customer.default_address.district_name !== ""
            ) {
              address_default =
                address_default +
                data.collaborator.customer.default_address.district_name +
                ", ";
            }
            if (
              data.collaborator.customer.default_address.province_name !==
                null &&
              data.collaborator.customer.default_address.province_name !== ""
            ) {
              address_default =
                address_default +
                data.collaborator.customer.default_address.province_name;
            }
          }
        }

        result.push(
          <React.Fragment>
            <tr class="sub-container hover-product">
              <td>
                <button
                  type="button"
                  style={{ width: "25px" }}
                  className=" btn-success exploder"
                >
                  <span class="fa fa-plus"></span>
                </button>
              </td>{" "}
              <td>{data.collaborator.customer?.name}</td>
              {/* <th>Chủ tài khoản</th>
                            <th>Số tài khoản</th>
                            <th>Ngày yêu cầu</th>
                            <th>Ngày duyệt/hủy yêu cầu</th> */}
              <td> {data.collaborator.first_and_last_name}</td>
              <td>
                {" "}
                {data.collaborator.account_number} - {data.collaborator.bank}{" "}
              </td>
              <td>{moment(data.created_at).format("DD-MM-YYYY")}</td>
              <td className={_status}>
                {moment(data.updated_at).format("DD-MM-YYYY")}
              </td>
              <td>
                <h5>
                  <span class={`badge badge-${_status}`}>{status}</span>
                </h5>
                {}
              </td>
              <td>{format(Number(data.money))}</td>
            </tr>
            <tr class="explode hide" style={{ background: "rgb(200 234 222)" }}>
              <td colSpan={9}>
                <div class="row">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="info_user">
                      <p class="sale_user_label">
                        Số tài khoản:{" "}
                        <span id="user_tel">
                          {data.collaborator.account_number} -{" "}
                          {data.collaborator.bank}{" "}
                        </span>
                      </p>
                      <p class="sale_user_label">
                        Tên chủ tài khoản:{" "}
                        <span id="user_tel">
                          {data.collaborator.account_name}
                        </span>
                      </p>
                      {/* <p class="sale_user_label">
                                                Gmail:{" "}
                                                <span id="user_tel">              {data.collaborator.customer.email == null
                                                    ? "Trống"
                                                    : data.collaborator.customer.email}
                                                </span>
                                            </p> */}
                      <p class="sale_user_label">
                        Tiền thưởng:{" "}
                        <span id="user_tel">
                          {format(Number(data.collaborator.balance))}
                        </span>
                      </p>
                      {/* <p class="sale_user_label">
                                                Số điểm:{" "}
                                                <span id="user_tel">
                                                    {data.collaborator.customer.points == null ? null : new Intl.NumberFormat().format(data.collaborator.customer.points.toString())}
                                                </span>
                                            </p> */}
                      <p class="sale_user_label">
                        Tên CMND:{" "}
                        <span id="user_tel">
                          {data.collaborator.first_and_last_name}
                        </span>
                      </p>
                      <p class="sale_user_label" id="sale_user_name">
                        CMND:{" "}
                        <span id="user_name"> {data.collaborator.cmnd} </span>
                      </p>
                      <p class="sale_user_label" id="sale_user_name">
                        Nơi đăng kí:{" "}
                        <span id="user_name">
                          {" "}
                          {data.collaborator.issued_by}{" "}
                        </span>
                      </p>
                      <p class="sale_user_label" id="sale_user_name">
                        Ngày đăng ký CTV:{" "}
                        <span id="user_name">
                          {moment(data.collaborator.created_at).format(
                            "DD-MM-YYYY"
                          )}{" "}
                        </span>
                      </p>
                      <p class="sale_user_label" id="sale_user_name">
                        Địa chỉ: <span id="user_name"> {address_default} </span>
                      </p>
                    </div>
                  </div>
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <div class="info_user">
                      <div class="row">
                        <div
                          data-toggle="modal"
                          data-target="#modalImg"
                          style={{ textAlign: "center", cursor: "pointer" }}
                          onClick={() => this.showModalImg(img_front)}
                        >
                          {" "}
                          <img
                            width="120"
                            height="125px"
                            src={img_front}
                            class="img-responsive"
                            alt="Image"
                          />
                          <p class="sale_user_label" id="sale_user_name">
                            Mặt trước:
                          </p>
                        </div>

                        <div
                          data-toggle="modal"
                          data-target="#modalImg"
                          style={{ textAlign: "center", cursor: "pointer" }}
                          onClick={() => this.showModalImg(img_back)}
                        >
                          {" "}
                          <img
                            width="120px"
                            height="125px"
                            style={{ marginLeft: "10px" }}
                            src={img_back}
                            class="img-responsive"
                            alt="Image"
                          />
                          <p class="sale_user_label" id="sale_user_name">
                            Mặt sau:
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var historyPayment = this.props.historyPayment;
    return (
      <div className="request-payment">
        <ModalImg img={this.state.modalImg}></ModalImg>

        <div class="table-responsive">
          <table class="table table-border">
            <thead>
              <tr>
                <th>Hành động</th>

                <th>Họ tên</th>
                <th>Chủ tài khoản</th>
                <th>Số tài khoản</th>
                <th>Ngày yêu cầu</th>
                <th>Ngày duyệt/hủy yêu cầu</th>

                <th>Trạng thái</th>

                <th>Số tiền</th>
              </tr>
            </thead>

            <tbody>{this.showData(historyPayment)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
