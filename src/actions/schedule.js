import * as Types from "../constants/ActionType";
import history from "../history";
import * as scheduleApi from "../data/remote/schedule";

export const fetchAllSchedule = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    scheduleApi.fetchAllSchedule(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_ALL_SCHEDULE,
        data: res.data.data,
      });
    });
  };
};




export const createSchedule = (store_code,data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    scheduleApi
      .createSchedule(store_code,data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
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
        history.goBack();
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


export const destroySchedule = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    scheduleApi
      .destroySchedule(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        scheduleApi.fetchAllSchedule(store_code)
          .then((res) => {
            if(res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_SCHEDULE,
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

export const updateSchedule = (scheduleId, schedule, store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    scheduleApi
      .updateSchedule(scheduleId, schedule, store_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
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
        history.goBack();
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


export const updateScheduleStatus = (scheduleId, schedule, store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    scheduleApi
      .updateSchedule(scheduleId, schedule, store_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
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
        scheduleApi.fetchAllSchedule(store_code).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading : "hide"
          })
          if(res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_SCHEDULE,
            data: res.data.data,
          });
        });
      }).catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
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