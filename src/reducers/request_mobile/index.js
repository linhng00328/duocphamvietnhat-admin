import { combineReducers } from "redux";
import { requestMobile } from "./requestMobile";
import { alert } from "./alert";

export const requestMobileReducers = combineReducers({
  requestMobile,
  alert,
});
