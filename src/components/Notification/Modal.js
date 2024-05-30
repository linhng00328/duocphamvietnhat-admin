import React, { Component } from "react";

class Modal extends Component {
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
            <div class="modal-header" style={{background: "#47d3b0"}}>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
          
            </div>
            <form role="form" action="#" method="post" id="removeForm">
              <div class="modal-body">
                <input type="hidden" name="remove_id_store" />
                <div class="alert-remove"></div>
                Bạn có muốn xóa danh mục ID : 0001
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-info">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
