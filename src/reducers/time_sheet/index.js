import { combineReducers } from "redux";
import { timeSheet } from "./timeSheet";
import { alert } from "./alert";

export const timeSheetReducers = combineReducers({
  timeSheet,
  alert,
});
