import React, { Component } from "react";
import { connect } from "react-redux";
import * as ImportAction from "../../actions/import_stock"
import { getBranchId } from "../../ultis/branchUtils";
class ModalEnd extends Component {
    
  onSave = (e) => {
    e.preventDefault();
    window.$('.modal').modal('hide');
    const { store_code, id } = this.props
    const branch_id = getBranchId()
    const data = { status: 5 }
    this.props.changeStatus(store_code, branch_id, id, data)
  };

  render() {
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="endModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header" style={{ background: "#47d3b0" }}>
            <h4>Kết thúc đơn nhập</h4>
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
               Đơn hàng ở trạng thái kết thúc sẽ không thể nhập kho hoặc thanh toán. Bạn có chắc chắn muốn kết thúc đơn nhập này không?
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
    changeStatus: (store_code, branch_id, id, data) => {
      dispatch(ImportAction.changeStatus(store_code, branch_id, id, data))
  }
  };
};
export default connect(null, mapDispatchToProps)(ModalEnd);
