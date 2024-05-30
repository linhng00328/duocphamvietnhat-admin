import * as Types from "../constants/ActionType";
import history from "../history";
import * as storeApi from "../data/remote/store";

export const fetchAllStore = (form) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    storeApi
      .fetchAllData()
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        if(res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_STORE,
          data : res.data.data
        });
      });
  };
};
