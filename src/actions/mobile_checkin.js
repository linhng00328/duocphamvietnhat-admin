import * as Types from "../constants/ActionType";

import * as mobileCheckinApi from "../data/remote/mobile_checkin";

export const fetchStaffMobileCheckin = (
  store_code,
  branch_id,
  request_mobile_id
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    mobileCheckinApi
      .fetchStaffMobileCheckin(store_code, branch_id, request_mobile_id)
      .then((res) => {
        if (res.data.code !== 401)
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
        dispatch({
          type: Types.FETCH_STAFF_MOBILE_CHECKIN,
          data: res.data.data,
        });
      });
  };
};
