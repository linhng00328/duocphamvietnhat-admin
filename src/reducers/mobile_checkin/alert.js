import * as Types from "../../constants/ActionType";

var initialState = {
  alert_create: {
    disable: "hide",
  },
};

export const alert = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.ALERT_UID_STATUS:
      newState.alert_create = action.alert;
      return newState;

    default:
      return newState;
  }
};
