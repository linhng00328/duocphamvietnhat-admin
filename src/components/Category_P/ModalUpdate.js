import React, { Component } from "react";
import * as categoryPAction from "../../actions/category_product";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as helper from "../../ultis/helpers";
import * as Env from "../../ultis/default";
import { compressed } from "../../ultis/helpers";
import { isEmpty } from "../../ultis/helpers";
import * as Types from "../../constants/ActionType";
import themeData from "../../ultis/theme_data";
import Upload from "../Upload";
import * as uploadApi from "../../data/remote/upload";
import styled from "styled-components";
import SunEditor from "suneditor-react";
import Select from "react-select";

import "suneditor/dist/css/suneditor.min.css";
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
import { handleImageUploadBefore } from "../../ultis/sun_editor";
import imageGallery from "../imageGallery";
import { getApiImageStore } from "../../constants/Config";
import * as userLocalApi from "../../data/local/user";

const OverviewStyles = styled.div`
  .gift__image {
    position: relative;
    width: 130px;
    height: 130px;
    img {
      width: 130px;
      height: 130px;
    }
    .has_image {
      z-index: 100;
      .background__hover {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.3);
        width: 130px;
        height: 130px;
        top: 0;
        display: none;
        align-items: center;
        justify-content: center;
      }
      :hover .background__hover {
        display: flex;
      }
    }
    .icon-close {
      position: absolute;
      top: -7px;
      right: -12px;
      z-index: 101;
      cursor: pointer;
    }

    .gift__background {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 10;
      cursor: pointer;
      label {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }
  .drop-file-input__label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: 100%;
    height: 100%;
    border: 1px solid red;
    border-radius: 8px;
    align-items: center;
    padding: 40px img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
    p {
      text-align: center;
      color: #8c8c8c;
      padding: 10px;
      font-size: 12px;
      margin-bottom: 0;
    }
    span {
      position: relative;
      svg {
        width: 28px;
        height: 28px;
      }
      & > span {
        position: absolute;
        margin-left: 2px;
        svg {
          width: 8px;
          height: 8px;
        }
      }
    }
  }
`;

