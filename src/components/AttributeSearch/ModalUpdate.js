import React, { Component } from "react";
import * as attributeSearchAction from "../../actions/attribute_search";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as helper from "../../ultis/helpers";
import * as Env from "../../ultis/default";
import { compressed } from "../../ultis/helpers";
import { isEmpty } from "../../ultis/helpers";
import * as Types from "../../constants/ActionType";
import themeData from "../../ultis/theme_data";

class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      id: "",
      image: "",
      fileUpload: null,
      isShowHome: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var category = nextProps.modal;
      this.setState({
        txtName: category.name,
        id: category.id,
        image: category.image_url,
        isShowHome: category.is_show_home ? true : false,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    if (
      !shallowEqual(nextProps.attribute_search, this.props.attribute_search) ||
      nextState.fileUpload == ""
    ) {
      window.$(".modal").modal("hide");
      window.$("#file-attribute-search-update").fileinput("clear");
      this.setState({
        txtName: "",
        fileUpload: null,
        isShowHome: false,
      });
    }
    return true;
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
    if (this.state.txtName == null || !isEmpty(this.state.txtName)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Tên thuộc tính không được để trống",
        },
      });
      return;
    }
    var category = this.state;
    var file = this.state.fileUpload;
    const fd = new FormData();

    fd.append("name", this.state.txtName);

    fd.append("is_show_home", true);

    this.props.updateAttributeSearch(this.props.store_code, category.id, fd);
  };
  componentDidMount() {
    var _this = this;

    window
      .$("#file-attribute-search-update")
      .on("fileloaded", function (event, file) {
        _this.setState({ fileUpload: file });
      });
    window
      .$("#file-attribute-search-update")
      .on("fileremoved", function (event, id, index) {
        _this.setState({ fileUpload: null });
      });

    helper.loadFileInput("file-attribute-search-update");
  }
  render() {
    var { txtName, image, isShowHome } = this.state;
    var image = image == null || image == "" ? Env.IMG_NOT_FOUND : image;

    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 class="modal-title">Chỉnh sửa thuộc tính tìm kiếm</h4>

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
              <div class="modal-body" style={{ maxHeight: "100%" }}>
                <div class="form-group">
                  <label for="product_name">Tên thuộc tính</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập tên thuộc tính"
                    autoComplete="off"
                    value={txtName}
                    onChange={this.onChange}
                    name="txtName"
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
                  Lưu
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
    updateAttributeSearch: (store_code, id, data) => {
      dispatch(
        attributeSearchAction.updateAttributeSearch(store_code, id, data)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdate);
