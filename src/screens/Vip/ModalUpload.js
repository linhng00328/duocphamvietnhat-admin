import React, { Component } from "react";
import * as helper from "../../ultis/helpers";
import { connect } from "react-redux";
import {compressed} from "../../ultis/helpers"
import * as configVipAction from "../../actions/config_vip";

class ModalUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUpload: null

    };
  }


  onSave= async (e) =>{
    var {typeUpload} = this.props
    e.preventDefault();
    window.$('.modal').modal('hide');

    var file = this.state.fileUpload;
    if(typeof file !== "undefined" && file != "" && file != null )
    {
      window.$('#file-theme').fileinput('clear');
      const fd = new FormData();
      fd.append('image' , await compressed(file))
      if(typeUpload == "LOGO")
      this.props.uploadImg_LOGO(fd)
      if(typeUpload == "LOGO_AFTER")
      this.props.uploadImg_LOGO_AFTER(fd)
      if(typeUpload == "LOGIN")
      this.props.uploadImg_LOGIN(fd)    

      this.setState({fileUpload: null})

    }




  }

  componentDidMount() {
    var _this = this

    window.$('#file-theme').on('fileloaded', function (event, file) {
      _this.setState({ fileUpload: file })
    });
    window.$('#file-theme').on('fileremoved', function (event, id, index) {
      _this.setState({ fileUpload: null })
    });
    helper.loadFileInput("file-theme");
  }
  render() {
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="uploadModalConfigVip"
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
            >
              <div className="modal-body">
                <form enctype="multipart/form-data">
                  <div className="form-group">
                    <div className="file-loading">
                      <input
                        id="file-theme"
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
                  Upload
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
    uploadImg_LOGO: ( file) => {
      dispatch(configVipAction.uploadImg_LOGO(file));
    },
    uploadImg_LOGO_AFTER: ( file) => {
      dispatch(configVipAction.uploadImg_LOGO_AFTER(file));
    },
    uploadImg_LOGIN: ( file) => {
      dispatch(configVipAction.uploadImg_LOGIN(file));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpload);
