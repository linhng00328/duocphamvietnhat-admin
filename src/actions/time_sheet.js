import * as Types from "../constants/ActionType";
import history from "../history";
import * as timeSheetApi from "../data/remote/time_sheet";

export const fetchAllTimeSheet = (store_code, branch_id, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    // dispatch({
    //   type: Types.SHOW_LOADING_LAZY,
    //   loading: "show",
    // });
    timeSheetApi
      .fetchAllTimeSheet(store_code, branch_id, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        // dispatch({
        //   type: Types.SHOW_LOADING_LAZY,
        //   loading: "hide",
        // });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_TIME_SHEET,
            data: res.data.data,
          });
      });
  };
};
export const bonusLessCheckinCheckout = (
  store_code,
  branch_id,
  params,
  data
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    timeSheetApi
      .bonusLessCheckinCheckout(store_code, branch_id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        timeSheetApi
          .fetchAllTimeSheet(store_code, branch_id, params)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_TIME_SHEET,
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
