import * as Types from "../constants/ActionType";
import history from "../history";
import * as notificationApi from "../data/remote/notification";
import * as badgeApi from "../data/remote/badge";
import { getBranchId, getBranchIds } from "../ultis/branchUtils";

export const fetchAllNotification = (store_code, page = 1) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    notificationApi
      .fetchAllNotification(store_code, getBranchId(), page)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401) {
          dispatch({
            type: Types.FETCH_ALL_NOTIFICATION,
            data: res.data.data,
          });

          notificationApi.readAllNotification(store_code, getBranchId());
        }
      });
  };
};
export const fetchAllGeneralSetting = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    notificationApi.fetchAllGeneralSetting(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401) {
        dispatch({
          type: Types.FETCH_ALL_GENERAL_SETTING,
          data: res.data.data,
        });

        notificationApi.readAllNotification(store_code, getBranchId());
      }
    });
  };
};

export const fetchAllBadge = (store_code) => {
  // if(branch_id == null) return;
  const branch_id = getBranchId();
  const branch_ids = getBranchIds();
  const branchIds = branch_ids ? branch_ids : branch_id;
  return (dispatch) => {
    // if (!store_code) {
    //   dispatch({
    //     type: "",
    //       data: {},
    //   });
    //   return;
    // };
    // dispatch({
    //   type: Types.SHOW_LOADING,
    //   loading : "show"
    // })
    badgeApi
      .fetchAllBadge(store_code, branchIds)
      .then((res) => {
        // dispatch({
        //   type: Types.SHOW_LOADING,
        //   loading : "hide"
        // })

        if (res.data.code !== 401) {
          dispatch({
            type: Types.FETCH_ALL_BADGE,
            data: res.data.data,
          });
          dispatch({
            type: Types.FETCH_PERMISSION,
            data:
              typeof res.data.data != "undefined" &&
              res.data.data.decentralization != null
                ? res.data.data.decentralization
                : {},
          });
          dispatch({
            type: Types.LOAD_PERMISSION,
            data: true,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.LOAD_PERMISSION,
          data: true,
        });
      });
  };
};

export const updateGeneralSetting = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    notificationApi.updateGeneralSetting(store_code, data).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });

      if (res.data.code !== 401) {
        dispatch({
          type: Types.FETCH_ALL_GENERAL_SETTING,
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
      }
    });
  };
};

export const fetchPublicApiConfig = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    notificationApi.fetchPublicApiConfig(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401) {
        dispatch({
          type: Types.FETCH_PUBLIC_API_CONFIG,
          data: res.data.data,
        });
      }
    });
  };
};

export const changeToken = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    notificationApi.changeToken(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401) {
        dispatch({
          type: Types.FETCH_PUBLIC_API_CONFIG,
          data: res.data.data,
        });
      }
    });
  };
};

export const UpdateConfigPublicApiConfig = (store_code, data) => {
  console.log("data", data);
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    notificationApi
      .UpdateConfigPublicApiConfig(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401) {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "success",
              title: "Thành công ",
              disable: "show",
              content: res.data.msg,
            },
          });
          dispatch({
            type: Types.FETCH_PUBLIC_API_CONFIG,
            data: res.data.data,
          });
        }
      });
  };
};
