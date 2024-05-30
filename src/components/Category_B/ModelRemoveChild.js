import React, { Component } from "react";
import * as categoryBAction from "../../actions/category_blog";
import { connect } from "react-redux";
import themeData from "../../ultis/theme_data";

class ModalRemoveChild extends Component {
  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    var { store_code, modal } = this.props;
    this.props.destroyCategoryChild(store_code, modal.id, modal.idChild);
  };

  render() {
    var { modal } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="removeModalChild"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog " role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style = {{color : "white"}}>Thông báo</h4>
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
              id="removeFormChild"
            >
              <div class="modal-body">
                <input type="hidden" name="remove_id_store" />
                <div class="alert-remove"></div>
                Bạn có muốn xóa {modal.title}: {modal.name}
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
    destroyCategoryChild: (store_code, id, idChild) => {
      dispatch(categoryBAction.destroyCategoryChild(store_code, id, idChild));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalRemoveChild);
