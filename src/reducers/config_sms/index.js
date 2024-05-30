import { combineReducers } from "redux";
import { configSms } from "./config_sms";
import { alert } from "./alert";

export const configSmsReducers = combineReducers({
  configSms,
  alert,
});
