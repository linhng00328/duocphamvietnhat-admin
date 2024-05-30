import * as Types from "../../constants/ActionType";

var initialState = {
  alert_send: {
    disable: "hide",
  },

};

export const alert = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.ALERT_UID_STATUS:
      newState.alert_send = action.alert;
      return newState;
   
    default:
      return newState;
  }
};
