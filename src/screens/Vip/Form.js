import React, { Component } from "react";
import { connect } from "react-redux";
import ModalUpload from "./ModalUpload";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as Env from "../../ultis/default";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeUpload: "",

      isLoading: false,
      url_logo_image: "",
      url_logo_small_image: "",
      url_login_image: null,
      user_copyright: "",
      customer_copyright: "",
      url_customer_copyright: "",
      trader_mark_name: "",
    };
  }

  onChangeUpload = (type) => {
    this.setState({
      typeUpload: type,
    });
  };
  componentDidMount() {
    if (typeof this.props.vip_user.url_logo_image != "undefined") {
      this.setState({
        url_logo_image: this.props.vip_user.url_logo_image,
        url_logo_small_image: this.props.vip_user.url_logo_small_image,
        url_login_image: this.props.vip_user.url_login_image,
        user_copyright: this.props.vip_user.user_copyright,
        customer_copyright: this.props.vip_user.customer_copyright,
        url_customer_copyright: this.props.vip_user.url_customer_copyright,
        trader_mark_name: this.props.vip_user.trader_mark_name,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.vip_user, this.props.vip_user)) {
      this.setState({
        url_logo_image: nextProps.vip_user.url_logo_image,
        url_logo_small_image: nextProps.vip_user.url_logo_small_image,
        url_login_image: nextProps.vip_user.url_login_image,
        user_copyright: nextProps.vip_user.user_copyright,
        customer_copyright: nextProps.vip_user.customer_copyright,
        url_customer_copyright: nextProps.vip_user.url_customer_copyright,
        trader_mark_name: nextProps.vip_user.trader_mark_name,
      });
    }
    if (nextProps.logoAfterImg != this.props.logoAfterImg)
      this.setState({ url_logo_small_image: nextProps.logoAfterImg });
    if (nextProps.logoImg != this.props.logoImg)
      this.setState({ url_logo_image: nextProps.logoImg });
    if (nextProps.loginImg != this.props.loginImg)
      this.setState({ url_login_image: nextProps.loginImg });
  }

  onSave = (e) => {
    e.preventDefault();
    this.props.configVipUser({
      url_logo_image: this.state.url_logo_image,
      url_logo_small_image: this.state.url_logo_small_image,
      url_login_image: this.state.url_login_image,
      user_copyright: this.state.user_copyright,
      customer_copyright: this.state.customer_copyright,
      url_customer_copyright: null,
      trader_mark_name: this.state.trader_mark_name,
    });
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };
  render() {
    var {
      url_logo_image,
      url_logo_small_image,
      url_login_image,
      user_copyright,
      customer_copyright,
      url_customer_copyright,
      trader_mark_name,
      typeUpload,
    } = this.state;

    var { vip_user } = this.props;

    var url_logo_image =
      url_logo_image == null ? Env.IMG_NOT_FOUND : url_logo_image;
    var url_logo_small_image =
      url_logo_small_image == null ? Env.IMG_NOT_FOUND : url_logo_small_image;
    var url_login_image =
      url_login_image == null ? Env.IMG_NOT_FOUND : url_login_image;

    console.log(this.props);

    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="box-body">
            <div>
              <div class="row" style={{ justifyContent: "space-evenly" }}>
                <div class="">
                  <div class="form-group">
                    <label>Ảnh logo: &nbsp; </label>
                    <img src={`${url_logo_image}`} width="150" height="150" />
                  </div>
                  <div class="form-group">
                    <div class="kv-avatar">
                      <div>
                        <button
                          onClick={() => this.onChangeUpload("LOGO")}
                          type="button"
                          class="btn btn-primary btn-sm"
                          data-toggle="modal"
                          data-target="#uploadModalConfigVip"
                        >
                          <i class="fa fa-plus"></i> Upload ảnh
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="">
                  <div class="form-group">
                    <label>Ảnh logo khi thu nhỏ: &nbsp; </label>
                    <img
                      src={`${url_logo_small_image}`}
                      width="150"
                      height="150"
                    />
                  </div>
                  <div class="form-group">
                    <div class="kv-avatar">
                      <div>
                        <button
                          onClick={() => this.onChangeUpload("LOGO_AFTER")}
                          type="button"
                          class="btn btn-primary btn-sm"
                          data-toggle="modal"
                          data-target="#uploadModalConfigVip"
                        >
                          <i class="fa fa-plus"></i> Upload ảnh
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="product_name">Tên thương hiệu</label>
              <input
                type="text"
                class="form-control"
                id="trader_mark_name"
                value={trader_mark_name}
                name="trader_mark_name"
                placeholder="Nhập ..."
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>

            <div class="form-group">
              <label for="product_name">Copyright dưới trang quản lý</label>
              <input
                type="text"
                class="form-control"
                id="user_copyright"
                value={user_copyright}
                name="user_copyright"
                placeholder="Nhập ..."
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>

            <div class="form-group">
              <label for="product_name">Nội dung dưới trang bán hàng</label>
              <input
                type="text"
                class="form-control"
                id="customer_copyright"
                value={customer_copyright}
                name="customer_copyright"
                placeholder="Nhập ..."
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>

            {/* <div class="form-group">
              <label for="product_name">Đường link khi nhấn vào Copyright trang bán hàng</label>
              <input
                type="text"
                class="form-control"
                id="url_customer_copyright"
                value={url_customer_copyright}
                name="url_customer_copyright"
                placeholder="Nhập ..."
                autoComplete="off"
                onChange={this.onChange}
                name="url_customer_copyright"
              />
            </div> */}
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info btn-icon-split btn-sm">
              <span class="icon text-white-50">
                <i class="fas fa-save"></i>
              </span>
              <span class="text">Lưu</span>
            </button>
          </div>
        </form>

        <ModalUpload typeUpload={typeUpload} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logoImg: state.UploadReducers.configVipImg.logo_img,
    logoAfterImg: state.UploadReducers.configVipImg.logo_after_img,
    loginImg: state.UploadReducers.configVipImg.login_img,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
