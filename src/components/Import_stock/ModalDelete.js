import React, { Component } from "react";
import { connect } from "react-redux";
import * as ImportAction from "../../actions/import_stock";
import { getBranchId } from "../../ultis/branchUtils";
class ModalDelete extends Component {
  onSave = (e) => {
    e.preventDefault();
    const { store_code, id } = this.props;
    const branch_id = getBranchId();

    this.props.postRefund(
      id,
      {
        refund_line_items: [],
      },
      store_code,
      branch_id,
      () => {
        window.$(".modal").modal("hide");
      }
    );
  };

  render() {
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="removeModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header" style={{ background: "#47d3b0" }}>
              <h4>Hủy đơn nhập</h4>
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
                Bạn có chắc muốn hủy đơn nhập này chứ?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-info">
                  Đồng ý
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
    changeStatus: (store_code, branch_id, id, data, onSuccess) => {
      dispatch(
        ImportAction.changeStatus(store_code, branch_id, id, data, onSuccess)
      );
    },
    postRefund: (id, data, store_code, branch_id, onSuccess) => {
      dispatch(
        ImportAction.postRefund(id, data, store_code, branch_id, onSuccess)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalDelete);
