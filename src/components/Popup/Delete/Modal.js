import React, { Component } from "react";
import { connect } from "react-redux";
import * as popupAction from "../../../actions/popup";
import themeData from "../../../ultis/theme_data";

class Modal extends Component {
    
  onSave = (e) => {
    e.preventDefault();
    window.$('.modal').modal('hide');
    var popup = this.props.modal.id;
    var {store_code} = this.props
    this.props.destroyPopup(store_code,popup );
  };

  render() {
    var { modal } = this.props;
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
                Bạn có chắc chắn muốn xóa popup quảng cáo này không?
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
                  Xóa
                  
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
    destroyPopup: (store_code,popup) => {
      dispatch(popupAction.destroyPopup(store_code,popup));
    },
  };
};
export default connect(null, mapDispatchToProps)(Modal);
