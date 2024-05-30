import { combineReducers } from "redux";
import { connect } from "./connect";
import { product } from "./product";
import { order } from "./order";

export const ecommerceReducers = combineReducers({
  connect,
  product,
  order,
});
