import * as Types from "../../constants/ActionType";

var initialState = {
  historyOperation: [],
};

export const history_operation = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.GET_HISTORY_OPERATION:
      newState.historyOperation = action.data;
      return newState;
    default:
      return newState;
  }
};
