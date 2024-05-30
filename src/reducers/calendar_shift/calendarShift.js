import * as Types from "../../constants/ActionType";

var initialState = {
  allCalendarShift: [],
  calendarShiftId: {},
};

export const calendarShift = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_CALENDAR_SHIFT:
      newState.allCalendarShift = action.data;
      return newState;
    case Types.FETCH_ID_CALENDAR_SHIFT:
      newState.calendarShiftId = action.data;
      return newState;
    default:
      return newState;
  }
};
