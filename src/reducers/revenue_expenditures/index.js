import { combineReducers } from "redux";
import { revenueExpenditures } from "./revenue_expenditures";
import { alert } from "./alert";

export const revenueExpendituresReducers = combineReducers({
  revenueExpenditures,
  alert,
});
