import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../../../history";
import * as auth from "../../../actions/auth";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPhone: "",
      txtPassword: "",
      toggle: false,
      iconShow: "fa fa-fw fa-eye",
      iconHide: "fa fa-fw fa-eye-slash",
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

  onSave = (e) => {
    e.preventDefault();
    this.props.login({
      email_or_phone_number: this.state.txtPhone,
      password: this.state.txtPassword,
    });
  };
  redirectRegister = () => {
    history.push("/register");
  };
  togglePassword = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  render() {
    var { txtPhone, txtPassword, toggle, iconHide, iconShow } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.onSave} className="user">
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-user"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              placeholder="SĐT, Email hoặc tài khoản nhân viên"
              autoComplete="off"
              value={txtPhone}
              onChange={this.onChange}
              name="txtPhone"
            />
          </div>
          <div className="form-group">
            <input
              type={toggle == true ? "text" : "password"}
              className="form-control form-control-user"
              // id="txtPassword"
              placeholder="Nhập mật khẩu"
              autoComplete="off"
              value={txtPassword}
              onChange={this.onChange}
              name="txtPassword"
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

          <div
            className="group-button"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button
              type="button"
              onClick={this.redirectRegister}
              className="btn btn-primary btn-user btn-block"
              style={{
                "border-color": "#BF2327",
                "background-color": "#BF2327",
                "margin-top": "5px",
                "font-size": ".8rem",
                "border-radius": "10rem",
                flex: "1",
                padding: ".75rem 1rem",
                maxWidth: "47%",
              }}
            >
              Đăng ký
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-user btn-block"
              style={{
                "margin-top": "5px",
                "font-size": ".8rem",
                "border-radius": "10rem",
                flex: "1",
                padding: ".75rem 1rem",
                maxWidth: "47%",
              }}
            >
              Đăng nhập
            </button>
          </div>

          <hr></hr>
        </form>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    login: ($form) => {
      dispatch(auth.login($form));
    },
  };
};
export default connect(null, mapDispatchToProps)(Form);
