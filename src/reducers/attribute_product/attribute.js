import * as Types from "../../constants/ActionType";

var initialState = {
  allAttrbute: [],
};

export const attribute_product = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_ATTRIBUTE_PRODUCT:
      newState.allAttrbute = action.data;
      return newState;

    default:
      return newState;
  }
};
