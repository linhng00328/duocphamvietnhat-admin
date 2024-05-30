import { combineReducers } from "redux";
import { shift } from "./shift";
import { alert } from "./alert";

export const shiftReducers = combineReducers({
  shift,
  alert,
});
