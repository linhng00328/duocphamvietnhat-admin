import * as Types from "../constants/ActionType";
import history from "../history";
import * as userApi from "../data/remote/user";
import * as userLocalApi from "../data/local/user";
import { isEmpty} from "../ultis/helpers"


export const register = (form) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    userApi
      .checkExsitEmailPhone({
        phone_number: form.txtPhone,
        email: form.txtEmail,
      })
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        if (
          (res.data.data[0].value == false &&
          res.data.data[1].value == false) || (res.data.data[0].value == false && !isEmpty(form.txtEmail))
        ) {
          dispatch({
            type: Types.USER_REGISTER,
            user: {
              phone_number: form.txtPhone,
              email: form.txtEmail,
              password: form.txtPassword,
              name: form.txtName,
            },
          });
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "hide",
              content: content,
            },
          });

          history.push("/register/otp");
        } else {
          var content = "";
          if (
            res.data.data[0].value == true &&
            res.data.data[1].value == false
          ) {
            content = "Số điện thoại đã tồn tại";
          } else if (
            res.data.data[0].value == false &&
            res.data.data[1].value == true
          ) {
            content = "Email đã tồn tại";
          } else {
            content = "Số điện thoại và Email đã tồn tại";
          }
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: content,
            },
          });
        }
      });
  };
};

export const registerOTP = (form) => {


  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    userApi
      .postRegister(form)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        if (
          typeof res.data.success !== "undefined" &&
          res.data.success == true
        ) {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "success",
              title: "Thành công",
              disable: "show",
              content: "Đăng kí thành công",
            },
          });
          history.push("/");
        } else {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: res.data.msg,
            },
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};





export const changePassword = (form, funcModal = null, $this = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    userApi
      .changePassword(form)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        if (res.data.success && funcModal != null) {
          funcModal()
        }
        if ($this) {
          $this.setState({
            old_password: "",
            new_password: "",
          })
        }
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công",
            disable: "show",
            content: "Thay đổi mật khẩu thành công",
          },
        });
      })
      .catch(function (error) {
        if (typeof error.response.data.msg !== "undefined") {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: error?.response?.data?.msg,
            },
          });
        }

      });
  };
};


export const login = (form) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    userApi
      .postLogin(form)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        if (
          typeof res.data.success !== "undefined" &&
          res.data.success == true
        ) {
          userLocalApi.setToken(res.data.data.token)

          history.push("/");
        } else {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: res.data.msg,
            },
          });
        }
      })
      .catch(function (error) {
        if (typeof error.response.data.msg !== "undefined") {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: error?.response?.data?.msg,
            },
          });
        }

      });
  };
};

export const forgot = (form) => {
  var data = {}
  if (form.txtPhone == "")
    data = { email: form.txtEmail }
  else
    data = { phone_number: form.txtPhone }

  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    userApi.checkExsitEmailPhone(data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        if (res.data.data[0].value == true || res.data.data[1].value == true) {
          dispatch({
            type: Types.USER_PHONE_FORGOT,
            user: {
              phone_number: form.txtPhone,
              email: form.txtEmail
            },
          });
          history.push("/forgot/otp");
        } else {
          if (form.txtPhone == "") {
            dispatch({
              type: Types.ALERT_UID_STATUS,
              alert: {
                type: "danger",
                title: "Lỗi",
                disable: "show",
                content: "Email không tồn tại",
              },
            });
          }
          else {
            dispatch({
              type: Types.ALERT_UID_STATUS,
              alert: {
                type: "danger",
                title: "Lỗi",
                disable: "show",
                content: "Số điện thoại không tồn tại",
              },
            });
          }
        }
      }).catch(function (error) {
        console.log(error.response)
      });
  };
};

export const forgotOTP = (form) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    userApi
      .postResetPassword(form)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        if (
          typeof res.data.success !== "undefined" &&
          res.data.success == true
        ) {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "success",
              title: "Thành công",
              disable: "show",
              content: "Đổi mật khẩu thành công, vui lòng đăng nhập lại",
            },
          });
          history.push("/login");
        } else {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: res.data.msg,
            },
          });
        }
      })
      .catch(function (error) {
        console.log(error.response)
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};


export const sendOTP = (phone_number) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    userApi
      .sendOtp({
        'phone_number': phone_number,
      })
      .then((res) => {
        console.log(res)
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        if (
          typeof res.data.success !== "undefined" &&
          res.data.success == true
        ) {
        } else {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: res.data.msg,
            },
          });
        }
      })
      .catch(function (error) {
        console.log(error.response)
        if(error?.response?.data?.msg_code !== "TIME_IS_TOO_CLOSE"){
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: error?.response?.data?.msg,
            },
          });
        }

      });
  };
};


export const sendOTPToEmail = (email) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    userApi
      .sendOtpToEmail({
        'email': email,
      })
      .then((res) => {
        console.log(res)
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        if (
          typeof res.data.success !== "undefined" &&
          res.data.success == true
        ) {
        } else {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: res.data.msg,
            },
          });
        }
      })
      .catch(function (error) {
        if(error?.response?.data?.msg_code !== "TIME_IS_TOO_CLOSE"){
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: error?.response?.data?.msg,
            },
          });
        }
    
      });
  };
};