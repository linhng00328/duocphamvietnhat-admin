import { combineReducers } from "redux";
import { spin_wheel } from "./spin_wheel";
import { guess_numbers } from "./guess_numbers";

export const gamificationReducers = combineReducers({
  spin_wheel,
  guess_numbers,
});
