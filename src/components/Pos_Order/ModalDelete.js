import React, { Component } from "react";
import { connect } from "react-redux";
import * as posAction from '../../actions/post_order'
import themeData from "../../ultis/theme_data";
class ModalDelete extends Component {
    
  onSave = (e) => {
    e.preventDefault();
    window.$('.modal').modal('hide');
    var {store_code,idCart} = this.props
    const branch_id = localStorage.getItem("branch_id")
    this.props.deleteOneCart(store_code, branch_id, idCart)
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
            <div class="modal-header" style={{ background: themeData().backgroundColor }}>
              <h4 style={{
                color:"white"
              }}>Đóng đơn hàng </h4>
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
                Hệ thống sẽ không lưu lại thông tin của đơn hàng này. Bạn có chắc chắn đóng đơn hàng này không?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-yes-pos">
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
    deleteOneCart: (store_code, branch_id, id) => {
      dispatch(posAction.deleteOneCart(store_code, branch_id, id))
  },
  };
};
export default connect(null, mapDispatchToProps)(ModalDelete);
