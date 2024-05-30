
import * as Types from "../constants/ActionType";

var initialState = {
  topten: [],
  overview: [],
  reportInventory: [],
  reportHistory: [],
  reportImportExport: [],
  reportProfit: [],
  compareProfit: [],
  custommerDebt: [],
  supplierDebt: [],
  reportExpenditure:[],
  alert_fetch_report: {
    disable: "hide",
  }

};

export const reportReducers = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_TOPTEN_REPORT:
      newState.topten = action.data;
      return newState;
    case Types.FETCH_OVERVIEW_REPORT:
      newState.overview = action.data;
      return newState;
    case Types.ALERT_UID_STATUS:
      newState.alert_fetch_report = action.data;
      return newState
    case Types.FETCH_ALL_REPORT_INVENTORY:
      newState.reportInventory = action.data;
      return newState
    case Types.FETCH_IMPORT_EXPORT_STOCK:
      newState.reportImportExport = action.data;
      return newState
    case Types.FETCH_ALL_INVENTORY_HISTORY:
      newState.reportHistory = action.data;
      return newState
    case Types.FETCH_REPORT_PROFIT:
      newState.reportProfit = action.data;
      return newState
    case Types.FETCH_REPORT_PROFIT_COMPARE:
      newState.compareProfit = action.data;
      return newState
    case Types.FETCH_ALL_REPORT_CUSTOMER_DEBT:
      newState.custommerDebt = action.data;
      return newState
    case Types.FETCH_ALL_REPORT_SUPPLIER_DEBT:
      newState.supplierDebt = action.data;
      return newState
      case Types.FETCH_REPORT_EXPENDITURE:
        newState.reportExpenditure = action.data;
        return newState
    default:
      return newState;
  }
};

