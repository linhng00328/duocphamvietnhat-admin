import React, { Component } from "react";
import { connect } from "react-redux";
import * as billAction from "../../actions/bill"
import { filter_var } from "../../ultis/helpers"
import themeData from "../../ultis/theme_data";

class ModalOrder extends Component {

    onSave = (e) => {
        e.preventDefault();
        window.$('.modal').modal('hide');
        var order = this.props.data
        var { store_code, billId, order_code, order_id } = this.props
        this.props.updateStatusOrder(
            { order_code: order.value.order_code, order_status_code: order.value.order_status_code },
            store_code, order_id, order_code)

       
          
    };

    render() {
        var order = this.props.data;
        var modalName = order.nameModal;
        var order_code = typeof order.value !== "undefined" ? order.value.order_code : ""
        var statusName = typeof order.value !== "undefined" ? order.value.statusName : ""
        return (
            <div
                class="modal fade"
                tabindex="-1"
                role="dialog"
                id="postModal"
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
        updateStatusOrder: (data, store_code, billId, order_code) => {
            dispatch(billAction.updateStatusOrder(data, store_code, billId, order_code));
        },
        fetchBillHistory: (store_code, billId) => {
            dispatch(billAction.fetchBillHistory(store_code, billId));
        },
    };
};
export default connect(null, mapDispatchToProps)(ModalOrder);
