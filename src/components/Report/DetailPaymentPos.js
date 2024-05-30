import React, { Component } from "react";
import { format } from "../../ultis/helpers"

class BadgeTable extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        var { store_code, overview } = this.props

        var order = typeof overview.data_prime_time != "undefined"   ? overview.data_prime_time.details_by_payment_status : overview.data_prime_time
        var customer_cancelled = typeof order != "undefined" && order != null ? format(Number(order.CUSTOMER_CANCELLED.total_final)) : 0
        var paid = typeof order != "undefined" && order != null ? format(Number(order.PAID.total_final)) : 0
        var partiallly_paid = typeof order != "undefined" && order != null ? format(Number(order.PARTIALLY_PAID.total_final)) : 0
        var refunds = typeof order != "undefined" && order != null ? format(Number(order.REFUNDS.total_final)) : 0
        var unpaid = typeof order != "undefined" && order != null ? format(Number(order.UNPAID?.total_final)) : 0
        var waitting_for_progressing = typeof order != "undefined" && order != null ? format(Number(order.WAITING_FOR_PROGRESSING.total_final)) : 0


        var count_customer_cancelled = typeof order != "undefined" && order != null ? order.CUSTOMER_CANCELLED.total_order_count : 0

        var count_paid = typeof order != "undefined" && order != null ? order.PAID.total_order_count : 0
        var count_partially_paid = typeof order != "undefined" && order != null ? order.PARTIALLY_PAID.total_order_count : 0
        var count_refunds = typeof order != "undefined" && order != null ? order.REFUNDS.total_order_count : 0
        var count_unpaid = typeof order != "undefined" && order != null ? order.UNPAID?.total_order_count : 0
        var count_waitting_for_progressing = typeof order != "undefined" && order != null ? order.WAITING_FOR_PROGRESSING.total_order_count : 0



        var statusCustomerCancel = count_customer_cancelled == 0 || count_customer_cancelled == null ? "hide-badge" : "active-badge"
        var statusPaid = count_paid == 0 || count_paid == null ? "hide-badge" : "active-badge"
        var statusPartially = count_partially_paid == 0 || count_partially_paid == null ? "hide-badge" : "active-badge"
        var statusRefunds = count_refunds == 0 || count_refunds == null ? "hide-badge" : "active-badge"
        var statusUnpaid = count_unpaid == 0 || count_unpaid == null ? "hide-badge" : "active-badge"
        var statusWaitingForProgress = count_waitting_for_progressing == 0 || count_waitting_for_progressing == null ? "hide-badge" : "active-badge"




        return (
            <div class="form-group" style={{ fontSize: "15px"  }}>
                <div class="info-badge  badge-report" >
               

                    <p class="" id="booking_time"  style={{ fontSize: "15px" , display : "flex" , justifyContent : "space-between" }}>
                        <a > Chưa thanh toán: </a><span id="booking_time_txt" >
                            <span
    style = {{paddingRight  : "15px"}}

                                className=""
                            >
                                {unpaid}
                            </span>
                            <span
                                className={`step  ${statusUnpaid}`}
                            >
                                {count_unpaid}
                            </span>

                        </span>
                    </p>
                    <p class=""  style={{ fontSize: "15px" , display : "flex" , justifyContent : "space-between" }}>
                        <a> Đã thanh toán một phần: </a> <span id="user_tel">
                            <span
    style = {{paddingRight  : "15px"}}

                                className=""
                            >
                                {partiallly_paid}
                            </span>
                            <span

                                className={`step  ${statusPartially}`}
                            >
                                {count_partially_paid}
                            </span>

                        </span>
                    </p>
             
                   
                  

                </div>

            </div>

        );
    }
}

export default BadgeTable;
