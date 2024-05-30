import * as Types from "../../constants/ActionType";

var initialState = {
  allProduct: {},
  productId: {},
  allProductList: {},
  allProductTiki: {},
  allProductSendo: {},
  allProductShopee: {},
  allProductRetailSteps: [],
  product_agency_price_id: {},
  countProductNearlyOutStock: 0,
  messageImport: {},
};

export const product = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_PRODUCT:
      newState.allProduct = action.data;
      return newState;

    case Types.SUCCESS_EDIT_ITEM_PRODUCT_IN_LIST:
      var dataNew = {
        ...state.allProduct,
      };
      dataNew.data = newState.allProduct.data.map((ele) => {
        if (ele.id == action.data.id) {
          return action.data;
        } else {
          return ele;
        }
      });
      newState.allProduct = dataNew;
      return newState;
    case Types.FETCH_ID_PRODUCT:
      newState.productId = action.data;
      return newState;
    case Types.FETCH_ALL_PRODUCT_LIST:
      newState.allProductList = action.data;
      return newState;
    case Types.FETCH_ALL_PRODUCT_TIKI:
      newState.allProductTiki = action.data;
      return newState;
    case Types.FETCH_ALL_PRODUCT_SHOPEE:
      newState.allProductShopee = action.data;
      return newState;
    case Types.FETCH_ALL_PRODUCT_SENDO:
      newState.allProductSendo = action.data;
      return newState;
    case Types.FETCH_ID_PRODUCT_AGENCY_PRICE:
      newState.product_agency_price_id = action.data;
      return newState;
    case Types.IMPORT_FILE_PRODUCTS:
      newState.messageImport = action.data;
      return newState;
    case Types.FETCH_AMOUNT_PRODUCT_NEARLY_OUT_STOCK:
      newState.countProductNearlyOutStock = action.data;
      return newState;
    case Types.FETCH_ALL_PRODUCT_RETAIL_STEPS:
      newState.allProductRetailSteps = action.data;
      return newState;
    default:
      return newState;
  }
};
