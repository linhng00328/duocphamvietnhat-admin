import { combineReducers } from "redux";
import { mobileCheckin } from "./mobile_checkin";
import { alert } from "./alert";

export const mobileCheckinReducers = combineReducers({
  mobileCheckin,
  alert,
});
