import React, { Component } from "react";
import { connect } from "react-redux";
import * as discountAction from "../../../../actions/discount";

class ConfimUpdateUsed extends Component {
  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    this.props.onOk();
  };

  render() {
    var { modal } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="confimUpdateUsedModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header" style={{ background: "#47d3b0" }}>
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
              id="confimUpdateUsedModal"
            >
              <div class="modal-body">
                <input type="hidden" name="remove_id_store" />
                <div class="alert-remove"></div>
                Thay đổi số lượng giới hạn sẽ cập nhật số lượng đã sử dụng về 0
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
    updateDiscountIsEnd: (store_code, discount, id) => {
      dispatch(discountAction.updateDiscountIsEnd(store_code, discount, id));
    },
  };
};
export default connect(null, mapDispatchToProps)(ConfimUpdateUsed);
