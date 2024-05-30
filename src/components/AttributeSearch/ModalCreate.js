import React, { Component } from "react";
import * as attributeSearchAction from "../../actions/attribute_search";
import { connect } from "react-redux";
import * as helper from "../../ultis/helpers";
import { compressed } from "../../ultis/helpers";
import { shallowEqual } from "../../ultis/shallowEqual";
import { isEmpty } from "../../ultis/helpers";
import * as Types from "../../constants/ActionType";
import themeData from "../../ultis/theme_data";
import "./style.css";
class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      fileUpload: null,
      isShowHome: false,
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    var _this = this;

    window.$("#file-attribute-search").on("fileloaded", function (event, file) {
      _this.setState({ fileUpload: file });
    });
    window
      .$("#file-attribute-search")
      .on("fileremoved", function (event, id, index) {
        _this.setState({ fileUpload: null });
      });

    helper.loadFileInput("file-attribute-search");
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(nextProps.attribute_search, this.props.attribute_search)
    ) {
      window.$(".modal").modal("hide");
      window.$("#file-attribute-search").fileinput("clear");
      this.setState({
        txtName: "",
        isShowHome: false,
      });
    }
  }
  handleClear = () => {
    this.setState({
      txtName: "",
      fileUpload: null,
      isShowHome: false,
    });
    window.$("#file-attribute-search").fileinput("clear");
  };
  onSave = async (e) => {
    e.preventDefault();
    // window.$('.modal').modal('hide');

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

    const fd = new FormData();
    fd.append("name", this.state.txtName);
    fd.append("is_show_home", true);
    this.props.createAttributeSearch(this.props.store_code, fd);
  };
  render() {
    console.log("render");
    var { txtName, isShowHome } = this.state;
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
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 class="modal-title">Thêm thuộc tính tìm kiếm</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={this.handleClear}
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="createForm"
            >
              <div class="modal-body" style={{ padding: " 0 10px" }}>
                <div class="form-group">
                  <div style={{ fontWeight: "bold" }} for="product_name">
                    Tên thuộc tính
                  </div>
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
                  onClick={this.handleClear}
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
    createAttributeSearch: (id, form) => {
      dispatch(attributeSearchAction.createAttributeSearch(id, form));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalCreate);
