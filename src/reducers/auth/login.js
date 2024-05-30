import * as Types from "../../constants/ActionType";

var initialState = {
  authentication : undefined,
};

export const login = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
      case Types.AUTHENTICATION_LOGIN:
        newState.authentication = action.auth;
        return newState;
    default:
      return newState;
  }
};
