import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as Env from "../../../ultis/default";
import ItemHeaderTheme from "./ItemHeaderTheme";
import ItemBannerTheme from "./ItemBannerTheme";
import ItemProductTheme from "./ItemProductTheme";
import ItemNewsTheme from "./ItemNewsTheme.js";
import ItemFooterTheme from "./ItemFooterTheme.js";
import FormFooterHtml from "./FormFooterHtml";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SortableList, { SortableItem, SortableKnob } from "react-easy-sort";
import * as uploadApi from "../../../data/remote/upload";

import arrayMove from "array-move";
import {
  headerImg,
  bannerImg,
  productImg,
  blogImg,
  footerImg,
} from "./data.js";
import Slider from "react-slick";

import "./style.css";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import ModalDefaultReset from "../Home_Screen/ModalDefaultReset";
import styled from "styled-components";
import alertYesOrNo from "../../../ultis/alert";
import { compressed } from "../../../ultis/helpers";
import themeData from "../../../ultis/theme_data";

const OverviewStyles = styled.div`
  .price__display {
    .price__display__title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    .price__display__content {
      display: flex;
      column-gap: 15px;
      .price__display__item {
        display: flex;
        align-items: center;
        column-gap: 3px;
        label {
          margin-bottom: 0;
          cursor: pointer;
        }
        input {
          cursor: pointer;
        }
      }
    }
  }
  .gift__image {
    position: relative;
    width: 40px;
    img {
      width: 40px;
      height: 40px;
    }
    .has_image {
      z-index: 100;
      .background__hover {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.3);
        width: 40px;
        height: 40px;
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
    img {
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
class Custom_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header_type: null,
      banner_type: null,
      product_home_type: null,
      post_home_type: null,
      footer_type: null,
      html_footer: null,
      use_footer_html: false,
      tabId: 0,
      menuList: [],
      lastMenuList: [],
      hasChange: false,
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onChangeThemeDefault = (theme) => {
    this.setState({
      themeDefaultReset: theme,
    });
  };

  componentDidMount() {
    var theme = this.props.theme;

    if (theme == null || theme == "" || typeof theme.store_id == "undefined") {
    } else {
      var menuList = JSON.parse(theme.json_custom_menu);
      var newList = [];
      if (Array.isArray(menuList)) {
        menuList.forEach(function (value, index) {
          if (value.name != null) {
            newList.push({
              index: index,
              name: value.name,
              link_to: value.link_to,
              image: value.image,
            });
          }
        });
      }

      this.setState({
        store_id: theme.store_id,
        header_type: theme.header_type,
        banner_type: theme.banner_type,
        product_home_type: theme.product_home_type,
        post_home_type: theme.post_home_type,
        footer_type: theme.footer_type,
        use_footer_html: theme.is_use_footer_html,
        html_footer: theme.html_footer,
        is_use_custom_menu: theme.is_use_custom_menu,
        is_show_product_new: theme.is_show_product_new,
        is_show_product_top_sale: theme.is_show_product_top_sale,
        menuList: newList ?? [],
        lastMenuList: newList ?? [],
        hasChange: false,
      });
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (
      !shallowEqual(nextProps.theme, this.props.theme) ||
      nextProps.tabId != this.props.tabId
    ) {
      var theme = nextProps.theme;
      this.setState({
        store_id: theme.store_id,
        header_type: theme.header_type,
        banner_type: theme.banner_type,
        product_home_type: theme.product_home_type,
        post_home_type: theme.post_home_type,
        footer_type: theme.footer_type,
        use_footer_html: theme.is_use_footer_html,
        html_footer: theme.html_footer,
        is_use_custom_menu: theme.is_use_custom_menu,
      });

      setTimeout(
        function () {
          //Start the timer
          this.scrollToIndex(this.props);
        }.bind(this),
        200
      );
    }
  }

  scrollToIndex = (propsx) => {
    var theme = propsx != null ? propsx.theme : this.props.theme;
    const indexHeader = headerImg.findIndex(
      (header) => header.index === theme.header_type
    );
    const indexBanner = bannerImg.findIndex(
      (banner) => banner.index === theme.banner_type
    );
    const indexProduct = productImg.findIndex(
      (product) => product.index === theme.product_home_type
    );
    const indexBlog = blogImg.findIndex(
      (blog) => blog.index === theme.post_home_type
    );
    const indexFooter = footerImg.findIndex(
      (footer) => footer.index === theme.footer_type
    );

    if (this.sliderHeader != null) {
      this.sliderHeader.slickGoTo(indexHeader);
    }
    if (this.sliderBanner != null) {
      this.sliderBanner.slickGoTo(indexBanner);
    }
    if (this.sliderProduct != null) {
      this.sliderProduct.slickGoTo(indexProduct);
    }
    if (this.sliderNews != null) {
      this.sliderNews.slickGoTo(indexBlog);
    }
    if (this.sliderFooter != null) {
      this.sliderFooter.slickGoTo(indexFooter);
    }
  };

  getTabActive = (index) => {
    this.setState({ tabId: index });

    setTimeout(
      function () {
        //Start the timer
        this.scrollToIndex(this.props);
      }.bind(this),
      200
    );
  };

  chooseHeader = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.header_type = theme;

    this.props.updateTheme(store_code, form);
  };
  chooseBanner = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.banner_type = theme;

    this.props.updateTheme(store_code, form);
  };
  saveMenu = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.json_custom_menu = JSON.stringify(this.state.menuList);

    this.setState({
      lastMenuList: this.state.menuList ?? [],
      hasChange: false,
    });
    this.props.updateTheme(store_code, form);
  };
  chooseProduct = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.product_home_type = theme;

    this.props.updateTheme(store_code, form);
  };
  chooseNews = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.post_home_type = theme;

    this.props.updateTheme(store_code, form);
  };
  chooseFooter = (theme) => {
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.footer_type = theme;
    form.html_footer = "";
    form.is_use_footer_html = false;

    this.props.updateTheme(store_code, form);
  };

  setDefaultTheme = () => {
    this.props.chooseTheme(this.props.theme_default);
    this.props.onChangeThemeDefault(this.props.theme_default);
  };

  isSameDefault = () => {
    var {
      header_type,
      banner_type,
      product_home_type,
      post_home_type,
      footer_type,
      use_footer_html,
      tabId,
    } = this.state;

    var arr = [
      header_type,
      banner_type,
      product_home_type,
      post_home_type,
      footer_type,
    ];

    if (shallowEqual(this.props.theme_default?.arr_index_component, arr)) {
      return true;
    }

    return false;
  };
  onChangePriceShow = (e) => {
    const { store_code, updateTheme, theme } = this.props;
    const name = e.target.name;
    const checked = e.target.checked;
    const form = {
      ...theme,
      [name]: checked,
    };
    updateTheme(store_code, form);
  };

  onSortEnd = (oldIndex, newIndex) => {
    var menuList = arrayMove(this.state.menuList, oldIndex, newIndex);
    var listId = [];
    var listPosition = [];
    menuList.forEach((element, index) => {
      listId.push(element.id);
      listPosition.push(index + 1);
    });

    this.setState({
      menuList: menuList,
      hasChange: true,
    });
  };

  onRemoveItemMenu = (index) => {
    var newList = this.state.menuList;
    newList.splice(index, 1);
    this.setState({
      menuList: newList,
      hasChange: true,
    });
  };

  onChangeNameMenu = (index, va) => {
    var newList = this.state.menuList;
    newList[index].name = va;
    this.setState({
      menuList: newList,
      hasChange: true,
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
          var newList = this.state.menuList;
          newList[id].image = res.data.data;
          this.setState({
            menuList: newList,
            hasChange: true,
          });
        })
        .catch(function (error) {
          console.log("error: ", error);
        });
    }
  };

  handleRemoveImage = (id) => {
    var newList = this.state.menuList;
    newList[id].image = "";
    this.setState({
      menuList: newList,
      hasChange: true,
    });
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

  showDataMenus = (types) => {
    var { store_code } = this.props;
    var result = null;
    if (types.length > 0) {
      result = types.map((data, index) => {
        return (
          <SortableItem key={data.id}>
            <tr className="hover-product">
              <SortableKnob>
                <td>
                  <span>
                    <svg
                      width="16px"
                      height="16px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 10.75H5.99998C5.85218 10.751 5.70747 10.7077 5.58449 10.6257C5.46151 10.5437 5.3659 10.4268 5.30998 10.29C5.25231 10.1528 5.23673 10.0016 5.26523 9.85561C5.29372 9.70959 5.36499 9.57535 5.46998 9.46995L11.47 3.46995C11.6106 3.3295 11.8012 3.25061 12 3.25061C12.1987 3.25061 12.3894 3.3295 12.53 3.46995L18.53 9.46995C18.635 9.57535 18.7062 9.70959 18.7347 9.85561C18.7632 10.0016 18.7476 10.1528 18.69 10.29C18.6341 10.4268 18.5384 10.5437 18.4155 10.6257C18.2925 10.7077 18.1478 10.751 18 10.75ZM7.80998 9.24995H16.19L12 5.05995L7.80998 9.24995Z"
                        fill="#a6a4a4"
                      />
                      <path
                        d="M12 20.7499C11.9014 20.7504 11.8038 20.7311 11.7128 20.6934C11.6218 20.6556 11.5392 20.6 11.47 20.5299L5.46998 14.5299C5.36499 14.4245 5.29372 14.2903 5.26523 14.1442C5.23673 13.9982 5.25231 13.847 5.30998 13.7099C5.3659 13.5731 5.46151 13.4561 5.58449 13.3742C5.70747 13.2922 5.85218 13.2489 5.99998 13.2499H18C18.1478 13.2489 18.2925 13.2922 18.4155 13.3742C18.5384 13.4561 18.6341 13.5731 18.69 13.7099C18.7476 13.847 18.7632 13.9982 18.7347 14.1442C18.7062 14.2903 18.635 14.4245 18.53 14.5299L12.53 20.5299C12.4607 20.6 12.3782 20.6556 12.2872 20.6934C12.1962 20.7311 12.0985 20.7504 12 20.7499ZM7.80998 14.7499L12 18.9399L16.19 14.7499H7.80998Z"
                        fill="#a6a4a4"
                      />
                    </svg>
                  </span>
                  <span>{index + 1}</span>
                </td>
              </SortableKnob>
              <td>
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
                  {this.state.menuList[index].image ? (
                    <div className="has_image" style={{ position: "relative" }}>
                      <img
                        src={this.state.menuList[index].image}
                        alt="image_gift"
                      />
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
                  {this.state.menuList[index].image && (
                    <div
                      className="icon-close"
                      onClick={() => this.handleRemoveImage(index)}
                    >
                      {this.iconClose()}
                    </div>
                  )}
                </div>
              </td>
              <td>
                <input
                  required
                  type="text"
                  class="form-control"
                  id="threshold"
                  placeholder="Nhập tên menu..."
                  autoComplete="off"
                  value={data.name}
                  onChange={(v) => {
                    this.onChangeNameMenu(index, v.target.value);
                  }}
                  name="threshold"
                />
              </td>
              <td>
                <input
                  required
                  type="text"
                  class="form-control"
                  placeholder="Nhập đường dẫn VD: /san-pham"
                  value={data.link_to}
                  onChange={(v) => {
                    var newList = this.state.menuList;
                    newList[index].link_to = v.target.value;
                    this.setState({
                      menuList: newList,
                      hasChange: true,
                    });
                  }}
                />
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {/* <button
                    onClick={() => {}}
                    data-toggle="modal"
                    data-target="#updateType"
                    class={`btn btn-outline-warning btn-sm `}
                  >
                    <i class="fa fa-edit"></i> Sửa
                  </button> */}

                  <div
                    onClick={() => {
                      alertYesOrNo("Bạn muốn xóa menu này?", () => {
                        this.onRemoveItemMenu(index);
                      });
                    }}
                    data-toggle="modal"
                    data-target="#removeType"
                    class={`btn btn-outline-danger btn-sm`}
                  >
                    <i class="fa fa-trash"></i> Xóa
                  </div>
                </div>
              </td>
            </tr>
          </SortableItem>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    const setting = {
      dots: true,
      autoplay: false,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,

      arrow: true,
      dotsClass: "slick-dots slick-thumb",
    };
    const settingBanner = {
      dots: false,
      autoplay: false,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,

      arrow: true,
      dotsClass: "slick-dots slick-thumb",
    };
    var {
      header_type,
      banner_type,
      product_home_type,
      post_home_type,
      footer_type,
      use_footer_html,
      html_footer,
      tabId,
      is_use_custom_menu,
      menuList,
      lastMenuList,
    } = this.state;
    var { badges, store_code, theme } = this.props;

    var { is_show_product_new, is_show_product_top_sale } = this.state;
    return (
      <OverviewStyles className="overview " style={{ marginLeft: "25px" }}>
        <div className="row justify-content-between  align-items-center">
          <button
            style={{ marginRight: "10px", marginBottom: 25, marginTop: 10 }}
            type="button"
            onClick={this.props.goBack}
            class="btn btn-warning  btn-sm"
          >
            <i class="fas fa-arrow-left"></i>&nbsp;Quay lại
          </button>

          {
            this.isSameDefault() == false && (
              <button
                type="button"
                class="btn btn-primary-no-background btn-sm"
                style={{
                  color: "#0d6efd",
                  "border-color": "#0d6efd",
                }}
                onClick={() => {
                  this.onChangeThemeDefault(this.props.theme_default);
                }}
                data-toggle="modal"
                data-target="#modalDefaultReset"
              >
                <i class="fas fa-undo"></i>
                <span class="text">&nbsp;Khôi phục mặc định</span>
              </button>
            )
            //  <a
            //   onClick={() => {

            //     this.onChangeThemeDefault(this.props.theme_default)
            //   }}
            //   data-toggle="modal"
            //   data-target="#modalDefaultReset"
            //   style={{
            //     color: "#0d6efd"
            //   }}>Khôi phục mặc định</a>
          }
        </div>

        <Tabs defaultIndex={0} onSelect={(index) => this.getTabActive(index)}>
          <div className="row">
            <div
              className="col-2 col-2-nav "
              style={{
                width: "100%",
                height: "fit-content",
              }}
            >
              <TabList>
                <Tab
                  style={{
                    width: "100%",
                    height: "60px",
                    border: "1px solid #bcbcbc",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "none",
                  }}
                >
                  <h6 style={{ fontWeight: "bold" }}>1.</h6>
                  <p
                    style={{
                      color: "black",

                      paddingTop: "9px",
                      paddingLeft: "6px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Header
                  </p>
                  {tabId === 0 ? (
                    <i
                      class="fa fa-caret-right fa-lg"
                      aria-hidden="true"
                      style={{
                        marginRight: 0,
                        marginLeft: "auto",
                        marginBottom: "3px",
                      }}
                    ></i>
                  ) : (
                    ""
                  )}
                </Tab>
                <Tab
                  style={{
                    width: "100%",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #bcbcbc",
                    borderBottom: "none",
                  }}
                >
                  <h6 style={{ fontWeight: "bold" }}>2.</h6>
                  <p
                    style={{
                      color: "black",

                      paddingTop: "9px",
                      paddingLeft: "6px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Banner
                  </p>
                  {tabId === 1 ? (
                    <i
                      class="fa fa-caret-right fa-lg"
                      aria-hidden="true"
                      style={{
                        marginRight: 0,
                        marginLeft: "auto",
                        marginBottom: "3px",
                      }}
                    ></i>
                  ) : (
                    ""
                  )}
                </Tab>
                <Tab
                  style={{
                    width: "100%",
                    height: "60px",
                    border: "1px solid #bcbcbc",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "none",
                  }}
                >
                  <h6 style={{ fontWeight: "bold" }}>3.</h6>
                  <p
                    style={{
                      color: "black",

                      paddingTop: "9px",
                      paddingLeft: "6px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Product
                  </p>
                  {tabId === 2 ? (
                    <i
                      class="fa fa-caret-right fa-lg"
                      aria-hidden="true"
                      style={{
                        marginRight: 0,
                        marginLeft: "auto",
                        marginBottom: "3px",
                      }}
                    ></i>
                  ) : (
                    ""
                  )}
                </Tab>

                <Tab
                  style={{
                    width: "100%",
                    height: "60px",
                    border: "1px solid #bcbcbc",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "none",
                  }}
                >
                  <h6 style={{ fontWeight: "bold" }}>4.</h6>
                  <p
                    style={{
                      color: "black",

                      paddingTop: "9px",
                      paddingLeft: "6px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Tin tức
                  </p>
                  {tabId === 3 ? (
                    <i
                      class="fa fa-caret-right fa-lg"
                      aria-hidden="true"
                      style={{
                        marginRight: 0,
                        marginLeft: "auto",
                        marginBottom: "3px",
                      }}
                    ></i>
                  ) : (
                    ""
                  )}
                </Tab>
                <Tab
                  style={{
                    width: "100%",
                    height: "60px",
                    border: "1px solid #bcbcbc",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h6 style={{ fontWeight: "bold" }}>5.</h6>
                  <p
                    style={{
                      color: "black",

                      paddingTop: "9px",
                      paddingLeft: "6px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Footer
                  </p>
                  {tabId === 4 ? (
                    <i
                      class="fa fa-caret-right fa-lg"
                      aria-hidden="true"
                      style={{
                        marginRight: 0,
                        marginLeft: "auto",
                        marginBottom: "3px",
                      }}
                    ></i>
                  ) : (
                    ""
                  )}
                </Tab>
              </TabList>
            </div>
            <div
              className="col-10 col-10-wrapper"
              style={{
                border: "none",
              }}
            >
              <form role="form">
                <div class="box-body">
                  <TabPanel>
                    <div class=" ml-3" style={{ height: "30px" }}>
                      <input
                        type="checkbox"
                        style={{ transform: "scale(1.5)" }}
                        checked={is_use_custom_menu}
                        onChange={(e) => {
                          let checkbox = e.target;
                          var form = { ...this.props.theme };

                          if (checkbox.checked) {
                            this.setState({
                              is_use_custom_menu: true,
                            });

                            form.is_use_custom_menu = true;
                            this.props.updateTheme(store_code, form);
                          } else {
                            this.setState({
                              is_use_custom_menu: false,
                            });
                            form.is_use_custom_menu = false;
                            this.props.updateTheme(store_code, form);
                          }
                        }}
                      />
                      <label style={{ marginLeft: "7px" }} for="defaultCheck1">
                        Sử dụng Menu tùy chỉnh
                      </label>
                    </div>
                    {is_use_custom_menu && (
                      <div class="card mb-4">
                        <table class="table table-border">
                          <thead>
                            <tr>
                              <th>STT</th>
                              <th>Icon</th>
                              <th style={{ width: 150 }}>Tên</th>
                              <th>Link tới</th>
                              <th style={{ width: 200 }}>Hành động</th>
                            </tr>
                          </thead>

                          <SortableList
                            onSortEnd={this.onSortEnd}
                            className="resp-table-body"
                            draggedItemClassName="dragged"
                          >
                            {this.showDataMenus(menuList)}
                          </SortableList>
                        </table>

                        <div>
                          <button
                            style={{
                              marginRight: "10px",
                              marginBottom: 25,
                              marginTop: 10,
                            }}
                            type="button"
                            onClick={() => {
                              var newList = menuList;
                              newList.push({
                                name: "Tên menu",
                                link_to: "",
                              });
                              this.setState({
                                menuList: newList,
                                hasChange: true,
                              });
                            }}
                            class="btn btn-primary  btn-sm"
                          >
                            <i class="fas fa-plus"></i>
                          </button>

                          <button
                            style={{
                              marginRight: "10px",
                              marginBottom: 25,
                              marginTop: 10,
                            }}
                            disabled={this.state.hasChange ? false : true}
                            type="button"
                            onClick={this.saveMenu}
                            class={
                              this.state.hasChange
                                ? "btn btn-success btn-sm"
                                : "btn btn-secondary btn-sm"
                            }
                          >
                            <i class="fas fa-save"></i> Lưu
                          </button>
                        </div>
                      </div>
                    )}

                    <Slider
                      {...setting}
                      ref={(sliderHeader) => (this.sliderHeader = sliderHeader)}
                    >
                      {headerImg.map((v, i) => (
                        <ItemHeaderTheme
                          badges={badges}
                          chooseHeader={this.chooseHeader}
                          header_type={header_type}
                          indexHeader={i}
                          v={v}
                        />
                      ))}
                    </Slider>
                  </TabPanel>
                  <TabPanel>
                    <Slider
                      {...settingBanner}
                      ref={(sliderBanner) => (this.sliderBanner = sliderBanner)}
                    >
                      {bannerImg.map((v, i) => (
                        <ItemBannerTheme
                          badges={badges}
                          indexBanner={i}
                          chooseBanner={this.chooseBanner}
                          banner_type={banner_type}
                          S
                          v={v}
                        />
                      ))}
                    </Slider>
                  </TabPanel>
                  <TabPanel>
                    <div className="price__display">
                      <div className="price__display__title">
                        Tùy chọn hiển thị
                      </div>
                      <div className="price__display__content">
                        <div className="price__display__item">
                          <input
                            type="checkbox"
                            style={{ transform: "scale(1.5)" }}
                            checked={is_show_product_new}
                            onChange={(e) => {
                              let checkbox = e.target;
                              var form = { ...this.props.theme };

                              if (checkbox.checked) {
                                this.setState({
                                  is_show_product_new: true,
                                });

                                form.is_show_product_new = true;
                                this.props.updateTheme(store_code, form);
                              } else {
                                this.setState({
                                  is_show_product_new: false,
                                });
                                form.is_show_product_new = false;
                                this.props.updateTheme(store_code, form);
                              }
                            }}
                          />
                          <label
                            style={{ marginLeft: "7px" }}
                            for="defaultCheck1"
                          >
                            Cho phép hiển thị sản phẩm mới
                          </label>
                        </div>

                        <div className="price__display__item">
                          <input
                            type="checkbox"
                            style={{ transform: "scale(1.5)" }}
                            checked={is_show_product_top_sale}
                            onChange={(e) => {
                              let checkbox = e.target;
                              var form = { ...this.props.theme };

                              if (checkbox.checked) {
                                this.setState({
                                  is_show_product_top_sale: true,
                                });

                                form.is_show_product_top_sale = true;
                                this.props.updateTheme(store_code, form);
                              } else {
                                this.setState({
                                  is_show_product_top_sale: false,
                                });
                                form.is_show_product_top_sale = false;
                                this.props.updateTheme(store_code, form);
                              }
                            }}
                          />
                          <label
                            style={{ marginLeft: "7px" }}
                            for="defaultCheck1"
                          >
                            Cho phép hiển thị sản phẩm nổi bật
                          </label>
                        </div>
                      </div>
                      <div style={{ height: 15 }}></div>
                      <div className="price__display__title">
                        Hiển thị bộ đếm
                      </div>
                      <div className="price__display__content">
                        <div className="price__display__item">
                          <input
                            style={{ transform: "scale(1.5)" }}
                            type="checkbox"
                            name="is_show_product_sold"
                            id="is_show_product_sold"
                            value={theme.is_show_product_sold}
                            checked={theme.is_show_product_sold}
                            onChange={this.onChangePriceShow}
                          />
                          <label
                            htmlFor="is_show_product_sold"
                            style={{ marginLeft: "7px" }}
                          >
                            Chỉ hiển thị đã bán
                          </label>
                        </div>
                        <div className="price__display__item">
                          <input
                            style={{ transform: "scale(1.5)" }}
                            type="checkbox"
                            name="is_show_product_view"
                            id="price__viewed"
                            value={theme.is_show_product_view}
                            checked={theme.is_show_product_view}
                            onChange={this.onChangePriceShow}
                          />
                          <label
                            htmlFor="is_show_product_view"
                            style={{ marginLeft: "7px" }}
                          >
                            Chỉ hiển thị đã xem
                          </label>
                        </div>
                        <div className="price__display__item">
                          <input
                            style={{ transform: "scale(1.5)" }}
                            type="checkbox"
                            name="is_show_product_count_stars"
                            id="price__all"
                            value={theme.is_show_product_count_stars}
                            checked={theme.is_show_product_count_stars}
                            onChange={this.onChangePriceShow}
                          />
                          <label
                            htmlFor="is_show_product_count_stars"
                            style={{ marginLeft: "7px" }}
                          >
                            Hiển thị số lượng đánh giá sao
                          </label>
                        </div>
                      </div>
                    </div>
                    <Slider
                      {...setting}
                      ref={(sliderProduct) =>
                        (this.sliderProduct = sliderProduct)
                      }
                    >
                      {productImg.map((v, i) => (
                        <ItemProductTheme
                          badges={badges}
                          indexProduct={i}
                          chooseProduct={this.chooseProduct}
                          product_home_type={product_home_type}
                          v={v}
                        />
                      ))}
                    </Slider>
                  </TabPanel>
                  <TabPanel>
                    <Slider
                      {...setting}
                      ref={(sliderNews) => (this.sliderNews = sliderNews)}
                    >
                      {blogImg.map((v, i) => (
                        <ItemNewsTheme
                          badges={badges}
                          indexNews={i}
                          chooseNews={this.chooseNews}
                          post_home_type={post_home_type}
                          v={v}
                        />
                      ))}
                    </Slider>
                  </TabPanel>
                  <TabPanel>
                    <div class=" ml-3" style={{ height: "30px" }}>
                      <input
                        type="checkbox"
                        style={{ transform: "scale(1.5)" }}
                        checked={use_footer_html}
                        onChange={(e) => {
                          let checkbox = e.target;
                          var form = { ...this.props.theme };

                          if (checkbox.checked) {
                            this.setState({
                              use_footer_html: true,
                            });

                            form.is_use_footer_html = true;
                            this.props.updateTheme(store_code, form);
                          } else {
                            this.setState({
                              use_footer_html: false,
                            });
                            form.is_use_footer_html = false;
                            this.props.updateTheme(store_code, form);
                          }
                        }}
                      />
                      <label style={{ marginLeft: "7px" }} for="defaultCheck1">
                        Sử dụng footer tùy chỉnh
                      </label>
                    </div>

                    {!use_footer_html ? (
                      <Slider
                        {...setting}
                        ref={(sliderFooter) =>
                          (this.sliderFooter = sliderFooter)
                        }
                      >
                        {footerImg.map((v, i) => (
                          <ItemFooterTheme
                            badges={badges}
                            indexFooter={i}
                            chooseFooter={this.chooseFooter}
                            footer_type={footer_type}
                            v={v}
                          />
                        ))}
                      </Slider>
                    ) : (
                      <div class="card shadow mb-4">
                        <div class="card-body">
                          <section class="content">
                            <div class="row">
                              <div class="col-md-12 col-xs-12">
                                <div class="box">
                                  <FormFooterHtml
                                    html_footer={html_footer}
                                    theme={this.props.theme}
                                    store_code={this.props.store_code}
                                  />
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    )}
                  </TabPanel>
                </div>
              </form>

              <ModalDefaultReset
                theme={this.state.themeDefaultReset}
                resetTheme={this.props.resetTheme}
              />
            </div>
          </div>
        </Tabs>
      </OverviewStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    badges: state.badgeReducers.allBadge,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateTheme: (store_code, theme) => {
      dispatch(themeAction.updateTheme(store_code, theme));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Custom_Screen);
