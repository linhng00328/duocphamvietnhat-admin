import * as Types from "../../constants/ActionType";

var initialState = {
  voucher_img: "",



};

export const voucherImg = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {

    case Types.UPLOAD_VOUCHER_IMG:
      newState.voucher_img = action.data;
      return newState;
    default:
      return newState;
  }
};
