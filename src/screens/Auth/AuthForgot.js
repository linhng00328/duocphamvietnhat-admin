import React, { Component } from "react";
import Form from "../../components/Auth/AuthForgot/Form";
import Alert from "../../components/Partials/Alert";
import { Redirect } from "react-router-dom";
import * as Types from "../../constants/ActionType";
import { connect } from "react-redux";
import themeData from "../../ultis/theme_data";

class AuthForgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPhone: "",
      txtEmail : "",
      redirect: false,
      formData: "",
    };
    this.checkExsitPhoneNumber();
  }

  checkExsitPhoneNumber() {
    var formData = this.props.user;
    var phone_number = this.props.user.phone_number;
    var email = this.props.user.email;

    if (phone_number !== "" || email != "") {
      this.state.redirect = true;
      this.state.formData = formData;
    }
  }
  componentDidMount() {
    var formData = this.props.user ? this.props.user : false;
    if (formData !== false) {
      this.setState({
        txtPhone: formData.phone_number,
        txtEmail : formData.email
      });
    }
  }

  render() {
    var { txtPhone, redirect , txtEmail } = this.state;
    var { history } = this.props;
    var{state} = this
    if (redirect === false) {
      return <Redirect to="/forgot" />;
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
                            Vui lòng nhập mã xác nhận từ <br />  {txtPhone == "" ? txtEmail : txtPhone}
                          </p>
                        </div>
                        <Form formData={state} phone_number={txtPhone} email = {txtEmail} history={history} />
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
    alert: state.authReducers.alert.alert_forgotOTP,
    user: state.authReducers.forgot.user,
  };
};

export default connect(mapStateToProps, null)(AuthForgot);
