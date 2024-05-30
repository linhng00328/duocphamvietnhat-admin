import React, { Component } from "react";
import * as Types from "../../../constants/ActionType";
import { connect } from "react-redux";
import * as blogAction from "../../../actions/blog";
import { shallowEqual } from "../../../ultis/shallowEqual";
import ModalUpload from "../ModalUpload";
import Select from "react-select";
import * as Env from "../../../ultis/default";
import { isEmpty } from "../../../ultis/helpers";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { handleImageUploadBefore } from "../../../ultis/sun_editor";
import getChannel, { IKITECH } from "../../../ultis/channel";
import SeoOption from "./SeoOption";
import * as userLocalApi from "../../../data/local/user";
import {
  image as imagePlugin,
  font,
  fontSize,
  formatBlock,
  paragraphStyle,
  blockquote,
  fontColor,
  textStyle,
  list,
  lineHeight,
  table as tablePlugin,
  link as linkPlugin,
  video,
  audio,
} from "suneditor/src/plugins";
import imageGallery from "./../../imageGallery";
import { getApiImageStore } from "../../../constants/Config";
import "./style.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtTitle: "",
      image: "",
      listCategory: [],
      categoryParent: [],
      categoryChildrenIds: [],
      textCategories: [],
      txtSumary: "",
      txtPublished: 1,
      txtCategories: "",
      txtContent: "",
      icon: false,
      meta_robots_index: "noindex",
      meta_robots_follow: "nofollow",
      canonical_url: "",
      post_url: "",
    };
    this.editorRef = null;
  }
  
  getCodeViewContent = () => {
    this.setState({
      txtContent: this.editorRef.getContext().element.wysiwyg.innerHTML,
    });
  };

  setEditorRef = (editorInstance) => {
    this.editorRef = editorInstance;
  };

  componentDidMount() {
    var options = [];
    var categories = [...this.props.categories];
    if (categories.length > 0) {
      options = categories.map((category, index) => {
        return {
          id: category.id,
          value: category.id,
          label: category.title,
          categories_child: category.category_children,
        };
      });
      this.setState({ listCategory: options });
    }

    this.props.initialUpload();
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.categories, this.props.categories)) {
      var options = [];
      var categories = [...nextProps.categories];
      if (categories.length > 0) {
        options = categories.map((category, index) => {
          console.log(category);
          return { value: category.id, label: category.title };
        });
        this.setState({ listCategory: options });
      }
    }

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
  onChangeSelect = (selectValue) => {
    this.setState({ txtCategories: selectValue });
  };

  handleEditorChange = (editorState) => {
    this.setState({
      txtContent: editorState.srcElement.innerHTML,
    });
  };

  handleDataFromContent = (data) => {
    this.setState({
      txtSeoTitle: data.txtSeoTitle,
      txtSeoDescription: data.txtSeoDescription,
      meta_robots_index: data.meta_robots_index,
      meta_robots_follow: data.meta_robots_follow,
      canonical_url: data.canonical_url,
      post_url: data.post_url,
    });
  };

  onSave = (e) => {
    var { store_code } = this.props;
    e.preventDefault();
    var {
      txtContent,
      txtTitle,
      image,
      txtSumary,
      txtPublished,
      txtCategories,
      txtSeoDescription,
      txtSeoTitle,
      canonical_url,
      meta_robots_follow,
      meta_robots_index,
      post_url,
    } = this.state;

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
    if (
      txtCategories.value == null ||
      typeof txtCategories.value == "undefined"
    ) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Danh mục không được để trống",
        },
      });
      return;
    }
    var published = Number(txtPublished) == 1 ? true : false;
    var category_id = null;
    if (
      txtCategories.value != null &&
      txtCategories.value != "" &&
      typeof txtCategories.value != "undefined"
    ) {
      category_id = txtCategories.value;
    }
    this.props.createBlog(store_code, {
      content: txtContent,
      title: txtTitle,
      image_url: image,
      category_id: category_id,
      summary: txtSumary,
      published: published,
      seo_title: txtSeoTitle,
      seo_description: txtSeoDescription,
      category_parent: this.state.categoryParent.map((item) => item.id),
      category_children_ids: this.state.categoryChildrenIds.map(
        (item) => item.id
      ),
      canonical_url,
      meta_robots_follow,
      meta_robots_index,
      post_url,
    });
  };

  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };

  handleChangeCheckChild(id) {
    return this.state.categoryChildrenIds.map((e) => e.id).indexOf(id) > -1;
  }

  handleChangeCheckParent(id) {
    return this.state.categoryParent.map((e) => e.id).indexOf(id) > -1;
  }

  handleChangeChild = (categoryChild) => {
    var categoryParentOb;
    this.state.listCategory.forEach((category) => {
      if (category.categories_child != null) {
        category.categories_child.forEach((categorychild2) => {
          if (categorychild2.id === categoryChild.id) {
            categoryParentOb = category;
          }
        });
      }
    });
    if (categoryParentOb != null) {
      var indexHas = this.state.categoryParent
        .map((e) => e.id)
        .indexOf(categoryParentOb.id);
      if (indexHas !== -1) {
      } else {
        this.setState({
          categoryParent: [...this.state.categoryParent, categoryParentOb],
        });
      }
    }

    /////
    var indexHasChild = this.state.categoryChildrenIds
      .map((e) => e.id)
      .indexOf(categoryChild.id);
    if (indexHasChild !== -1) {
      var newListChild = this.state.categoryChildrenIds;
      newListChild.splice(indexHasChild, 1);
      this.setState({ categoryChildrenIds: newListChild });
    } else {
      this.setState({
        categoryChildrenIds: [...this.state.categoryChildrenIds, categoryChild],
      });
    }
    // this.props.handleDataFromInfo(this.state);
  };

  handleChangeParent = (category) => {
    var indexHas = this.state.categoryParent
      .map((e) => e.id)
      .indexOf(category.id);
    if (indexHas !== -1) {
      var newList = this.state.categoryParent;
      newList.splice(indexHas, 1);
      this.setState({ categoryParent: newList });
      this.state.listCategory.forEach((category1) => {
        if (category1.id === category.id) {
          category1.categories_child.forEach((categoryChild1) => {
            const indexChild = this.state.categoryChildrenIds
              .map((e) => e.id)
              .indexOf(categoryChild1.id);
            if (indexChild !== -1) {
              const newChild = this.state.categoryChildrenIds.splice(
                indexChild,
                1
              );
            }
          });
        }
      });
    } else {
      this.setState({
        categoryParent: [...this.state.categoryParent, category],
      });
    }
    // this.props.handleDataFromInfo(this.state);
  };

  handleGetListSelectedCategories = () => {
    let name = "";
    const categories = this.state.listCategory;
    if (this.state.categoryParent !== null) {
      categories.forEach((category) => {
        if (
          this.state.categoryParent.map((e) => e.id).indexOf(category.id) > -1
        ) {
          name = name + category.label + ", ";
        }
      });

      if (this.state.categoryChildrenIds !== null) {
        categories.forEach((category) => {
          category.categories_child.forEach((categoryChild) => {
            if (
              this.state.categoryChildrenIds
                .map((e) => e.id)
                .indexOf(categoryChild.id) > -1
            ) {
              name = name + categoryChild.name + ", ";
            }
          });
        });
      }
    }
    if (name.length > 0) {
      name = name.substring(0, name.length - 2);
    }
    return name;
  };

  render() {
    var {
      txtTitle,
      txtContent,
      image,
      listCategory,
      txtSumary,
      txtPublished,
      txtCategories,
      txtSeoDescription,
      txtSeoTitle,
      canonical_url,
      meta_robots_follow,
      meta_robots_index,
    } = this.state;
    var image = image == "" || image == null ? Env.IMG_NOT_FOUND : image;

    var { store_code } = this.props;
    // console.log("this.state.categoryParent", this.state.categoryParent);
    // console.log("this.state.categoryChildrenIds", this.state.categoryChildrenIds);

    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="box-body">
            <div class="row">
              <div
                class="col-xs-7 col-sm-7 col-md-7 col-lg-7"
                style={{ borderRight: "0.5px solid #cac9c9" }}
              >
                <div class="form-group">
                  <label for="product_name">Tên bài viết</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtTitle"
                    value={txtTitle}
                    placeholder="Nhập tên bài viết"
                    autoComplete="off"
                    onChange={this.onChange}
                    name="txtTitle"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Danh mục</label>
                  <Select
                    placeholder="-- Chọn danh mục --"
                    value={txtCategories}
                    isClearable
                    isSearchable
                    options={listCategory}
                    name="txtCategory"
                    onChange={this.onChangeSelect}
                    styles={{
                      zIndex: "99",
                    }}
                  />
                </div>
                {/* <div class="form-group">
                  <label for="product_name">Danh mục</label>
                  <div className="Choose-category-product">
                    <div
                      className="wrap_category"
                      style={{ display: "flex" }}
                      onClick={() => {
                        this.setState({
                          icon: !this.state.icon,
                        });
                      }}
                      data-toggle="collapse"
                      data-target="#demo2"
                    >
                      <input
                        // disabled
                        type="text"
                        class="form-control"
                        placeholder="--Chọn danh mục--"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          paddingRight: "55px",
                          position: "relative",
                        }}
                        value={this.handleGetListSelectedCategories()}
                      ></input>
                      <button
                        class="btn"
                        style={{
                          position: "absolute",
                          right: "27px",
                          outline: "none",
                        }}
                      >
                        <i
                          class={
                            this.state.icon
                              ? "fa fa-caret-up"
                              : "fa fa-caret-down"
                          }
                        ></i>
                      </button>
                    </div>
                    <div id="demo2" class="collapse">
                      <ul
                        style={{ listStyle: "none", margin: "5px 0" }}
                        class="list-group"
                      >
                        {listCategory?.length > 0 ? (
                          listCategory.map((category) => (
                            <li
                              class=""
                              style={{ cursor: "pointer", paddingLeft: "5px" }}
                            >
                              <input
                                type="checkbox"
                                style={{
                                  marginRight: "10px",
                                  width: "30px",
                                  height: "15px",
                                }}
                                checked={this.handleChangeCheckParent(
                                  category.id
                                )}
                                onChange={() =>
                                  this.handleChangeParent(category)
                                }
                              />
                              {category.label}
                              <ul
                                style={{
                                  listStyle: "none",
                                  margin: "0px 45px",
                                }}
                              >
                                {(category?.categories_child ?? []).map(
                                  (categoryChild) => (
                                    <li style={{ cursor: "pointer" }}>
                                      <input
                                        type="checkbox"
                                        style={{
                                          marginRight: "10px",
                                          width: "30px",
                                          height: "15px",
                                          marginTop: "3px",
                                        }}
                                        checked={this.handleChangeCheckChild(
                                          categoryChild.id
                                        )}
                                        onChange={() =>
                                          this.handleChangeChild(categoryChild)
                                        }
                                      />
                                      {categoryChild.name}
                                    </li>
                                  )
                                )}
                              </ul>
                            </li>
                          ))
                        ) : (
                          <div>Không có kết quả</div>
                        )}
                      </ul>
                    </div>
                  </div>
                </div> */}

                <div class="form-group">
                  <label for="product_name">Trạng thái</label>

                  <select
                    name="txtPublished"
                    value={txtPublished}
                    onChange={this.onChange}
                    id="input"
                    class="form-control"
                  >
                    <option value="1">Hiển thị</option>
                    <option value="0">Lưu tạm</option>
                  </select>
                </div>
              </div>

              <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
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
                        data-target="#uploadModalBlog"
                      >
                        <i class="fa fa-plus"></i> Upload ảnh
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="product_name">Mô tả bài viết</label>

              <textarea
                name="txtSumary"
                onChange={this.onChange}
                value={txtSumary}
                id="input"
                class="form-control"
                rows="3"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="product_name">Nội dung bài viết</label>
              <div className="editor">
                <SunEditor
                  getSunEditorInstance={this.setEditorRef}
                  onImageUploadBefore={handleImageUploadBefore}
                  showToolbar={true}
                  onChange={(editorState) => {
                    this.getCodeViewContent();
                  }}
                  setDefaultStyle="height: auto"
                  setOptions={{
                    requestHeaders: {
                      "X-Sample": "sample",
                      token: userLocalApi.getToken(),
                    },
                    imageGalleryLoadURL: getApiImageStore(store_code),

                    plugins: [
                      imagePlugin,
                      imageGallery,
                      font,
                      fontSize,
                      formatBlock,
                      paragraphStyle,
                      blockquote,
                      fontColor,
                      textStyle,
                      list,
                      lineHeight,
                      tablePlugin,
                      linkPlugin,
                      video,
                      audio,
                    ],

                    buttonList: [
                      [
                        "undo",
                        "redo",
                        "font",
                        "fontSize",
                        "formatBlock",
                        "paragraphStyle",
                        "blockquote",
                        "bold",
                        "underline",
                        "italic",
                        "fontColor",
                        "textStyle",
                        "align",
                        "horizontalRule",
                        "list",
                        "lineHeight",
                        "table",
                        "link",
                        "image",
                        "video",
                        "audio",
                        "imageGallery",
                        "fullScreen",
                        "preview",
                        "codeView",
                        "removeFormat",
                      ],
                    ],
                  }}
                  onPaste={this.handleEditorChange}
                />
              </div>
            </div>

            {getChannel() == IKITECH && (
              <div class="card mb-4">
                <div class="card-header title_content">Tối ưu SEO</div>
                <div class="card-body" style={{ padding: "0.8rem" }}>
                  <div class="row">
                    <SeoOption
                      txtSeoDescription={txtSeoDescription}
                      txtSeoTitle={txtSeoTitle}
                      meta_robots_index={meta_robots_index}
                      meta_robots_follow={meta_robots_follow}
                      canonical_url={canonical_url}
                      product_url={this.state.product_url}
                      handleDataFromContent={this.handleDataFromContent}
                    />
                  </div>
                </div>
              </div>
            )}
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

        <ModalUpload store_code={store_code} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.UploadReducers.blogImg.blog_img,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    initialUpload: () => {
      dispatch(blogAction.initialUpload());
    },
    createBlog: (store_code, data) => {
      dispatch(blogAction.createBlog(store_code, data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
