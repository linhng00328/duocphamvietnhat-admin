import React, { Component } from "react";
import * as CategoryPAction from "../../actions/category_blog";
import { connect } from "react-redux";
import * as helper from "../../ultis/helpers";
import { compressed } from "../../ultis/helpers";
import { shallowEqual } from "../../ultis/shallowEqual";
import { isEmpty } from "../../ultis/helpers";
import * as Types from "../../constants/ActionType";
import themeData from "../../ultis/theme_data";
import Select from "react-select";

class ModalCreateChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      fileUpload: null,
      meta_robots_index: "noindex",
      meta_robots_follow: "nofollow",
      canonical_url: "",
      post_category_children_url: "",
    };
  }

  componentDidMount() {
    var _this = this;

    window
      .$("#file-category-product-child")
      .on("fileloaded", function (event, file) {
        _this.setState({ fileUpload: file });
      });
    window
      .$("#file-category-product-child")
      .on("fileremoved", function (event, id, index) {
        _this.setState({ fileUpload: null });
      });

    helper.loadFileInput("file-category-product-child");
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
    if (!shallowEqual(nextProps.category_blog, this.props.category_blog)) {
      window.$(".modal").modal("hide");
      window.$("#file-category-product-child").fileinput("clear");
      this.setState({
        txtName: "",
      });
    }
  }
  handleClear = () => {
    this.setState({
      txtName: "",
      fileUpload: null,
    });
    window.$("#file-category-product-child").fileinput("clear");
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
          content: "Tên danh mục không được để trống",
        },
      });
      return;
    }

    var file = this.state.fileUpload;
    if (typeof file !== "undefined" && file != "" && file != null) {
      // window.$('#file-category-product').fileinput('clear');
      const fd = new FormData();
      fd.append("image", await compressed(file));
      fd.append("name", this.state.txtName);
      fd.append("meta_robots_index", this.state.meta_robots_index);
      fd.append("meta_robots_follow", this.state.meta_robots_follow);
      fd.append("canonical_url", this.state.canonical_url);
      fd.append(
        "post_category_children_url",
        this.state.post_category_children_url
      );

      var { store_code, modal } = this.props;
      this.props.createCategoryChild(store_code, modal.id, fd);
      this.setState({ fileUpload: null });
    } else {
      window.$("#file-category-product-child").fileinput("clear");
      const fd = new FormData();
      fd.append("name", this.state.txtName);
      fd.append("meta_robots_index", this.state.meta_robots_index);
      fd.append("meta_robots_follow", this.state.meta_robots_follow);
      fd.append("canonical_url", this.state.canonical_url);
      fd.append(
        "post_category_children_url",
        this.state.post_category_children_url
      );
      this.props.createCategoryChild(
        this.props.store_code,
        this.props.modal.id,
        fd
      );
    }
  };
  render() {
    var { txtName } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="createModalChild"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 class="modal-title">Thêm danh mục con</h4>

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
              id="createFormChild"
            >
              <div class="modal-body">
                <div class="form-group">
                  <label for="product_name">Tên danh mục con</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập tên danh mục"
                    autoComplete="off"
                    value={txtName}
                    onChange={this.onChange}
                    name="txtName"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Hình ảnh</label>
                  <div className="file-loading">
                    <input
                      id="file-category-product-child"
                      type="file"
                      className="file"
                      data-overwrite-initial="false"
                      data-min-file-count="2"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Đường dẫn</label>
                  <div
                    style={{
                      border: "1px solid #d1d3e2",
                      borderRadius: "0.35rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        paddingLeft: "8px",
                        color: "gray",
                      }}
                    >
                      https://duocphamnhatban.ikitech.vn/
                    </span>
                    <input
                      type="text"
                      name="post_category_children_url"
                      onChange={this.onChange}
                      value={this.state.post_category_children_url}
                      style={{
                        minWidth: "200px",
                        outline: "none",
                        border: "none",
                        paddingLeft: "8px",
                        height: "calc(1.5em + 0.75rem + 2px)",
                        borderRadius: "0.35rem",
                        flex: 1,
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Canonical Url</label>
                  <div
                    style={{
                      border: "1px solid #d1d3e2",
                      borderRadius: "0.35rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        paddingLeft: "8px",
                        color: "gray",
                      }}
                    >
                      https://duocphamnhatban.ikitech.vn/
                    </span>
                    <input
                      type="text"
                      name="canonical_url"
                      onChange={this.onChange}
                      value={this.state.canonical_url}
                      style={{
                        minWidth: "200px",
                        outline: "none",
                        border: "none",
                        paddingLeft: "8px",
                        height: "calc(1.5em + 0.75rem + 2px)",
                        borderRadius: "0.35rem",
                      }}
                    />
                  </div>
                  <div
                    className="form-group"
                    style={{
                      marginTop: "8px",
                    }}
                  >
                    <label>Meta Robots Index</label>

                    <div
                      style={{
                        width: "150px",
                      }}
                    >
                      <Select
                        value={this.state.meta_robots_index}
                        onChange={(value) => {
                          this.setState({ meta_robots_index: value });
                        }}
                        options={[
                          { value: "noindex", label: "NoIndex" },
                          { value: "index", label: "Index" },
                        ]}
                        placeholder="Chọn meta"
                        name="meta_robots_index"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Meta Robots Follow</label>

                    <div
                      style={{
                        width: "150px",
                      }}
                    >
                      <Select
                        value={this.state.meta_robots_follow}
                        onChange={(value) => {
                          this.setState({ meta_robots_follow: value });
                        }}
                        options={[
                          { value: "nofollow", label: "NoFollow" },
                          { value: "follow", label: "Follow" },
                        ]}
                        placeholder="Chọn meta"
                        name="meta_robots_follow"
                      />
                    </div>
                  </div>
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
    createCategoryChild: (store_code, id, form) => {
      dispatch(CategoryPAction.createCategoryChild(store_code, id, form));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalCreateChild);
