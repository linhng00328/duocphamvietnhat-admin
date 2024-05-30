import React, { Component } from "react";
import { connect } from "react-redux";

import * as Types from "../../../constants/ActionType";
import * as auth from "../../../actions/auth";
import {
  isEmpty,
  isPhone,
  isEmail,
  isSpecialCharactor,
  countString,
} from "../../../ultis/helpers";
import { getQueryParams } from "../../../ultis/helpers";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtId: "",
      txtName: "",
      txtPhone: "",
      txtEmail: "",
      txtPassword: "",
      txtCPassword: "",
      toggle: false,
      toggleC: false,

      iconShow: "fa fa-fw fa-eye",
      iconHide: "fa fa-fw fa-eye-slash",
    };
  }

  componentWillMount() {
    var redirect_register = getQueryParams("redirect_register");
    if (
      redirect_register &&
      typeof this.props.user.phone_number != "undefined"
    ) {
      var { user } = this.props;
      this.setState({
        txtName: user.name,
        txtPhone: user.phone_number,
        txtEmail: user.email,
        txtPassword: user.password,
        txtCPassword: user.password,
      });
    }
  }

  toggleCPassword = () => {
    this.setState({ toggleC: !this.state.toggleC });
  };

  togglePassword = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    e.preventDefault();
    var { txtName, txtEmail, txtPhone, txtPassword, txtCPassword } = this.state;
    if (!isEmpty(txtName) || !isEmpty(txtPassword) || !isEmpty(txtPhone)) {
      this.props.alert({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập đầy đủ các thông tin",
        },
      });
    } else {
      if (!isEmail(txtEmail) && isEmpty(txtEmail)) {
        this.props.alert({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Email không đúng định dạng",
          },
        });
        return;
      }
      if (this.state.txtCPassword !== this.state.txtPassword) {
        this.props.alert({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Nhập lại mật khẩu không hợp lệ",
          },
        });
        return;
      }
      if (countString(txtPassword) < 6) {
        this.props.alert({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Mật khẩu phải ít nhất 6 ký tự",
          },
        });
        return;
      }
      if (!isPhone(txtPhone)) {
        this.props.alert({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "SĐT không đúng định dạng",
          },
        });
        return;
      }
      if (!isSpecialCharactor(txtName)) {
        this.props.alert({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Tên không được chứa các kí tự đặc biệt",
          },
        });
        return;
      }
      if (this.state.txtCPassword === this.state.txtPassword) {
        this.props.register(this.state);
      } else {
        this.props.alert({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Nhập lại mật khẩu không hợp lệ",
          },
        });
      }
    }
  };

  render() {
    var { txtName, txtEmail, txtPhone, txtPassword, txtCPassword } = this.state;
    var { products } = this.props;
    var { toggleC, toggle, iconHide, iconShow } = this.state;

    console.log(products);
    return (
      <React.Fragment>
        <form onSubmit={this.onSave} className="user" autoComplete="off">
          <div className="form-group row">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <input
                type="text"
                className="form-control form-control-user"
                id="exampleFirstName"
                placeholder="Họ và tên"
                autoComplete="off"
                name="txtName"
                value={txtName}
                onChange={this.onChange}
              />
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control form-control-user"
                id="exampleLastName"
                placeholder="Số điện thoại"
                autoComplete="off"
                name="txtPhone"
                value={txtPhone}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-user"
              id="exampleInputEmail"
              placeholder="Email"
              autoComplete="new-password"
              name="txtEmail"
              value={txtEmail}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group row">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <input
                type={toggle == true ? "text" : "password"}
                className="form-control form-control-user"
                placeholder="Mật khẩu"
                autoComplete="new-password"
                name="txtPassword"
                value={txtPassword}
                onChange={this.onChange}
              />
              <span
                onClick={this.togglePassword}
                toggle="#password-field"
                class={toggle ? iconShow : iconHide}
                style={{
                  float: "right",
                  marginRight: "10px",
                  marginTop: "-30px",
                  position: "relative",
                  zIndex: "2",
                }}
              ></span>
            </div>
            <div className="col-sm-6">
              <input
                type={toggleC == true ? "text" : "password"}
                className="form-control form-control-user"
                placeholder="Nhập lại mật khẩu"
                autoComplete="off"
                name="txtCPassword"
                value={txtCPassword}
                onChange={this.onChange}
              />
              <span
                onClick={this.toggleCPassword}
                toggle="#password-field"
                class={toggleC ? iconShow : iconHide}
                style={{
                  float: "right",
                  marginRight: "10px",
                  marginTop: "-30px",
                  position: "relative",
                  zIndex: "2",
                }}
              ></span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-user btn-block">
            Đăng kí
          </button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    user: state.authReducers.register.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    register: ($form) => {
      dispatch(auth.register($form));
    },
    alert: (form) => {
      dispatch(form);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
