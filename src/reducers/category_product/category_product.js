import * as Types from "../../constants/ActionType";

var initialState = {
  allCategoryP: [],
  categoryPID: [],
};

export const category_product = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_CATEGORY_PRODUCT:
      newState.allCategoryP = action.data;
      return newState;
    case Types.FETCH_ID_CATEGORY_PRODUCT:
      newState.categoryPID = action.data;
      return newState;
    default:
      return newState;
  }
};
