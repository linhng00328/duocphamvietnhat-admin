import * as Types from "../constants/ActionType";
import history from "../history";
import * as requestRemoteApi from "../data/remote/request_remote";

export const fetchAllRequestRemote = (store_code, branch_id, page , params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    // dispatch({
    //   type: Types.SHOW_LOADING_LAZY,
    //   loading: "show",
    // });
    requestRemoteApi
      .fetchAllRequestRemote(store_code, branch_id, page , params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_REQUEST_REMOTE,
            data: res.data.data,
          });
      });
  };
};
export const updateStatus = (store_code, branch_id, id, data, page) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    requestRemoteApi
      .updateStatus(store_code, branch_id, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        requestRemoteApi
          .fetchAllRequestRemote(store_code, branch_id, page)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_REQUEST_REMOTE,
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
              loading: "hide",
            });
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
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
