import * as Types from "../../constants/ActionType";

var initialState = {
  allBonusProduct: [],
  bonusProductId: {},
  bonusProductItem: {},
};

export const bonusProduct = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_BONUS_PRODUCT:
      newState.allBonusProduct = action.data;
      return newState;
    case Types.FETCH_ID_BONUS_PRODUCT:
      newState.bonusProductId = action.data;
      return newState;
    case Types.FETCH_BONUS_PRODUCT_ITEM:
      newState.bonusProductItem = action.data;
      return newState;
    default:
      return newState;
  }
};
