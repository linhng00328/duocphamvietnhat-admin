import * as Types from '../../constants/ActionType';

var initialState = {
  listOrder: [],
  listVoucher: [],
  listPertion: [],
  inforOnePersion: [],
  listCombo: [],
};

export const order_product = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_ORDER_PRODUCT:
      newState.listOrder = action.data;
      return newState;
    case Types.FETCH_ALL_VOUCHER_PRODUCT:
      newState.listVoucher = action.data;
      return newState;
    case Types.FETCH_ALL_PERTION_INFO:
      newState.listPertion = action.data;
      return newState;
    case Types.FETCH_SEARCH_PERSION:
      newState.listPertion = action.data;
      return newState;
    case Types.FETCH_INFO_PERSION:
      newState.inforOnePersion = action.data;
      return newState;
    case Types.FETCH_ALL_COMBO_PRODUCT:
      newState.listCombo = action.data;
      return newState;
    default:
      return newState;
  }
};
