import * as Types from "../../constants/ActionType";

var initialState = {
  groupCustomer: [],
  createdCustomer: {},
  updatedCustomer: {},
  groupCustomerById: {},
  messageDeleted: "",
};

export const group_customer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_GROUP_CUSTOMER:
      newState.groupCustomer = action.data;
      return newState;
    case Types.FETCH_GROUP_CUSTOMER:
      newState.groupCustomerById = action.data;
      return newState;
    case Types.CREATE_GROUP_CUSTOMER:
      newState.createdCustomer = action.data;
      return newState;
    case Types.UPDATE_GROUP_CUSTOMER:
      newState.updatedCustomer = action.data;
      return newState;
    case Types.DELETE_GROUP_CUSTOMER:
      newState.messageDeleted = action.message;
      return newState;
    default:
      return newState;
  }
};
