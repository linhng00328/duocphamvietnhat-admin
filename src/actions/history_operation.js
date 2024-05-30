import * as Types from "../constants/ActionType";
import * as historyOperationApi from "../data/remote/history_operation";

export const fetchHistoryOperation = (store_code, params) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    historyOperationApi
      .fetchHistoryOperation(store_code, params)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.GET_HISTORY_OPERATION,
            data: res.data.data,
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
            content: error?.response?.data?.message,
          },
        });
      });
  };
};
