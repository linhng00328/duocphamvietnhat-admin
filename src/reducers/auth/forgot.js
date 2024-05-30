import * as Types from "../../constants/ActionType";

var initialState = {
  user: {
    phone_number: "",
  },
};

export const forgot = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.USER_PHONE_FORGOT:
      newState.user = action.user;
      return newState;
    default:
      return newState;
  }
};
