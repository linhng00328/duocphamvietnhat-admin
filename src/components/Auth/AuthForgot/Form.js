import React, { Component } from "react";
import { connect } from "react-redux";
import * as Types from "../../../constants/ActionType";
import { isEmail, isPhone } from "../../../ultis/helpers";
import * as auth from "../../../actions/auth";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPassword: "",
      txtOTP: "",
      canSendOtp: true,
      secondCountDown: 30,
      toggle: false,
      iconShow: "fa fa-fw fa-eye",
      iconHide: "fa fa-fw fa-eye-slash",
    };
  }

  componentDidMount() {
    var { alert } = { ...this.props };
    alert.disable = "hide";
    this.props.alert({
      type: Types.ALERT_UID_STATUS,
      alert,
    });
    console.log(this.props);
    if (isEmail(this.props.formData?.formData.email)) {
      this.onSendOtpToEmail();
    } else {
      this.onSendOtp();
    }
  }

  onSendOtpToEmail = () => {
    var { formData } = { ...this.props };
    if (this.state.canSendOtp == true) {
      this.startTimer();
      this.props.sendOTPToEmail(formData.formData.email);
    }
  };

  onSendOtp = () => {
    var { formData } = { ...this.props };
    if (this.state.canSendOtp == true) {
      this.startTimer();
      this.props.sendOTP(formData.formData.phone_number);
    }
  };

  startTimer = () => {
    this.state.secondCountDown = 30;
    this.setState({ canSendOtp: false });
    this.countDown();
  };

  countDown = () => {
    if (this.state.secondCountDown > 0) {
      setTimeout(() => {
        var seconds = this.state.secondCountDown - 1;
        this.setState({ secondCountDown: seconds });
        this.countDown();
      }, 1000);
    }

    if (this.state.secondCountDown < 1) {
      this.setState({ canSendOtp: true });
    }
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
    this.props.forgotOTP({
      password: this.state.txtPassword,
      otp: this.state.txtOTP,
      email_or_phone_number:
        this.props.phone_number == ""
          ? this.props.email
          : this.props.phone_number,
      otp_from: isEmail(this.props.email) ? "email" : "phone",
    });
  };
  goBack = (e) => {
    e.preventDefault();
    var { history } = this.props;

    history.push("/forgot?redirect_forgot=true");
  };

  togglePassword = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  render() {
    var { txtOTP, txtPassword, toggle, iconHide, iconShow } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.onSave} className="user">
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-user"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              autocomplete="off1"
              placeholder={
                isEmail(this.props.email)
                  ? "Nhập mã xác nhận từ Email"
                  : "Nhập mã xác nhận từ số điện thoại"
              }
               autoComplete='new-password'
              name="txtOTP"
              value={txtOTP}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <input
              type={toggle == true ? "text" : "password"}
              className="form-control form-control-user"
              placeholder="Nhập mật khẩu mới"
               autoComplete='new-password'
              autocomplete="off1"
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

          <button type="submit" className="btn btn-primary btn-user btn-block">
            Xác nhận
          </button>

          {this.state.canSendOtp ? (
            <div
              className="text-center"
              onClick={
                isEmail(this.props.phone_number)
                  ? this.onSendOtpToEmail
                  : this.onSendOtp
              }
              style={{
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <a type="button">Gửi lại mã</a>
            </div>
          ) : (
            <div
              className="text-center"
              style={{
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              Nhận lại mã sau {this.state.secondCountDown}
            </div>
          )}

          <div
            onClick={this.goBack}
            style={{
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <a type="button"> &#8592; Trở lại</a>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    forgotOTP: ($form) => {
      dispatch(auth.forgotOTP($form));
    },
    alert: (form) => {
      dispatch(form);
    },
    sendOTP: (phone_number) => {
      dispatch(auth.sendOTP(phone_number));
    },
    sendOTPToEmail: (email) => {
      dispatch(auth.sendOTPToEmail(email));
    },
  };
};
export default connect(null, mapDispatchToProps)(Form);
