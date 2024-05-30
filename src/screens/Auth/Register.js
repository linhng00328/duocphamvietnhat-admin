import React, { Component } from "react";
import Form from "../../components/Auth/Register/Form";
import { Link } from "react-router-dom";
import Alert from "../../components/Partials/Alert";
import * as Types from "../../constants/ActionType";
import { connect } from "react-redux";
import themeData from "../../ultis/theme_data";

class Register extends Component {
  render() {
    return (
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"     style={{
                        backgroundImage: `url(${document.location.origin + themeData().logoLogin})`
                      }}></div>
                  
              <div className="col-lg-7">
                <div className="p-5">
                <Alert type = {Types.ALERT_UID_STATUS} alert = {this.props.alert} />

                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Tạo tài khoản!</h1>
                  </div>
                  <Form alert =  {this.props.alert}></Form>
                  <hr></hr>

                  <div className="text-center">
                    <Link className="small" to="/forgot">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="text-center">
                  <Link className="small" to="/login">Bạn đã có tài khoản? Đăng nhập!</Link>

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

const  mapStateToProps = state =>{
    return{
     alert : state.authReducers.alert.alert_register
  
    }
  };

export default connect(mapStateToProps,null)(Register);