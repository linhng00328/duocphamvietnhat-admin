import * as Types from "../../constants/ActionType";

var initialState = {
  allDiscount: [],
  discountId : {}
};

export const discount = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_DISCOUNT:
      newState.allDiscount = action.data;
      return newState;
    case Types.FETCH_ID_DISCOUNT:
      newState.discountId = action.data;
      return newState;
    default:
      return newState;
  }
};
