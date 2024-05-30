import * as Types from "../../constants/ActionType";

var initialState = {
  listProducts: {},
  totalSync: {},
  isLoadingSpinner: false,
};

export const product = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.LIST_PRODUCTS_ECOMMERCE:
      newState.listProducts = action.data;
      return newState;
    case Types.SYNC_PRODUCTS_FROM_STORES:
      newState.totalSync = action.data;
      return newState;
    case Types.SHOW_LOADING_SPINNERS:
      newState.isLoadingSpinner = action.loading;
      return newState;
    default:
      return newState;
  }
};
