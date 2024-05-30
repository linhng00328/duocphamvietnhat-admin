import * as Types from "../../constants/ActionType";

var initialState = {
  alert_forgot: {},
  alert_forgotOTP: {},
  alert_login: {},
  alert_register: {},
  alert_registerOTP: {},
  alert_sendOTP:{}
};

export const alert = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.ALERT_UID_STATUS:
      newState.alert_forgot = action.alert;
      return newState;
    case Types.ALERT_UID_STATUS:
      newState.alert_forgotOTP = action.alert;
      return newState;
      case Types.ALERT_UID_STATUS:
      newState.alert_sendOTP = action.alert;
      return newState;
    case Types.ALERT_UID_STATUS:
      newState.alert_login = action.alert;
      return newState;
    case Types.ALERT_UID_STATUS:
      newState.alert_register = action.alert;
      return newState;
    case Types.ALERT_UID_STATUS:
      newState.alert_registerOTP = action.alert;
      return newState;
    default:
      return newState;
  }
};
