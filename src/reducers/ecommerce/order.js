import * as Types from "../../constants/ActionType";

var initialState = {
  listOrders: {},
  totalSync: {},
  isLoadingSpinner: false,
};

export const order = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.LIST_ORDERS_ECOMMERCE:
      newState.listOrders = action.data;
      return newState;
    case Types.SYNC_ORDERS_FROM_STORES:
      newState.totalSync = action.data;
      return newState;
    case Types.SHOW_LOADING_SPINNERS:
      newState.isLoadingSpinner = action.loading;
      return newState;
    default:
      return newState;
  }
};
