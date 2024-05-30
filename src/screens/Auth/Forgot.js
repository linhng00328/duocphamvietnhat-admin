import React, { Component } from "react";

import {  Link } from "react-router-dom";
import Form from "../../components/Auth/Forgot/Form";
import Alert from "../../components/Partials/Alert";
import * as Types from "../../constants/ActionType";
import { connect } from "react-redux";
import themeData from "../../ultis/theme_data";

class Forgot extends Component {
  render() {
    return (
        <div>
        <div className="container">

        <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-password-image"  style={{
                        backgroundImage: `url(${document.location.origin + themeData().logoLogin})`
                      }}></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                    <Alert type = {Types.ALERT_UID_STATUS} alert = {this.props.alert} />

                                        <h1 className="h4 text-gray-900 mb-2">Quên mật khẩu?</h1>
                                        <p className="mb-4">Vui lòng nhập số điện thoại hoặc email mà bạn đã đăng kí!</p>
                                    </div>
                                    <Form/>
                                    <hr></hr>
                                    <div className="text-center">
                                    <Link className="small" to="/register">Tạo tài khoản!</Link>
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

        </div>

    </div>
    </div>
    )
  }

}

const  mapStateToProps = state =>{
    return{
     alert : state.authReducers.alert.alert_forgot
  
    }
  };

export default connect(mapStateToProps,null)(Forgot);
