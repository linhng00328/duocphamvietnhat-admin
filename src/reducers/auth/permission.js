import * as Types from "../../constants/ActionType";

var initialState = {
  data: {},
  isLoadPermission: false,
};

export const permission = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_PERMISSION:
      newState.data = action.data;
      return newState;
    case Types.LOAD_PERMISSION:
      newState.isLoadPermission = action.data;
      return newState;
    default:
      return newState;
  }
};
