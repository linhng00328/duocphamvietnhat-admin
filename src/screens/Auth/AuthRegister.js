import React, { Component } from "react";
import Form from "../../components/Auth/AuthRegister/Form";
import Alert from "../../components/Partials/Alert";
import { Redirect } from "react-router-dom";
import * as Types from "../../constants/ActionType";
import { connect } from "react-redux";
import themeData from "../../ultis/theme_data";

class AuthRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtPhone: "",
      txtEmail: "",
      txtPassword: "",
      txtCPassword: "",
      redirect: false,
      formData: "",
      isSendToPhone: true,
    };
    this.checkExsitPhoneNumber();
  }

  checkExsitPhoneNumber() {
    try {
      var formData = this.props.user;
      var phone_number = this.props.user.phone_number;

      if (phone_number !== "") {
        this.state.redirect = true;
        this.state.formData = formData;
      }
    } catch (error) {
      this.state.redirect = false;
    }
  }
  componentDidMount() {
    var formData = this.props.user ? this.props.user : false;
    console.log(formData);
    if (formData !== false) {
      this.setState({
        txtPhone: formData.phone_number,
        txtName: formData.name,
        txtEmail: formData.email,
        txtPassword: formData.password,
      });
    }
  }

  render() {
    var { txtPhone, redirect, txtEmail } = this.state;
    var { state } = this;
    var { history } = this.props;
    console.log(this.state);
    if (redirect === false) {
      return <Redirect to="/register" />;
    }

    return (
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-register-image" style={{
                        backgroundImage: `url(${document.location.origin + themeData().logoLogin})`
                      }}></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <Alert
                          type={Types.ALERT_UID_STATUS}
                          alert={this.props.alert}
                        />

                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-2">
                            Xác minh tài khoản?
                          </h1>
                          <p className="mb-4">
                            Vui lòng nhập mã xác nhận từ <br />{" "}
                            {this.state.isSendToPhone ? txtPhone : txtEmail}
                          </p>
                        </div>
                        <Form
                          formData={state}
                          history={history}
                          onChangeIsSendToPhone={(v) => {
                            this.setState({
                              isSendToPhone: v,
                            });
                          }}
                        />
                        <hr></hr>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alert: state.authReducers.alert.alert_registerOTP,
    user: state.authReducers.register.user,
  };
};

export default connect(mapStateToProps, null)(AuthRegister);
