import * as Types from "../constants/ActionType";
import history from "../history";
import * as decentralizationApi from "../data/remote/decentralization";
import * as uploadApi from "../data/remote/upload";

export const fetchAllDecentralization = (store_code , page=1 , params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    decentralizationApi.fetchAllDecentralization(store_code , page,params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
        if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_ALL_DECENTRALIZATION,
        data: res.data.data,
      });
    });
  };
};

export const fetchDecentralizationId = (store_code , decentralizationId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    decentralizationApi.fetchDecentralizationId(store_code , decentralizationId).then((res) => {
      if(res.data.code !== 401)
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      dispatch({
        type: Types.FETCH_ID_DECENTRALIZATION,
        data: res.data.data,
      });
    });
  };
};



export const createDecentralization = (store_code,data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    decentralizationApi
      .createDecentralization(store_code,data)
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


export const destroyDecentralization = (store_code, id) => {
  
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    decentralizationApi
      .destroyDecentralization(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        decentralizationApi.fetchAllDecentralization(store_code)
          .then((res) => {
            if(res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_DECENTRALIZATION,
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

export const updateDecentralization = (id, data, store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    decentralizationApi
      .updateDecentralization(id, data, store_code)
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

