import * as Types from "../../constants/ActionType";

var initialState = {
  listConnectEcommerce: {},
};

export const connect = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.LIST_CONNECT_ECOMMERCE:
      newState.listConnectEcommerce = action.data;
      return newState;
    default:
      return newState;
  }
};
