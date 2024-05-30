import React, { Component } from "react";
import { connect } from "react-redux";
import * as TransferAction from "../../actions/transfer_stock"
import { getBranchId } from "../../ultis/branchUtils";
import themeData from "../../ultis/theme_data";
class ModalDelete extends Component {
    
  onSave = (e) => {
    e.preventDefault();
    window.$('.modal').modal('hide');
    const { store_code, id } = this.props
    const branch_id = getBranchId()

    const data = { status: 1 }
    this.props.changeStatus(store_code, branch_id, id, data)
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
          <div class="modal-header" style={{ backgroundColor: themeData().backgroundColor }}>
          <h4 style={{ color: "white" }}>Hủy phiếu chuyển kho</h4>
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
                Bạn có chắc muốn hủy phiếu chuyển kho này chứ?
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
    changeStatus: (store_code, branch_id, id, data) => {
      dispatch(TransferAction.changeStatus(store_code, branch_id, id, data))
  }
  };
};
export default connect(null, mapDispatchToProps)(ModalDelete);
