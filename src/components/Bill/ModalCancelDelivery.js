import React, { Component } from "react";
import { connect } from "react-redux";
import * as billAction from "../../actions/bill";
import { filter_var } from "../../ultis/helpers";
import themeData from "../../ultis/theme_data";

class ModalCancelDelivery extends Component {
  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");

    var { cancelConnectToDelivery } = this.props;
    cancelConnectToDelivery();
  };

  render() {
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="cancelDelivery"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Thông báo</h4>{" "}
              <button
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
                <div class="alert-remove"></div>
                <span>Bạn có muốn hủy kết nối vận chuyển không?</span>
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
                  Xác nhận
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
      dispatch(
        billAction.updateStatusOrder(data, store_code, billId, order_code)
      );
    },
    fetchBillHistory: (store_code, billId) => {
      dispatch(billAction.fetchBillHistory(store_code, billId));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalCancelDelivery);
