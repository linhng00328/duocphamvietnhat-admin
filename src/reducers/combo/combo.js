import * as Types from "../../constants/ActionType";

var initialState = {
  allCombo: [],
  comboId : {}
};

export const combo = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_COMBO:
      newState.allCombo = action.data;
      return newState;
    case Types.FETCH_ID_COMBO:
      newState.comboId = action.data;
      return newState;
    default:
      return newState;
  }
};
