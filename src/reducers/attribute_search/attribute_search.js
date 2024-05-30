import * as Types from "../../constants/ActionType";

var initialState = {
  allAttribute: [],
  allAttributeProduct: [],
};

export const attribute_search = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_ATTRIBUTE_SEARCH:
      newState.allAttribute = action.data;
      return newState;
    case Types.FETCH_ALL_ATTRIBUTE_SEARCH_PRODUCT:
      newState.allAttributeProduct = action.data;
      return newState;
    default:
      return newState;
  }
};
