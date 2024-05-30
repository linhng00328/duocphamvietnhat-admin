import { combineReducers } from "redux";
import { attribute_search } from "./attribute_search";
import { alert } from "./alert";

export const attributeSearchReducers = combineReducers({
  attribute_search,
  alert,
});
