import * as Types from "../../constants/ActionType";

var initialState = {
  allPayment: [],
  paymentID: [],
};

export const payment = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_PAYMENT:
      newState.allPayment = action.data;
      return newState;
    case Types.FETCH_ID_PAYMENT:
      newState.paymentID = action.data;
      return newState;
    default:
      return newState;
  }
};
