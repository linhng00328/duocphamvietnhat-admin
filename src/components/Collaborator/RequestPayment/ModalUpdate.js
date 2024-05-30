import React, { Component } from "react";
import * as collaboratorAction from "../../../actions/collaborator";
import { connect } from "react-redux";

import themeData from "../../../ultis/theme_data";

class ModalUpdate extends Component {
  constructor(props) {
    super(props);
   
  }


  onSave = (e) => {
    e.preventDefault();
    window.$('.modal').modal('hide');
    var {data} = this.props.modal
    this.props.updateRequestPayment(this.props.store_code,data);
  };

  render() {
    var { name } = this.props.modal;
    return (
      <div
      class="modal fade"
      tabindex="-1"
      role="dialog"
      id="updateModalRequest"
      data-keyboard="false"
      data-backdrop="static"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header" style={{ backgroundColor: themeData().backgroundColor }}>
              <h4 style={{ color: "white" }}>Thông báo</h4>            <button
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
             Xác nhận {name}
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
    updateRequestPayment: (store_code,data) => {
          dispatch(collaboratorAction.updateRequestPayment(store_code,data));
      },
     
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdate);