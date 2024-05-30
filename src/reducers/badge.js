
import * as Types from "../constants/ActionType";

var initialState = {
  allBadge: {},
};

export const badgeReducers = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_BADGE:
      newState.allBadge = action.data || {};
      return newState;

    default:
      return newState;
  }
};

