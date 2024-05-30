import React, { Component } from "react";
import * as productAction from "../../../../actions/product";
import * as helper from "../../../../ultis/helpers";
import { connect } from "react-redux";
import * as Types from "../../../../constants/ActionType";

class ModalUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      files_copy: [],

    };
  }

  onSave = (e) => {
    e.preventDefault();
    window.$('.modal').modal('hide');

      if (this.state.files.length > 0) {
        window.$('#file-listp').fileinput('clear');
        this.setState({
          files: [],
          files_copy: [],
        })
        this.props.uploadListImgProduct(this.state.files)

      }
    }

  componentDidMount() {
    var _this = this

    window.$('#file-listp').on('fileloaded', function (event, file, previewId, fileId, index, reader) {
      var files = [..._this.state.files];
      // console.log('something', files)
      var files_copy = [..._this.state.files_copy]
      if(Number(event.target.files?.length) - Number(files_copy?.length) + Number(_this.props.listImgProduct?.length) <= 13){
          // files.push(file)
          // files_copy.push(previewId)
          // _this.setState({ files, files_copy })  
      } else {
        _this.props.showErr({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Bạn chỉ có thể chọn tối đa 13 ảnh",
          },
        });
      }
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
{this.state.files.length}
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
                        id="file-listp"
                        type="file"
                        multiple
                        className="file"
                        data-overwrite-initial="false"
                        onChange={this.selectFileProduct}
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
    uploadListImgProduct: (file) => {
      dispatch(productAction.uploadListImgProduct(file));
    },
    checkNumImg: (alert) => {
      dispatch(alert)
    }
  };
};
export default connect(null, mapDispatchToProps)(ModalUpload);
