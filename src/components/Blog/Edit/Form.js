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
  align,
  template,
} from "suneditor/src/plugins";
import imageGallery from "./../../imageGallery";
import { getApiImageStore } from "../../../constants/Config";
import SeoOption from "./SeoOption";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtContent: "",
      txtTitle: "",
      image: "",
      listCategory: [],
      categoryParent: [],
      categoryChildrenIds: [],
      icon: false,
      textCategories: [],
      txtSumary: "",
      txtPublished: 1,
      txtCategories: "",
      txtSeoTitle: "",
      txtSeoDescription: "",
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
    this.props.fetchBlogId(this.props.store_code, this.props.blogId);
    var options = [];
    var categories = [...this.props.categories];
    if (categories.length > 0) {
      options = categories?.map((category, index) => {
        return {
          id: category.id,
          value: category.id,
          label: category.title,
          categories_child: category.category_children,
        };
      });
      this.setState({ listCategory: options });
    }

    //   this.props.initialUpload();
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.categories, this.props.categories)) {
      var options = [];
      var categories =
        typeof nextProps.categories != "undefined"
          ? [...nextProps.categories]
          : [];
      if (categories.length > 0) {
        options = categories?.map((category, index) => {
          console.log(category);
          return {
            id: category.id,
            value: category.id,
            label: category.title,
            categories_child: category.category_children,
          };
        });
        this.setState({ listCategory: options });
      }
    }
    console.log("nextProps1", nextProps);
    console.log("nextProps1", this.props.blog);

    if (!shallowEqual(nextProps.blog, this.props.blog)) {
      var txtCategories = {};
      var categories = [...nextProps.blog.categories];
      if (categories.length > 0) {
        txtCategories = { value: categories[0].id, label: categories[0].title };
      }

      var categories = [];
      var listcategorynew = [];
      console.log("nextProps", nextProps);
      console.log("nextProps", this.props.blog);
      categories = this.props.blog?.categories?.map((category, index) => {
        if (listcategorynew?.map((e) => e.id).indexOf(category.id) === -1) {
          listcategorynew.push(category);
        }

        // return { id: category.id, label: category.name };
        return {
          id: category.id,
          value: category.id,
          label: category.title,
          categories_child: category.category_children,
        };
      });

      var published = nextProps.blog.published == true ? 1 : 0;

      console.log(nextProps.blog.content);

      this.setState({
        txtContent: nextProps.blog.content,
        txtTitle: nextProps.blog.title,
        image: nextProps.blog.image_url,
        txtCategories: txtCategories,
        txtSumary: nextProps.blog.summary,
        txtPublished: published,
        txtSeoTitle: nextProps.blog.seo_title,
        txtSeoDescription: nextProps.blog.seo_description,
        categoryParent: listcategorynew,
        categoryChildrenIds: this.props.blog.category_children,
        meta_robots_index: nextProps.blog.meta_robots_index,
        meta_robots_follow: nextProps.blog.meta_robots_follow,
        canonical_url: nextProps.blog.canonical_url,
        post_url: nextProps.blog.post_url,
      });
      this.editorRef.getContext().element.wysiwyg.innerHTML =
        nextProps.blog.content;
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

  onSave = (e) => {
    var { store_code, blogId } = this.props;
    e.preventDefault();
    var {
      txtContent,
      txtTitle,
      txtSeoDescription,
      txtSeoTitle,
      image,
      txtSumary,
      txtPublished,
      txtCategories,
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

    this.props.updateBlog(
      blogId,
      {
        content: txtContent,
        title: txtTitle,
        image_url: image,
        category_id: category_id,
        summary: txtSumary,
        published: published,
        seo_description: txtSeoDescription,
        seo_title: txtSeoTitle,
        category_parent: this.state.categoryParent,
        category_children_ids: this.state.categoryChildrenIds,
        canonical_url,
        meta_robots_follow,
        meta_robots_index,
        post_url,
      },
      store_code
    );
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
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

  handleChangeCheckChild(id) {
    console.log("id: ", id);
    return this.state.categoryChildrenIds?.map((e) => e.id).indexOf(id) > -1;
  }

  handleChangeCheckParent(id) {
    return this.state.categoryParent?.map((e) => e.id).indexOf(id) > -1;
  }

  handleChangeChild = (categoryChild) => {
    console.log("categoryChild: ", categoryChild);

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
        ?.map((e) => e.id)
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
      ?.map((e) => e.id)
      .indexOf(categoryChild.id);
    if (indexHasChild !== -1) {
      var newListChild = this.state.categoryChildrenIds;
      newListChild?.splice(indexHasChild, 1);
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
      ?.map((e) => e.id)
      .indexOf(category.id);
    if (indexHas !== -1) {
      var newList = this.state.categoryParent;
      newList?.splice(indexHas, 1);
      this.setState({ categoryParent: newList });
      this.state.listCategory.forEach((category1) => {
        if (category1.id === category.id) {
          category1.categories_child.forEach((categoryChild1) => {
            const indexChild = this.state.categoryChildrenIds
              ?.map((e) => e.id)
              .indexOf(categoryChild1.id);
            if (indexChild !== -1) {
              const newChild = this.state.categoryChildrenIds?.splice(
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
                ?.map((e) => e.id)
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
      txtSeoDescription,
      txtSeoTitle,
      txtCategories,
      meta_robots_index,
      meta_robots_follow,
      canonical_url,
      post_url,
    } = this.state;
    var image = image == "" || image == null ? Env.IMG_NOT_FOUND : image;
    var { store_code } = this.props;
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
                    name="txtTitle"
                    placeholder="Nhập tên cửa hàng"
                    autoComplete="off"
                    onChange={this.onChange}
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
                  />
                </div>
                {/* 
                <div class="form-group">
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
              <SunEditor
                getSunEditorInstance={this.setEditorRef}
                onImageUploadBefore={handleImageUploadBefore}
                setContents={txtContent}
                showToolbar={true}
                onChange={(editorState) => {
                  this.getCodeViewContent();
                }}
                setDefaultStyle="height: auto;font-family: Arial;font-size: 14px;"
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
                    align,
                  ],
                  toolbar: {
                    codeView: "Code view",
                    tag_pre: "Code",
                    tag_blockquote: "Quote",
                    showBlocks: "Show blocks",
                  },
                  menu: {
                    code: "Code",
                  },

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
                      // "outdent",
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
                onSave={(e, g) => {
                  this.setState({
                    txtContent: e,
                  });
                }}
                onPaste={this.handleEditorChange}
              />
            </div>

            {getChannel() == IKITECH && (
              <div class="card mb-4">
                <div class="card-header title_content">Tối ưu SEO</div>
                <div class="card-body" style={{ padding: "0.8rem" }}>
                  <div class="row">
                    <SeoOption
                      txtSeoDescription={txtSeoDescription}
                      txtSeoTitle={txtSeoTitle}
                      handleDataFromContent={this.handleDataFromContent}
                      meta_robots_index={meta_robots_index}
                      meta_robots_follow={meta_robots_follow}
                      canonical_url={canonical_url}
                      post_url={post_url}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info   btn-sm">
              <i class="fas fa-save"></i> Lưu
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
        <ModalUpload store_code={this.props.store_code} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.UploadReducers.blogImg.blog_img,
    categories: state.categoryBReducers.categoryBlog.allCategoryB,
    blog: state.blogReducers.blog.blogID,
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
    updateBlog: (id, data, store_code) => {
      dispatch(blogAction.updateBlog(id, data, store_code));
    },
    fetchBlogId: (store_code, blogId) => {
      dispatch(blogAction.fetchBlogId(store_code, blogId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
