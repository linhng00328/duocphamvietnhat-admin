import React, { Component } from "react";
import * as agencyAction from "../../../actions/agency";
import { connect } from "react-redux";

class ModalUpdateAll extends Component {
  constructor(props) {
    super(props);
  }

  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    this.props.updateAllRequestPayment(this.props.store_code);
  };

  render() {
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateModalAllRequest"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
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
                Xác nhận quyết toán toàn bộ đại lý
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
    updateAllRequestPayment: (store_code) => {
      dispatch(agencyAction.updateAllRequestPayment(store_code));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdateAll);