class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      id: "",
      image: "",
      fileUpload: null,
      isShowHome: false,
      bannerImages: [],
      mainImage: "",
      bannerLinks: ["", ""],
      txtContent: "",
      meta_robots_index: "noindex",
      meta_robots_follow: "nofollow",
      canonical_url: "",
      product_category_url: "",
      txtSeoDescription: "",
      txtSeoTitle: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var category = nextProps.modal;
      console.log("category111", category);
      this.setState({
        txtName: category.name,
        id: category.id,
        image: category.image_url,
        isShowHome: category.is_show_home,
        bannerImages:
          category.banner_ads && category.banner_ads.length
            ? category.banner_ads.map((item) => item.image)
            : [],
        mainImage: category.image_url,
        bannerLinks:
          category.banner_ads && category.banner_ads.length
            ? category.banner_ads.map((item) => item.link)
            : ["", ""],
        txtContent: category.description,
        meta_robots_index: {
          label: category.meta_robots_index == "index" ? "Index" : "NoIndex",
          value: category.meta_robots_index,
        },
        meta_robots_follow: {
          label:
            category.meta_robots_follow == "follow" ? "Follow" : "NoFollow",
          value: category.meta_robots_follow,
        },
        canonical_url: category.canonical_url ?? "",
        product_category_url: category.product_category_url ?? "",
        txtSeoDescription: category.seo_description ?? "",
        txtSeoTitle: category.seo_title ?? "",
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(nextProps.category_product, this.props.category_product) ||
      nextState.fileUpload == ""
    ) {
      window.$(".modal").modal("hide");
      window.$("#file-category-product-update").fileinput("clear");
      this.setState({
        txtName: "",
        fileUpload: null,
        isShowHome: false,
        mainImage: "",
        txtContent: "",
        meta_robots_index: "noindex",
        meta_robots_follow: "nofollow",
        canonical_url: "",
        product_category_url: "",
        txtSeoDescription: "",
        txtSeoTitle: "",
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

  handleEditorChange = (editorState) => {
    console.log("editorState: ", editorState.srcElement.innerHTML);
    this.setState({
      txtContent: editorState.srcElement.innerHTML,
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
          content: "Tên danh mục không được để trống",
        },
      });
      return;
    }
    let bannerAds = this.state.bannerImages.length
      ? this.state.bannerImages.map((item, index) => ({
          image: item,
          link: this.state.bannerLinks[index] || "",
        }))
      : [];
    var category = this.state;
    const params = {
      name: this.state.txtName,
      is_show_home: this.state.isShowHome,
      banner_ads: bannerAds,
      image_url: this.state.mainImage,
      description: this.state.txtContent,
      meta_robots_index: this.state.meta_robots_index?.value,
      meta_robots_follow: this.state.meta_robots_follow?.value,
      canonical_url: this.state.canonical_url,
      category_url: this.state.product_category_url,
      txtSeoDescription: this.state.txtSeoDescription,
      txtSeoTitle: this.state.txtSeoTitle,
    };
    this.props.updateCategoryP(this.props.store_code, category.id, params);
  };
  componentDidMount() {
    var _this = this;

    window
      .$("#file-category-product-update")
      .on("fileloaded", function (event, file) {
        _this.setState({ fileUpload: file });
      });
    window
      .$("#file-category-product-update")
      .on("fileremoved", function (event, id, index) {
        _this.setState({ fileUpload: null });
      });

    helper.loadFileInput("file-category-product-update");
  }

  setBannerImages = (images) => {
    this.setState({ bannerImages: images });
  };

  onChangeLink = (e, index) => {
    var newBannerLinks = this.state.bannerLinks;
    newBannerLinks[index] = e.target.value;
    console.log("newBannerLinks: ", newBannerLinks);
    this.setState({ bannerLinks: newBannerLinks });
  };

  renderBannerImages = () => {
    const { bannerImages } = this.state;
    return (
      <div className="group-banner-image">
        <Upload
          isShowDefault={true}
          multiple
          setFiles={this.setBannerImages}
          files={bannerImages}
          images={this.state.bannerImages}
          limit={2}
          imageType="CATEGORY"
        />
        <div style={{ marginLeft: "162px", display: "flex", gap: "16px" }}>
          {bannerImages && bannerImages.length
            ? bannerImages.map((item, index) => {
                return (
                  <div style={{ width: "290px", marginTop: "12px" }}>
                    <label>Link ảnh {index + 1}:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="txtName"
                      placeholder={`Đường dẫn ảnh ${index + 1}`}
                      autoComplete="off"
                      value={this.state.bannerLinks[index]}
                      onChange={(e) => this.onChangeLink(e, index)}
                      name="txtName"
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  };

  handleRemoveImage = () => {
    this.setState({
      mainImage: "",
    });
  };

  handleUploadImage = async (e, id) => {
    const file = e.target.files;
    if (file.length > 0) {
      const newFile = file[0];
      const fd = new FormData();
      fd.append("image", await compressed(newFile));
      uploadApi
        .upload(fd)
        .then((res) => {
          this.setState({
            mainImage: res.data.data,
          });
        })
        .catch(function (error) {
          console.log("error: ", error);
        });
    }
  };

  iconUpload = () => {
    return (
      <div className="drop-file-input__label">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="53"
            height="39"
            viewBox="0 0 53 39"
          >
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <g
                stroke={themeData().backgroundColor}
                strokeWidth="2"
                transform="translate(-255 -179)"
              >
                <g transform="translate(132 122)">
                  <path d="M150.631 87.337c-5.755 0-10.42-4.534-10.42-10.127 0-5.593 4.665-10.127 10.42-10.127s10.42 4.534 10.42 10.127c0 5.593-4.665 10.127-10.42 10.127m10.42-24.755l-2.315-4.501h-16.21l-2.316 4.5h-11.579s-4.631 0-4.631 4.502v22.505c0 4.5 4.631 4.5 4.631 4.5h41.684s4.631 0 4.631-4.5V67.083c0-4.501-4.631-4.501-4.631-4.501h-9.263z"></path>
                </g>
              </g>
            </g>
          </svg>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 20 21"
            >
              <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <g
                  fill={themeData().backgroundColor}
                  transform="translate(-161 -428)"
                >
                  <g transform="translate(132 398)">
                    <g transform="translate(16.648 17.048)">
                      <g transform="rotate(-180 16.142 16.838)">
                        <rect
                          width="2.643"
                          height="19.82"
                          x="8.588"
                          y="0"
                          rx="1.321"
                        ></rect>
                        <path
                          d="M9.91 0c.73 0 1.321.592 1.321 1.321v17.177a1.321 1.321 0 01-2.643 0V1.321C8.588.591 9.18 0 9.91 0z"
                          transform="rotate(90 9.91 9.91)"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </span>
        </span>
        <p>Chọn ảnh hoặc kéo và thả</p>
      </div>
    );
  };

  iconEdit = () => {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1_5)">
          <path
            d="M8.25 3H3C2.60218 3 2.22064 3.15803 1.93934 3.43934C1.65803 3.72065 1.5 4.10218 1.5 4.5V15C1.5 15.3978 1.65803 15.7793 1.93934 16.0606C2.22064 16.342 2.60218 16.5 3 16.5H13.5C13.8978 16.5 14.2793 16.342 14.5606 16.0606C14.842 15.7793 15 15.3978 15 15V9.75"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.875 1.87498C14.1733 1.57662 14.578 1.40899 15 1.40899C15.422 1.40899 15.8267 1.57662 16.125 1.87498C16.4233 2.17336 16.591 2.57803 16.591 2.99998C16.591 3.42194 16.4233 3.82662 16.125 4.12498L9 11.25L6 12L6.75 9L13.875 1.87498Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_5">
            <rect width="18" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  };

  iconClose = () => {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="8" fill="#D9D9D9" />
        <path
          d="M11.1441 10.4809C11.2322 10.5689 11.2817 10.6884 11.2817 10.8129C11.2817 10.9374 11.2322 11.0569 11.1441 11.1449C11.0561 11.233 10.9366 11.2825 10.8121 11.2825C10.6876 11.2825 10.5681 11.233 10.4801 11.1449L7.99998 8.66407L5.51912 11.1441C5.43106 11.2322 5.31163 11.2817 5.18709 11.2817C5.06256 11.2817 4.94312 11.2322 4.85506 11.1441C4.767 11.0561 4.71753 10.9367 4.71753 10.8121C4.71753 10.6876 4.767 10.5681 4.85506 10.4801L7.33592 8.00001L4.85584 5.51915C4.76778 5.43109 4.71831 5.31165 4.71831 5.18712C4.71831 5.06258 4.76778 4.94315 4.85584 4.85509C4.9439 4.76703 5.06334 4.71755 5.18787 4.71755C5.31241 4.71755 5.43184 4.76703 5.5199 4.85509L7.99998 7.33595L10.4808 4.85469C10.5689 4.76663 10.6883 4.71716 10.8129 4.71716C10.9374 4.71716 11.0568 4.76663 11.1449 4.85469C11.233 4.94276 11.2824 5.06219 11.2824 5.18673C11.2824 5.31126 11.233 5.4307 11.1449 5.51876L8.66405 8.00001L11.1441 10.4809Z"
          fill="#697A8D"
        />
      </svg>
    );
  };

  renderUploadMainImage = (index) => {
    return (
      <OverviewStyles>
        <div className="gift__image">
          <div className="gift__background">
            <label>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => this.handleUploadImage(e, index)}
              />
            </label>
          </div>
          {this.state.mainImage ? (
            <div className="has_image" style={{ position: "relative" }}>
              <img src={this.state.mainImage} alt="image_gift" />
              <div className="background__hover">
                {this.iconEdit()}
                <div className="gift__background">
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => this.handleUploadImage(e, index)}
                    />
                  </label>
                </div>
              </div>
            </div>
          ) : (
            this.iconUpload()
          )}
          {this.state.mainImage && (
            <div
              className="icon-close"
              onClick={() => this.handleRemoveImage(index)}
            >
              {this.iconClose()}
            </div>
          )}
        </div>
      </OverviewStyles>
    );
  };

  render() {
    var {
      txtName,
      image,
      isShowHome,
      txtContent,
      txtSeoDescription,
      txtSeoTitle,
    } = this.state;
    var image = image == null || image == "" ? Env.IMG_NOT_FOUND : image;
    var { store_code } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 class="modal-title">Chỉnh sửa danh mục</h4>

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
              <div
                class="modal-body"
                style={{
                  maxHeight: "100%",
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
              >
                <div class="form-group">
                  <label for="product_name">Tên danh mục</label>
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
                  <div
                    class="form-check"
                    style={{ marginTop: "10px", padding: "0" }}
                  >
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        name="even"
                        onChange={() =>
                          this.setState({ isShowHome: !isShowHome })
                        }
                        checked={isShowHome}
                      />{" "}
                      Hiển thị sản phẩm ở trang chủ
                    </label>
                  </div>
                </div>
                <div className="" style={{ display: "flex" }}>
                  <div class="form-group">
                    <label for="product_name">Hình ảnh</label>
                    {this.renderUploadMainImage()}
                  </div>
                </div>
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
                <div class="form-group">
                  <label for="product_name">Nội dung bài viết</label>
                  <SunEditor
                    onImageUploadBefore={handleImageUploadBefore}
                    setContents={txtContent}
                    showToolbar={true}
                    // onChange={this.handleEditorChange}
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
                      console.log("e", e);
                      console.log("g", g);
                      this.setState({
                        txtContent: e,
                      });
                    }}
                    onInput={this.handleEditorChange}
                    onPaste={this.handleEditorChange}
                    onFocus={(e) => {
                      this.setState({
                        txtContent: e.target.innerHTML,
                      });
                    }}
                  />
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
                      name="product_category_url"
                      onChange={this.onChange}
                      value={this.state.product_category_url}
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
                {isShowHome && (
                  <div>
                    <p style={{ fontWeight: "600" }}>
                      Thêm ảnh banner(Giới hạn 2 ảnh):
                    </p>
                    <div>{this.renderBannerImages()}</div>
                  </div>
                )}
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
    updateCategoryP: (store_code, id, data) => {
      dispatch(categoryPAction.updateCategoryP(store_code, id, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdate);
