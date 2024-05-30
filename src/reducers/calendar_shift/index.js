import { combineReducers } from "redux";
import { calendarShift } from "./calendarShift";
import { alert } from "./alert";

export const calendarShiftReducers = combineReducers({
  calendarShift,
  alert,
});
