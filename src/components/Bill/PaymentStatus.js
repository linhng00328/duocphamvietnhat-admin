import React, { Component } from "react";
import { filter_var } from "../../ultis/helpers";
import * as Types from "../../constants/ActionType";
import { connect } from "react-redux";
class PaymentStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [
        // {
        //     name: "Chờ xử lý",
        //     code: "WAITING_FOR_PROGRESSING",
        // },
        {
          code: "UNPAID",
          name: "Chưa thanh toán",
        },
        {
          name: "Đã thanh toán một phần",
          code: "PARTIALLY_PAID",
        },
        {
          name: "Đã thanh toán",
          code: "PAID",
        },
        // {
        //     name: "Khách hủy",
        //     code: "CUSTOMER_CANCELLED",
        // },
        {
          name: "Đã hoàn tiền",
          code: "REFUNDS",
        },
      ],
    };
  }
  changeStatus = (statusCode, name, statusCheck) => {
    if (statusCheck == true) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Không thể chuyển về trạng thái cũ",
        },
      });
      return;
    }

    var disable = this.props.order_allow_change_status;
    if (disable == false) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Không có quyền thay đổi trạng thái",
        },
      });
      return;
    }
    window.$("#postModalPayment").modal("show");

    this.props.handleUpdateStatusPayment({
      payment_status_code: statusCode,
      statusName: name,
    });
  };
  checkStatus = (status, currentStatus) => {
    var { bill } = this.props;
    var order_status_code = bill.order_status_code;
    if (order_status_code == "OUT_OF_STOCK") {
      return true;
    }
    if (currentStatus == "UNPAID") {
      return false;
    } else if (currentStatus == "PAID" || currentStatus == "REFUNDS") {
      return true;
    } else if (currentStatus == "PARTIALLY_PAID") {
      if (status == "UNPAID") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  showShipmetStatus = (status) => {
    var shipmentStatus = this.state.status;
    var result = null;
    if (shipmentStatus.length > 0) {
      var disable =
        this.props.order_allow_change_status == true ? "" : "#cac4c4";
      var disable_modal =
        this.props.order_allow_change_status == true ? "modal" : "";

      result = shipmentStatus.map((item, index) => {
        var statusCheck = this.checkStatus(item.code, status);
        var disable_back_status = statusCheck == true ? "disable-color" : "";
        var active = item.code == status ? "active_status" : "";
        if (active != "") {
          return (
            <li class={`${active} hover-product`}>
              <a>{item.name}</a>
            </li>
          );
        } else {
          return (
            <li
              style={{ background: disable }}
              //   data-toggle={disable_modal}
              //   data-target="#postModalPayment"
              class={`${active} ${
                statusCheck !== true ? "hover-product" : ""
              } ${disable_back_status}`}
              onClick={() => {
                this.changeStatus(item.code, item.name, statusCheck);
              }}
            >
              <a>{item.name}</a>
            </li>
          );
        }
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { bill, showBoard } = this.props;
    var status = filter_var(bill.payment_status_code);

    return (
      <nav class="left-nav hidden-xs hidden-sm hidden-md">
        <ul class="nolist" style={{ minHeight: "250px" }}>
          <li
            style={{ background: "#EAEFF3", border: "2px solid #e3e5e6" }}
            class=""
          >
            <a
              href="#"
              style={{
                fontWeight: 600,
              }}
            >
              Trạng thái thanh toán
            </a>
          </li>
          {this.showShipmetStatus(status)}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentStatus);
