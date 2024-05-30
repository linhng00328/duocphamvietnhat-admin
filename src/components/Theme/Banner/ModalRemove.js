import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import themeData from "../../../ultis/theme_data";

class ModalRemove extends Component {
    
  onSave = (e) => {
    e.preventDefault();
    window.$('.modal').modal('hide');
    var {store_code , modal ,carousel_app_images , theme } = this.props
    this.props.destroyBanner(store_code,modal.id ,carousel_app_images , theme );
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
              <h4 style={{ color: "white" }}>Thông báo</h4>              <button
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
                Bạn có chắc chắn muốn xóa Banner: {modal._title}
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
    destroyBanner: (id, form , banners , theme) => {
      dispatch(themeAction.destroyBanner(id, form , banners , theme));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalRemove);
