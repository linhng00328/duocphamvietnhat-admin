import { combineReducers } from "redux";
import { requestRemote } from "./requestRemote";
import { alert } from "./alert";

export const requestRemoteReducers = combineReducers({
  requestRemote,
  alert,
});
