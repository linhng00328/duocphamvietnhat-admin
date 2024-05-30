import React, { Component } from "react";
import { connect } from "react-redux";
import * as Types from "../../../constants/ActionType";

import * as auth from "../../../actions/auth";
import Alert from "../../Partials/Alert";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtOTP: "",
      canSendOtp: true,
      secondCountDown: 30,
      isSendToPhone: true,
    };
  }

  componentDidMount() {
    var { alert, formData } = { ...this.props };
    alert.disable = "hide";
    this.props.alert({
      type: Types.ALERT_UID_STATUS,
      alert,
    });

    this.onSendOtp();
  }

  onSendOtp = () => {
    var { formData } = { ...this.props };
    if (this.state.canSendOtp == true) {
      this.startTimer();

      if (this.state.isSendToPhone) {
        this.props.sendOTP(formData.formData.phone_number);
      } else {
        this.props.sendOTPToEmail(formData.formData.email);
      }
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

  onChangeSendTo = () => {
    var isSendToPhone = !this.state.isSendToPhone;
    this.setState({ isSendToPhone: isSendToPhone });
    this.props.onChangeIsSendToPhone(isSendToPhone);
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
    var data = this.props.formData;
    this.props.registerOTP({
      name: data.txtName,
      phone_number: data.txtPhone,
      email: data.txtEmail,
      password: data.txtPassword,
      otp: this.state.txtOTP,
      otp_from: this.state.isSendToPhone ? "phone" : "email",
    });
  };
  goBack = (e) => {
    e.preventDefault();

    var { history } = this.props;
    history.push("/register?redirect_register=true");
  };
  render() {
    var { txtOTP } = this.state;

    return (
      <React.Fragment>
        <form
          onSubmit={this.onSave}
          className="user"
          autoComplete="new-password"
        >
          <div className="form-group">
            <input
              className="form-control form-control-user"
              id="exampleInputEmail"
              autoComplete="new-password"
              placeholder={
                !this.state.isSendToPhone
                  ? "Nhập mã xác nhận từ Email"
                  : "Nhập mã xác nhận từ SĐT"
              }
              name="txtOTP"
              value={txtOTP}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-user btn-block">
            Đăng ký
          </button>

          <div class="row  justify-content-around">
            <div
              className="text-center"
              onClick={this.onChangeSendTo}
              style={{
                cursor: "pointer",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <a type="button">
                {" "}
                {this.state.isSendToPhone
                  ? "Xác thực bằng email"
                  : "Xác thực bằng số điện thoại"}
              </a>
            </div>

            {this.state.canSendOtp ? (
              <div
                className="text-center"
                onClick={this.onSendOtp}
                style={{
                  cursor: "pointer",
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
                  cursor: "pointer",
                  marginTop: 10,
                  marginBottom: 20,
                }}
              >
                Nhận lại mã sau {this.state.secondCountDown}
              </div>
            )}
          </div>

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
    registerOTP: ($form) => {
      dispatch(auth.registerOTP($form));
    },
    sendOTP: (phone_number) => {
      dispatch(auth.sendOTP(phone_number));
    },
    sendOTPToEmail: (email) => {
      dispatch(auth.sendOTPToEmail(email));
    },
    alert: (form) => {
      dispatch(form);
    },
  };
};
export default connect(null, mapDispatchToProps)(Form);
