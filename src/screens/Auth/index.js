import React, { Component } from "react";
import Form from "../../components/Auth/Login/Form";
import { Link } from "react-router-dom";
import Alert from "../../components/Partials/Alert";
import * as Types from "../../constants/ActionType";
import { connect } from "react-redux";
import themeData from "../../ultis/theme_data";

class Login extends Component {


  componentDidMount() {
    this.props.resetPermission({
      type: Types.FETCH_PERMISSION,
      data: {}
    })
    this.props.loadPermission({ type: Types.LOAD_PERMISSION, data: false })

  }

  render() {
    return (
      <div classNameName="bg-gradient-primary">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image"
                      style={{
                        backgroundImage: `url(${document.location.origin + themeData().logoLogin})`
                      }}
                    ></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <Alert
                          type={Types.ALERT_UID_STATUS}
                          alert={this.props.alert}
                        />

                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">
                         {themeData().loginTitle} - Đăng nhập
                          </h1>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-900 mb-4">
                            Xin chào, vui lòng nhập thông tin đăng nhập
                          </p>
                        </div>
                        <Form></Form>

                        <div className="text-center">
                          <Link className="small" to="/forgot">
                            Quên mật khẩu?
                          </Link>
                        </div>


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
    alert: state.authReducers.alert.alert_login,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    resetPermission: (permissions) => {
      dispatch(permissions);
    },
    loadPermission: (data) => {
      dispatch(data);
    },

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
