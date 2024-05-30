import * as Types from "../../constants/ActionType";

var initialState = {
  allShift: [],
  shiftId: {},
};

export const shift = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_SHIFT:
      newState.allShift = action.data;
      return newState;
    case Types.FETCH_ID_SHIFT:
      newState.shiftId = action.data;
      return newState;
    default:
      return newState;
  }
};
