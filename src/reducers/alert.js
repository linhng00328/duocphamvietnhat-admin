import * as Types from "../constants/ActionType";

var initialState = {
  correctResponse: {
    disable: "hide",
  },
  alert_status: {
    disable: "hide",
  },
  

};

export const errResposeReducers = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.ERROR_RESPONSE:
      newState.correctResponse = action.alert;
      return newState;
      case Types.ALERT_UID_STATUS:
        newState.alert_status = action.alert;
        return newState;
  
    default:
      return newState;
  }
};
