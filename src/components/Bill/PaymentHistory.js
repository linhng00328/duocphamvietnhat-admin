import React, { Component } from "react";
import { filter_var, filter_arr, format } from "../../ultis/helpers";
import getNamePaymentMethod from "../../ultis/payment_method";
import { formatNoD } from "../../ultis/helpers";
import { Link } from "react-router-dom";
class PaymentHistory extends Component {
  constructor(props) {
    super(props);
  }

  showHistory = (bills) => {
    var result = null;
    var { store_code } = this.props;
    if (bills.length > 0) {
      result = bills.map((bill, index) => {
        var textPayment =
          bill.payment_method_id == 0
            ? "Tiền mặt"
            : bill.payment_method_id == 1
            ? "Quẹt thẻ"
            : "Chuyển khoản";

        return (
          <tr>
            <td>{formatNoD(bill.money)}</td>
            <td>{textPayment}</td>

            <td>{bill.updated_at}</td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { historyPay, bills } = this.props;
    console.log(bills);
    return (
      <div class="tab-pane " id="car" role="tabpanel" aria-labelledby="car-tab">
        <div class="table-responsive">
          <table class="table table-hover table-bordered  table-border">
            <thead>
              <tr>
                {/* <th>Mã đơn hàng</th> */}

                <th>Số tiền trả</th>
                <th>Hình thức thanh toán</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>{this.showHistory(historyPay)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PaymentHistory;
