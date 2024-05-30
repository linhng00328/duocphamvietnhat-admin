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

class ModalUpdateChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      id: "",
      idChild: "",
      image: "",
      fileUpload: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var category = nextProps.modal;
      console.log("category", category);
      this.setState({
        txtName: category.name,
        idChild: category.idChild,
        id: category.id,
        image: category.image,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(nextProps.attribute_search, this.props.attribute_search) ||
      nextState.fileUpload == ""
    ) {
      console.log("asdas");
      window.$(".modal").modal("hide");
      window.$("#file-attribute-search-update-child").fileinput("clear");
      this.setState({
        txtName: "",
        fileUpload: null,
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
          content: "Tên thuộc tính con không được để trống",
        },
      });
      return;
    }
    var category = this.state;
    var file = this.state.fileUpload;
    const fd = new FormData();

    fd.append("name", this.state.txtName);

    this.props.updateAttributeSearchChild(
      this.props.store_code,
      category.id,
      category.idChild,
      fd
    );
  };
  componentDidMount() {
    var _this = this;

    window
      .$("#file-attribute-search-update-child")
      .on("fileloaded", function (event, file) {
        _this.setState({ fileUpload: file });
      });
    window
      .$("#file-attribute-search-update-child")
      .on("fileremoved", function (event, id, index) {
        _this.setState({ fileUpload: null });
      });

    helper.loadFileInput("file-attribute-search-update-child");
  }
  render() {
    var { txtName, image } = this.state;
    console.log("image", image);
    var image = image == null || image == "" ? Env.IMG_NOT_FOUND : image;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateModalChild"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 class="modal-title">Chỉnh sửa thuộc tính con</h4>

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
              id="updateChildForm"
            >
              <div class="modal-body">
                <div class="form-group">
                  <label for="product_name">Sửa thuộc tính con</label>
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
    updateAttributeSearchChild: (store_code, id, idChild, data) => {
      dispatch(
        attributeSearchAction.updateAttributeSearchChild(
          store_code,
          id,
          idChild,
          data
        )
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdateChild);
