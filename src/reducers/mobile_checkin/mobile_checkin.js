import * as Types from "../../constants/ActionType";

var initialState = {
  allStaffMobileCheckin: [],
};

export const mobileCheckin = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_STAFF_MOBILE_CHECKIN:
      newState.allStaffMobileCheckin = action.data;
      return newState;

    default:
      return newState;
  }
};
