import * as Types from "../constants/ActionType";
import history from "../history";
import * as userApi from "../data/remote/user";

import * as uploadApi from "../data/remote/upload"

export const fetchUserId = () => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    userApi.fetchUserId().then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide"
      })     
       if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_ID_USER,
        data: res.data.data,
      });
    });
  };
};
export const uploadImgUser = (file) => {
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
          type: Types.UPLOAD_USER_IMG,
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
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

export const updateUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    userApi
      .updateUser(user)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
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

