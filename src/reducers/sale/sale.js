import * as Types from "../../constants/ActionType";

var initialState = {
  config: {},
  allStep: [],
  addedSuccessfully: false,
  updatedSuccessfully: false,
  removedSuccessfully: false,
  addCustomerToSaleSuccessfully: false,
  statisticalUser: {},
  topCommission: {},
  listIdsCustomerFromSale: {},

  statistical: {},
  allCustomerOfSale: {},
  customerOfSale: {},
  addedCustomerOfSaleSuccessfully: false,
};

export const sale = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_SALE_CONFIG:
      newState.config = action.data;
      return newState;
    case Types.FETCH_ALL_SALE_STEP:
      newState.allStep = action.data;
      return newState;
    case Types.ADD_SALE_STEP:
      newState.addedSuccessfully = action.data;
      return newState;
    case Types.UPDATE_SALE_STEP:
      newState.updatedSuccessfully = action.data;
      return newState;
    case Types.REMOVE_SALE_STEP:
      newState.removedSuccessfully = action.data;
      return newState;
    case Types.ADD_CUSTOMER_TO_SALE:
      newState.addCustomerToSaleSuccessfully = action.data;
      return newState;
    case Types.STATISTICAL_SALE:
      newState.statistical = action.data;
      return newState;
    case Types.STATISTICAL_SALE_USER:
      newState.statisticalUser = action.data;
      return newState;
    case Types.FETCH_ALL_SALE_TOP_COMMISSION:
      newState.topCommission = action.data;
      return newState;
    case Types.FETCH_LIST_IDS_CUSTOMER_FROM_SALE:
      newState.listIdsCustomerFromSale = action.data;
      return newState;
    case Types.FETCH_ALL_CUSTOMER_OF_SALE:
      newState.allCustomerOfSale = action.data;
      return newState;
    case Types.FETCH_DETAIL_OF_CUSTOMER:
      newState.customerOfSale = action.data;
      return newState;
    case Types.ADD_CUSTOMER_OF_SALE:
      newState.addedCustomerOfSaleSuccessfully = action.data;
      return newState;
    case Types.UPDATE_CUSTOMER_OF_SALE:
      return newState;
    case Types.REMOVE_CUSTOMER_OF_SALE:
      return newState;

    default:
      return newState;
  }
};
