import * as Types from "../../constants/ActionType";

var initialState = {
  alert_productStore: {
    disable: "hide",
  },
  alert_uploadDis: {
    disable: "hide",
  },
  alert_upload_discount: {
    disable: "hide"
  },
  alert_upload_voucher: {
    disable: "hide"
  },
  alert_upload_combo: {
    disable: "hide"
  }
};

export const alert = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.ALERT_UID_STATUS:
      newState.alert_productStore = action.alert;
      return newState;
    case Types.ALERT_UID_STATUS:
      newState.alert_uploadDis = action.alert;
      return newState;
    case Types.ALERT_UID_STATUS:
      newState.alert_upload_discount = action.alert;
      return newState;
    case Types.ALERT_UID_STATUS:
      newState.alert_upload_voucher = action.alert;
      return newState;
      case Types.ALERT_UID_STATUS:
        newState.alert_upload_combo = action.alert;
        return newState;
    default:
      return newState;
  }
};
