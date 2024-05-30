import * as Types from "../constants/ActionType";
import * as badgeApi from "../data/remote/badge"
export const fetchAllBadge = (store_code,branch_id) => {
  
  if(branch_id == null) return;
    return (dispatch) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "show"
      })
      badgeApi.fetchAllBadge(store_code,branch_id).then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        if(res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_BADGE,
          data: res.data.data,
        });
      });
    };
  };