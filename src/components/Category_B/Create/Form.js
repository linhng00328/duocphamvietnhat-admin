import React, { Component } from "react";
import * as Types from "../../../constants/ActionType";
import { connect } from "react-redux";
import * as categoryBAction from "../../../actions/category_blog";
import { shallowEqual } from "../../../ultis/shallowEqual";
import CKEditor from "ckeditor4-react";
import ModalUpload from "./ModalUpload";
import * as Env from "../../../ultis/default";
import { isEmpty } from "../../../ultis/helpers";
import Select from "react-select";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtContent: "",
      txtTitle: "",
      image: "",
      isShowHome: false,
      meta_robots_index: "noindex",
      meta_robots_follow: "nofollow",
      canonical_url: "",
      post_category_url: "",
      txtSeoDescription: "",
      txtSeoTitle: "",
    };
  }
  componentDidMount() {
    this.props.initialUpload();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.image !== nextProps.image) {
      this.setState({ image: nextProps.image });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onChangeDecription = (evt) => {
    const data = evt.editor.getData();
    this.setState({ txtContent: data });
  };

  onSave = (e) => {
    var { store_code } = this.props;
    e.preventDefault();
    var { txtContent, txtTitle, image, isShowHome } = this.state;
    console.log(txtTitle);
    if (txtTitle == null || !isEmpty(txtTitle)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Tiêu đề không được để trống",
        },
      });
      return;
    }
    this.props.createCategoryB(store_code, {
      title: txtTitle,
      description: txtContent,
      image_url: image,
      is_show_home: isShowHome,
      meta_robots_index: this.state.meta_robots_index?.value,
      meta_robots_follow: this.state.meta_robots_follow?.value,
      canonical_url: this.state.canonical_url,
      post_category_url: this.state.post_category_url,
      txtSeoDescription: this.state.txtSeoDescription,
      txtSeoTitle: this.state.txtSeoTitle,
    });
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };
  render() {
    var { txtTitle, txtContent, image, isShowHome, txtSeoDescription, txtSeoTitle } = this.state;
    var image = image == "" || image == null ? Env.IMG_NOT_FOUND : image;

    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="box-body">
            <div class="form-group">
              <label for="product_name">Tên danh mục</label>
              <input
                type="text"
                class="form-control"
                id="txtTitle"
                value={txtTitle}
                name="txtTitle"
                placeholder="Nhập tên danh mục"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>
            <div class="form-check" style={{ marginTop: "10px", padding: "0" }}>
              <label class="form-check-label">
                <input
                  type="checkbox"
                  name="even"
                  onChange={() => this.setState({ isShowHome: !isShowHome })}
                  checked={isShowHome}
                />{" "}
                Hiển thị danh mục ở trang chủ
              </label>
            </div>
            <div class="form-group">
              <label>Ảnh: &nbsp; </label>
              <img src={`${image}`} width="150" height="150" />
            </div>
            <div class="form-group">
              <div class="kv-avatar">
                <div>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    data-toggle="modal"
                    data-target="#uploadModalCategoryB"
                  >
                    <i class="fa fa-plus"></i> Upload ảnh
                  </button>
                </div>
              </div>
            </div>
            {/* <div class="form-group">
              <label for="product_name">Nội dung mô tả danh mục</label>

              <textarea
                name="txtContent"
                value={txtContent}
                onChange={this.onChange}
                id="input"
                class="form-control"
                rows="3"
              ></textarea>
            </div> */}
            <div class="form-group">
              <label for="txtSeoTitle">Title</label>
              <textarea
                value={txtSeoTitle}
                maxlength="100"
                onChange={this.onChange}
                name="txtSeoTitle"
                id="input"
                class="form-control"
                rows="1"
              ></textarea>
            </div>{" "}
            <div class="form-group">
              <label for="txtSeoDescription">Description</label>
              <textarea
                value={txtSeoDescription}
                maxlength="200"
                onChange={this.onChange}
                name="txtSeoDescription"
                id="input"
                class="form-control"
                rows="3"
              ></textarea>
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
                  name="post_category_url"
                  onChange={this.onChange}
                  value={this.state.post_category_url}
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
          <div class="box-footer">
            <button type="submit" class="btn btn-info   btn-sm">
              <i class="fas fa-save"></i> Tạo
            </button>
            <button
              type="button"
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class="btn btn-warning   btn-sm"
            >
              <i class="fas fa-arrow-left"></i> Trở về
            </button>
          </div>
        </form>
        <ModalUpload />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.UploadReducers.categoryBImg.categoryB_img,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    initialUpload: () => {
      dispatch(categoryBAction.initialUpload());
    },
    createCategoryB: (store_code, data) => {
      dispatch(categoryBAction.createCategoryB(store_code, data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
