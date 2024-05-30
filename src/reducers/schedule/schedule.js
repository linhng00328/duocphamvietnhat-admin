import * as Types from "../../constants/ActionType";

var initialState = {
  allSchedule: [],
  scheduleID: {  },
  type: [],
};

export const schedule = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_SCHEDULE:
      newState.allSchedule = action.data;
      return newState;
    case Types.FETCH_ID_SCHEDULE:
      newState.scheduleID = action.data;
      return newState;
   
    default:
      return newState;
  }
};
