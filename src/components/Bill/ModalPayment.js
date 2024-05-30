import React, { Component } from "react";
import { connect } from "react-redux";
import * as billAction from "../../actions/bill"
import { filter_var } from "../../ultis/helpers"
import themeData from "../../ultis/theme_data";

class ModalPayment extends Component {

    onSave = (e) => {
        e.preventDefault();
        window.$('.modal').modal('hide');
        var payment = this.props.data
        var { store_code, billId, order_code,order_id } = this.props
        this.props.updateStatusPayment(
            { order_code: payment.value.order_code, payment_status_code: payment.value.payment_status_code },
            store_code, order_id, order_code)

    };

    render() {
        var payment = this.props.data;
        var modalName = payment.nameModal;
        var order_code = typeof payment.value !== "undefined" ? payment.value.order_code : ""
        var statusName = typeof payment.value !== "undefined" ? payment.value.statusName : ""
        return (
            <div
                class="modal fade"
                tabindex="-1"
                role="dialog"
                id="postModalPayment"
                data-keyboard="false"
                data-backdrop="static"
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header" style={{ backgroundColor: themeData().backgroundColor }}>
              <h4 style={{ color: "white" }}>Thông báo</h4>                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form
                            onSubmit={this.onSave}
                            role="form"
                            action="#"
                            method="post"
                            id="removeForm"
                        >
                            <div class="modal-body">
                                <input type="hidden" name="remove_id_store" />
                                <div class="alert-remove"></div>
                                <span>Chuyển trạng thái {modalName} <strong>{order_code}</strong> sang {statusName}</span>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-default"
                                    data-dismiss="modal"
                                >
                                    Đóng
                                </button>
                                <button type="submit" class="btn btn-warning">
                                    Lưu thay đổi

                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        updateStatusPayment: (data, store_code, billId, order_code) => {
            dispatch(billAction.updateStatusPayment(data, store_code, billId, order_code));
        },

    };
};
export default connect(null, mapDispatchToProps)(ModalPayment);
