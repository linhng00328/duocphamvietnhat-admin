import React, { Component } from "react";
import * as productAction from "../../../../actions/product";
import { connect } from "react-redux";
import * as helper from "../../../../ultis/helpers";
import {compressed} from "../../../../ultis/helpers"

class ModalUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUpload: null

    };
  }
  componentDidMount() {

    var _this = this

    window.$('#file-distribute').on('fileloaded', function (event, file) {
      _this.setState({ fileUpload: file })
    });
    window.$('#file-distribute').on('fileremoved', function (event, id, index) {
      _this.setState({ fileUpload: null })
    });

    helper.loadFileInput("file-distribute");
  }



  onSave= async (e) =>{
    e.preventDefault();
    window.$('.modal').modal('hide');
    var {ImgDistribute , listImgDistribute} = {...this.props}


    var file = this.state.fileUpload;
    if(typeof file !== "undefined" && file != "" && file != null )
    {
      window.$('#file-distribute').fileinput('clear');
      const fd = new FormData();
      fd.append('image' , await compressed(file))
      this.props.uploadImgDistribute(fd, ImgDistribute ,listImgDistribute)
      this.setState({fileUpload: null})

    }




  }
  render() {
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="uploadModalDis"
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
                    <div className="file-loading">
                      <input
                        id="file-distribute"
                        type="file"
                        className="file"
                        data-overwrite-initial="false"

                      />
                    </div>
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
                  Tạo
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

    uploadImgDistribute: (file , imgId , listImgDistribute) => {
      dispatch(productAction.uploadImgDistribute(file , imgId , listImgDistribute));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpload);
