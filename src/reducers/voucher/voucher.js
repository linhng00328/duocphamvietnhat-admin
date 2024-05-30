import * as Types from '../../constants/ActionType';

var initialState = {
  allVoucher: [],
  voucherId: {},
  listVoucherCodes: {},
  linkExport: {},
  listProductsByVoucherId: {},
};

export const voucher = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_VOUCHER:
      newState.allVoucher = action.data;
      return newState;
    case Types.FETCH_ID_VOUCHER:
      newState.voucherId = action.data;
      return newState;
    case Types.FETCH_ALL_VOUCHER_CODES:
      newState.listVoucherCodes = action.data;
      return newState;
    case Types.FETCH_EXPORT_VOUCHER_CODES:
      newState.linkExport = action.data;
      return newState;
    case Types.FETCH_LIST_PRODUCTS_BY_VOUCHER_ID:
      newState.listProductsByVoucherId = action.data;
      return newState;
    default:
      return newState;
  }
};