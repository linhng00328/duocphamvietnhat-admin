import * as Types from "../constants/ActionType";
import * as configVipApi from "../data/remote/config_vip";
import * as uploadApi from "../data/remote/upload";

export const getConfigVipUser = () => {
    return (dispatch) => {
        dispatch({
            type: Types.SHOW_LOADING,
            loading: "show"
        })
        configVipApi.getConfigVipUser().then((res) => {
            dispatch({
                type: Types.SHOW_LOADING,
                loading: "hide"
            })
            if (res.data.code === 200)
                dispatch({
                    type: Types.FETCH_CONFIG_VIP_USER,
                    data: res.data.data,
                });
        });
    };
};
export const configVipUser = (data) => {
    return (dispatch) => {
        dispatch({
            type: Types.SHOW_LOADING,
            loading: "show"
        })
        configVipApi.configVipUser(data).then((res) => {
            dispatch({
                type: Types.SHOW_LOADING,
                loading: "hide"
            })
            if (res.data.code === 200)
                dispatch({
                    type: Types.FETCH_CONFIG_VIP_USER,
                    data: res.data.data,
                });
                dispatch({
                  type: Types.ALERT_UID_STATUS,
                  alert: {
                    type: "success",
                    title: "Thành công ",
                    disable: "show",
                    content: res.data.msg,
                  },
                });
        });
    };
};

export const uploadImg_LOGO = (file) => {
    return (dispatch) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "show"
      })
      uploadApi
        .upload(file)
        .then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide"
          })
          dispatch({
            type: Types.UPLOAD_CONFIG_VIP_IMG_LOGO,
            data: res.data.data,
          });
  
        })
        .catch(function (error) {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide"
          })
  
        });
    };
  };
  
  export const uploadImg_LOGO_AFTER = (file) => {
    return (dispatch) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "show"
      })
      uploadApi
        .upload(file)
        .then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide"
          })
          dispatch({
            type: Types.UPLOAD_CONFIG_VIP_IMG_LOGO_AFTER,
            data: res.data.data,
          });
  
        })
        .catch(function (error) {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide"
          })
  
        });
    };
  };
  
  
  export const uploadImg_LOGIN = (file) => {
    return (dispatch) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "show"
      })
      uploadApi
        .upload(file)
        .then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide"
          })
          dispatch({
            type: Types.UPLOAD_CONFIG_VIP_IMG_LOGIN,
            data: res.data.data,
          });
  
        })
        .catch(function (error) {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide"
          })
  
        });
    };
  };
  