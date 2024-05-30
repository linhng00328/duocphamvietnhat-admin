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
            <div class="form-group" style={{ fontSize: "15px" }}>
                <div class="info-badge  badge-report" >
                    {/* <p class="report-detail" id="sale_user_name">
                        <a >Khách đã hủy: </a> <span id="user_name">
                            <span

                                        style={{ paddingRight: "15px" }}
                            >
                                {customer_cancelled}
                            </span>
                            <span

                                className={`step  ${statusCustomerCancel}`}
                            >
                                {count_customer_cancelled}
                            </span>

                        </span>
                    </p> */}
                    <p class="report-detail" id="delivery_address">
                        <a >Đã thanh toán: </a> <span id="user_address">
                            <span

                                        style={{ paddingRight: "15px" }}
                            >
                                {paid}
                            </span>
                            <span

                                className={`step  ${statusPaid}`}
                            >
                                {count_paid}
                            </span>

                        </span>
                    </p>
                    <p class="report-detail">
                        <a> Đã thanh toán một phần: </a> <span id="user_tel">
                            <span

                                        style={{ paddingRight: "15px" }}
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
                    <p class="report-detail">
                        <a >Đã hoàn tiền: </a><span id="user_tel">
                            <span

                                        style={{ paddingRight: "15px" }}
                            >
                                {refunds}
                            </span>
                            <span

                                className={`step  ${statusRefunds}`}
                            >
                                {count_refunds}
                            </span>

                        </span>
                    </p>
                    <p class="report-detail" id="booking_time">
                        <a > Chưa thanh toán: </a><span id="booking_time_txt">
                            <span

                                        style={{ paddingRight: "15px" }}
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
                    {/* <p class="report-detail" id="booking_time">
                        <a > Chờ xử lý: </a><span id="booking_time_txt">
                            <span

                                        style={{ paddingRight: "15px" }}
                            >
                                {waitting_for_progressing}
                            </span>
                            <span

                                className={`step  ${statusWaitingForProgress}`}
                            >
                                {count_waitting_for_progressing}
                            </span>

                        </span>
                    </p> */}

                </div>

            </div>

        );
    }
}

export default BadgeTable;
