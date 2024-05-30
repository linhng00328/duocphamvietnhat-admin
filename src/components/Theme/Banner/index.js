import React, { Component } from "react";

import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import ModalRemove from "./ModalRemove";
import ModalUpdate from "./ModalUpdate";
import ModalCreate from "./ModalCreate";
import * as Env from "../../../ultis/default";
import { bannerImg } from "../Custom_Screen/data.js";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel_app_images: [],
      modalremove: {
        title: "",
        id: "",
      },
      modalupdate: {
        title: "",
        link_to: "",
        id: "",
        image_url: "",
      },
    };
  }

  componentDidMount() {
    var theme = this.props.theme;
    if (theme == null || theme == "") {
    } else {
      this.setState({
        carousel_app_images:
          theme.carousel_app_images == "null" ||
          theme.carousel_app_images == null
            ? []
            : theme.carousel_app_images,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(nextProps.theme, this.props.them) ||
      nextProps.tabId != this.props.tabId
    ) {
      var theme = nextProps.theme;
      this.setState({
        carousel_app_images:
          theme.carousel_app_images == "null" ||
          theme.carousel_app_images == null
            ? []
            : theme.carousel_app_images,
      });
    }
  }

  destroyBanner = (e, id, title) => {
    this.setState({ modalremove: { title: "banner", id: id, _title: title } });
  };

  updateBanner = (e, id, title, img, link_to) => {
    this.setState({
      modalupdate: {
        title: "banner",
        id: id,
        _title: title,
        image_url: img,
        link_to,
      },
    });
  };
  showBanners = (banners) => {
    var result = null;
    if (typeof banners == "undefined") {
      return result;
    }
    if (banners.length > 0) {
      result = banners.map((data, index) => {
        var img = data.image_url || Env.IMG_NOT_FOUND;

        return (
          <tr>
            <td>{index + 1}</td>
            <td>{data.title == null ? "Trống" : data.title}</td>

            <td>
              <img
                style={{
                  objectFit: "cover",
                  width: "300px",
                  borderRadius: "0px",
                }}
                src={img}
                class="img-responsive"
                width="90px"
                height="95px"
                alt="Image"
              />
            </td>
            <td className="btn-voucher">
              <button
                type="button"
                onClick={(e) =>
                  this.updateBanner(e, index, data.title, img, data.link_to)
                }
                data-toggle="modal"
                data-target="#updateModal"
                class="btn btn-warning btn-sm"
              >
                <i class="fa fa-edit"></i> Sửa
              </button>
              <button
                style={{ marginLeft: "10px" }}
                type="button"
                onClick={(e) => this.destroyBanner(e, index, data.title)}
                data-toggle="modal"
                data-target="#removeModal"
                class="btn btn-danger btn-sm"
              >
                <i class="fa fa-trash"></i> Xóa
              </button>
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  // onSave = (e) => {
  //     e.preventDefault();
  //     var { store_code } = this.props
  //     var theme = this.state
  //     var form = {

  //         carousel_app_images: "",
  //     }
  //     this.props.updateTheme(store_code, form);
  // }
  render() {
    var { store_code, theme } = this.props;
    var { carousel_app_images } = this.state;
    var banner = bannerImg.filter((v) => v.index === theme.banner_type)[0];

    return (
      <div className="support">
        <button
          style={{ float: "right" }}
          data-toggle="modal"
          data-target="#createModal"
          class="btn btn-info btn-icon-split btn-sm"
        >
          <span class="icon text-white-50">
            <i class="fas fa-plus"></i>
          </span>
          <span class="text">Thêm Banner</span>
        </button>
        <form role="form" onSubmit={this.onSave}>
          <div class="box-body">
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            ></div>

            <div className="form-group">
              <label htmlFor="name">
                Bạn đang chọn Banner {banner.index} với tỷ lệ kích thước là:{" "}
                {banner.width} x {banner.height} (px){" "}
              </label>

              <div class="table-responsive">
                <table class="table table-hover table-border">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tiêu đề</th>
                      <th>Hình ảnh</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>{this.showBanners(carousel_app_images)}</tbody>
                </table>
              </div>
            </div>
          </div>
        </form>

        <ModalCreate
          theme={theme}
          carousel_app_images={carousel_app_images}
          store_code={store_code}
        />
        <ModalUpdate
          theme={theme}
          carousel_app_images={carousel_app_images}
          modal={this.state.modalupdate}
          store_code={store_code}
        />
        <ModalRemove
          theme={theme}
          carousel_app_images={carousel_app_images}
          modal={this.state.modalremove}
          store_code={store_code}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.themeReducers.theme,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateTheme: (store_code, theme) => {
      dispatch(themeAction.updateTheme(store_code, theme));
    },
    fetchTheme: (store_code) => {
      dispatch(themeAction.fetchTheme(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
