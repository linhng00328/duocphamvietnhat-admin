import * as Types from "../constants/ActionType";
import * as configSms from "../data/remote/config_sms";
import * as otpUnitApi from "../data/remote/otp_unit";

export const fetchSmsConfig = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    configSms.fetchSmsConfig(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_SMS_CONFIG,
          data: res.data.data,
        });
    });
  };
};

export const updateSmsConfig = (store_code, data, id, onSuccess) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    configSms
      .updateSmsConfig(store_code, data, id)
      .then((res) => {
        if (onSuccess) {
          onSuccess();
        }
        configSms.fetchSmsConfig(store_code).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_SMS_CONFIG,
              data: res.data.data,
            });
        });

        otpUnitApi.fetchAllOtpUnit(store_code).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_OTP_UNIT,
              data: res.data.data,
            });
        });
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
