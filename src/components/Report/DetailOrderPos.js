import React, { Component } from "react";
import * as Env from "../../ultis/default"
import { format } from "../../ultis/helpers"
class BadgeTable extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        var { store_code, overview } = this.props
        var order = typeof overview.data_prime_time != "undefined" ? overview.data_prime_time.details_by_order_status : overview.data_prime_time
        var completed = typeof order != "undefined" && order != null ? format(Number(order.COMPLETED.total_final)) : 0
        var customer_cancelled = typeof order != "undefined" && order != null ? format(Number(order.CUSTOMER_CANCELLED.total_final)) : 0
        var customer_has_return = typeof order != "undefined" && order != null ? format(Number(order.CUSTOMER_HAS_RETURNS.total_final)) : 0
        var customer_returning = typeof order != "undefined" && order != null ? format(Number(order.CUSTOMER_RETURNING.total_final)) : 0
        var delivery_error = typeof order != "undefined" && order != null ? format(Number(order.DELIVERY_ERROR.total_final)) : 0
        var out_of_stock = typeof order != "undefined" && order != null ? format(Number(order.OUT_OF_STOCK.total_final)) : 0
        var packing = typeof order != "undefined" && order != null ? format(Number(order.PACKING.total_final)) : 0
        var shipping = typeof order != "undefined" && order != null ? format(Number(order.SHIPPING.total_final)) : 0
        var user_cancelled = typeof order != "undefined" && order != null ? format(Number(order.USER_CANCELLED.total_final)) : 0
        var waiting_for_progress = typeof order != "undefined" && order != null ? format(Number(order.WAITING_FOR_PROGRESSING.total_final)) : 0

        var count_completed = typeof order != "undefined" && order != null ? order.COMPLETED.total_order_count : 0

        var count_customer_cancelled = typeof order != "undefined" && order != null ? order.CUSTOMER_CANCELLED.total_order_count : 0
        var count_customer_has_return = typeof order != "undefined" && order != null ? order.CUSTOMER_HAS_RETURNS.total_order_count : 0
        var count_customer_returning = typeof order != "undefined" && order != null ? order.CUSTOMER_RETURNING.total_order_count : 0
        var count_delivery_error = typeof order != "undefined" && order != null ? order.DELIVERY_ERROR.total_order_count : 0
        var count_out_of_stock = typeof order != "undefined" && order != null ? order.OUT_OF_STOCK.total_order_count : 0
        var count_packing = typeof order != "undefined" && order != null ? order.PACKING.total_order_count : 0
        var count_shipping = typeof order != "undefined" && order != null ? order.SHIPPING.total_order_count : 0
        var count_user_cancelled = typeof order != "undefined" && order != null ? order.USER_CANCELLED.total_order_count : 0
        var count_waiting_for_progress = typeof order != "undefined" && order != null ? order.WAITING_FOR_PROGRESSING.total_order_count : 0


        var statusCompleted = count_completed == 0 || completed == null ? "hide-badge" : "active-badge"
        var statusCustomerCancel = count_customer_cancelled == 0 || customer_cancelled == null ? "hide-badge" : "active-badge"
        var statusCustomerHasReturn = count_customer_has_return == 0 || customer_has_return == null ? "hide-badge" : "active-badge"
        var statusCustomerReturning = count_customer_returning == 0 || customer_returning == null ? "hide-badge" : "active-badge"
        var statusDeliveryError = count_delivery_error == 0 || delivery_error == null ? "hide-badge" : "active-badge"
        var statusOutOfStock = count_out_of_stock == 0 || out_of_stock == null ? "hide-badge" : "active-badge"
        var statusPacking = count_packing == 0 || packing == null ? "hide-badge" : "active-badge"
        var statusShipping = count_shipping == 0 || shipping == null ? "hide-badge" : "active-badge"
        var statusUserCancel = count_user_cancelled == 0 || user_cancelled == null ? "hide-badge" : "active-badge"
        var statusWaitingForProgress = count_waiting_for_progress == 0 || waiting_for_progress == null ? "hide-badge" : "active-badge"



        return (

            <div class="row" style={{ height: "100%" }}>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ borderRight: "1px solid #c0bfbf" }}>
                    <div class="form-group" style={{ fontSize: "15px" }}>

                        <div class="info-badge  badge-report" >
                            <p class="report-detail " id="booking_time">
                                <a >Đã thanh toán: </a> <span id="user_name">
                                    <span
                                        style={{ paddingRight: "15px" }}

                                        className=""
                                    >
                                        {completed}
                                    </span>
                                    <span

                                        className={`step  ${statusCompleted}`}
                                    >
                                        {count_completed}
                                    </span>

                                </span>
                            </p>

                            <p class="report-detail " id="booking_time" >
                                <a> Đã trả hàng: </a> <span id="user_tel">
                                    <span
                                        style={{ paddingRight: "15px" }}

                                        className=""
                                    >
                                        {customer_has_return}
                                    </span>
                                    <span

                                        className={`step  ${statusCustomerHasReturn}`}
                                    >
                                        {count_customer_has_return}
                                    </span>

                                </span>
                            </p>


                        </div>

                    </div>

                </div>



            </div>

        );
    }
}

export default BadgeTable;
