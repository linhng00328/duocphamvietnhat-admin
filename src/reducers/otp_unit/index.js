import { combineReducers } from "redux";
import { otp_unit } from "./otp_unit";
import { alert } from "./alert";

export const otpUnitReducers = combineReducers({
  otp_unit,
  alert,
});
