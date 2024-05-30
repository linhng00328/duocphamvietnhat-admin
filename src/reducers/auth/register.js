import * as Types from "../../constants/ActionType";

var initialState = {
  user: {
    phone_number: "",
    email: "",
    password: "",
    name: "",
  },
};

export const register = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.USER_REGISTER:
      newState.user = action.user;
      return newState;
    default:
      return newState;
  }
};
