import * as Types from "../../constants/ActionType";

var initialState = {
  smsConfig: {},
};

export const configSms = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_SMS_CONFIG:
      newState.smsConfig = action.data;
      return newState;
    default:
      return newState;
  }
};
