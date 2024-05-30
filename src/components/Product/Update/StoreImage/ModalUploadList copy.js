import React, { Component } from "react";
import * as productAction from "../../../../actions/product";
import * as helper from "../../../../ultis/helpers";
import { connect } from "react-redux";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import * as Types from "../../../../constants/ActionType";

class ModalUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: "",
      files: [],
      files_copy: [],
      isUploading: false
    };
  }


  onSave = (e) => {
    e.preventDefault();
    window.$('.modal').modal('hide');

    if (this.props.listImgProduct.length + this.state.files.length > 10) {
      this.props.checkNumImg(
        {
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi ",
            disable: "show",
            content: "Chỉ được chọn tối đa 10 hình ảnh",
          },
        }
      )
    }
    else {
      if (this.state.files.length > 0) {
        var files = [...this.state.files]
        window.$('#file-listp').fileinput('clear');
        this.setState({
          files: [],
          files_copy: [],
        })

        this.props.startProgressBar()
        this.props.uploadListImgProduct(files)
   

      }
    }



  }



  componentDidMount() {
    var _this = this
    window.$('#file-listp').on('fileloaded', function (event, file, previewId, fileId, index, reader) {
      var files = [..._this.state.files]
      var files_copy = [..._this.state.files_copy]
      files.push(file)
      files_copy.push(previewId)
      _this.setState({ files, files_copy })
    });

    window.$('#file-listp').on('fileremoved', function (event, id, index) {
      var { files, files_copy } = _this.state
      var _files_copy = [...files_copy]
      if (files_copy.length > 0) {
        files_copy.forEach((item, _index) => {
          if (item == id) {
            files.splice(_index, 1);
            _files_copy.splice(_index, 1);
            _this.setState({ files: files , files_copy : _files_copy })
            return;
          }
        });
      }
    });
    helper.loadFileInput("file-listp");
  }
  showDialog = () => {
    window.$('#file-listp').trigger('click');
  }
  render() {
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="uploadModalListP"
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
                  <div className="form-group ">
                  {/* upload-list-product */}
                    <div className="file-loading">
                      <input
                        id="file-listp"
                        type="file"
                        multiple
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
    uploadListImgProduct: (file, listImg) => {
      dispatch(productAction.uploadListImgProduct(file, listImg));
    },
    checkNumImg: (alert) => {
      dispatch(alert)
    }
  };
};
export default connect(null, mapDispatchToProps)(ModalUpload);
