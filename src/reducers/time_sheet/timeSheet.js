import * as Types from "../../constants/ActionType";

var initialState = {
  allTimeSheet: [],
};

export const timeSheet = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_TIME_SHEET:
      newState.allTimeSheet = action.data;
      return newState;

    default:
      return newState;
  }
};
