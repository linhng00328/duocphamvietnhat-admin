import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import * as helper from "../../../ultis/helpers";
import { compressed } from "../../../ultis/helpers";
import { isEmpty } from "../../../ultis/helpers";
import * as Types from "../../../constants/ActionType";
class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      link: "",
      fileUpload: null,
    };
  }

  componentDidMount() {
    var _this = this;

    window.$("#file-banner").on("fileloaded", function (event, file) {
      _this.setState({ fileUpload: file });
    });
    window.$("#file-banner").on("fileremoved", function (event, id, index) {
      _this.setState({ fileUpload: null });
    });
    helper.loadFileInput("file-banner");
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };
  onSave = async (e) => {
    e.preventDefault();

    var { title, link } = this.state;

    var { store_code, carousel_app_images, theme } = this.props;
    var file = this.state.fileUpload;

    if (typeof file !== "undefined" && file != "" && file != null) {
      window.$(".modal").modal("hide");

      window.$("#file-banner").fileinput("clear");

      this.props.createBanner(
        store_code,
        { title: title, link_to: link, file: await compressed(file, 0, 0) },
        carousel_app_images,
        theme
      );
      this.setState({ fileUpload: null, title: "" });
    } else {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng chọn ảnh banner",
        },
      });

      // this.props.createBanner(store_code, { title: title, file: "" }, carousel_app_images,theme);
    }
  };
  render() {
    var { title, link } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="createModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Thêm Banner</h4>

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
              <div class="modal-body">
                <div class="form-group">
                  <label for="product_name">Tên tiêu đề</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="Nhập tiêu đề"
                    autoComplete="off"
                    value={title}
                    onChange={this.onChange}
                    name="title"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Hình ảnh</label>
                  <div className="file-loading">
                    <input
                      id="file-banner"
                      type="file"
                      className="file"
                      data-overwrite-initial="false"
                      data-min-file-count="2"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="product_link">URL trang đích</label>
                  <input
                    id="product_link"
                    type="text"
                    className="form-control"
                    placeholder="VD: https://sy.ikiglobal.com/san-pham/Day-dong-ho-cho-Apple-Watch-Nike+-38-40mm-2220"
                    autoComplete="off"
                    value={link}
                    onChange={this.onChange}
                    name="link"
                  />
                </div>
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
    showError: (error) => {
      dispatch(error);
    },
    createBanner: (id, form, banners, theme) => {
      dispatch(themeAction.createBanner(id, form, banners, theme));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalCreate);
