import React, { Component } from "react";
import * as helper from "../../ultis/helpers"
import { connect } from "react-redux";
import * as categoryBAction from "../../actions/category_blog"

class ModalUpload extends Component {
  constructor(props) {
    super(props);

  }


  onSave= (e) =>{
    e.preventDefault();
    window.$('.modal').modal('hide');
    const fd = new FormData();
    fd.append('image' , this.state.selectedFile)
    this.props.uploadImgCategoryB(fd)
  }


  render() {
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="postDateModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Upload ảnh</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="removeForm"
            >
              <div className="modal-body">
                <form enctype="multipart/form-data">
                  <div className="form-group">
             
                  </div>
                </form>
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
    uploadImgCategoryB: ( file) => {
      dispatch(categoryBAction.uploadImgCategoryB(file));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpload);
