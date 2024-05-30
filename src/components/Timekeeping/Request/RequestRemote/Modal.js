import React, { Component } from "react";
import { connect } from "react-redux";
import * as requestRemoteAction from "../../../../actions/request_remote";
import themeData from "../../../../ultis/theme_data";

class Modal extends Component {
  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    var { id, status } = this.props.modal;
    var { store_code, branch_id } = this.props;
    // this.props.updateVoucherIsEnd(store_code, {is_end : true}, id)

    this.props.updateStatus(
      store_code,
      branch_id,
      id,
      {
        status: status,
      },
      1
    );
  };

  render() {
    var { modal } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="isEndModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
          <div class="modal-header" style={{ backgroundColor: themeData().backgroundColor }}>
              <h4 style={{ color: "white" }}>Thông báo</h4>
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
                <input type="hidden" name="remove_id_store" />
                <div class="alert-remove"></div>
                {console.log(modal)}
                {modal.status === 2
                  ? ` Bạn có muốn đồng ý yêu cầu chấm công từ xa của nhân viên: ${modal.name} ?`
                  : ` Bạn có muốn hủy yêu cầu chấm công từ xa của nhân viên: ${modal.name} ?`}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                {modal.status === 2 ? (
                  <button type="submit" class="btn btn-warning">
                    Đồng ý
                  </button>
                ) : (
                  <button type="submit" class="btn btn-warning">
                    Hủy
                  </button>
                )}
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
    updateStatus: (store_code, voucher, id, data, page) => {
      dispatch(
        requestRemoteAction.updateStatus(store_code, voucher, id, data, page)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(Modal);
