import * as Types from "../../constants/ActionType";

var initialState = {
  allBill: [],
  billID: {},
  billHistory: [],
  historyDeliveryStatus: [],
  historyPay: [],
  calculate: {},
  syncArray: [],
  statusDeleteOrder: {},
};

export const bill = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_BILL:
      newState.allBill = action.data;
      return newState;
    case Types.FETCH_ID_BILL:
      newState.billID = action.data;
      return newState;
    case Types.FETCH_BILL_HISTORY:
      newState.billHistory = action.data;
      return newState;
    case Types.UPDATE_STATUS_SYNC_SHIPMENT:
      newState.syncArray = action.data;
      return newState;
    case Types.FETCH_DELIVERY_HISTORY:
      newState.historyDeliveryStatus = action.data;
      return newState;
    case Types.FETCH_ALL_HISTORY_PAY:
      newState.historyPay = action.data;
      return newState;
    case Types.GET_CALCULATE:
      newState.calculate = action.data;
      return newState;
    case Types.DELETE_ORDER:
      newState.statusDeleteOrder = action.data;
      return newState;
    default:
      return newState;
  }
};
