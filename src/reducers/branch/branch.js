import * as Types from "../../constants/ActionType";

var initialState = {
  currentBranch: {},
};

export const branch = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.CHANGE_BRANCH:
      newState.currentBranch = action.data;
      return newState;
    default:
      return newState;
  }
};
