import * as Types from "../../constants/ActionType";

var initialState = {
  allCustomer: [],
  customerID: {},
  type: [],
  isFromPosAndSave: false,
  customerCreated: {},
};

export const customer_sales = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_CUSTOMER_SALE:
      newState.allCustomer = action.data;
      return newState;
    case Types.FETCH_ID_CUSTOMER_SALE:
      newState.customerID = action.data;
      return newState;
    case Types.CREATED_CUSTOMER_SALE:
      newState.isFromPosAndSave = action.isFromPosAndSave;
      newState.customerCreated = action.data;
      return newState;
    case Types.CREATE_ACCOUNT_FOR_CUSTOMER_SALE:
      const { list_ids } = action.data;
      const copyState = JSON.parse(JSON.stringify(newState));
      const newAllCustomers = [];
      copyState.allCustomer.data.forEach((element) => {
        if (list_ids.includes(element.id)) {
          const newCustomer = { ...element };
          newCustomer.has_customer = true;
          newAllCustomers.push(newCustomer);
          return;
        }
        newAllCustomers.push(element);
      });
      copyState.allCustomer.data = newAllCustomers;
      newState.allCustomer = copyState.allCustomer;
      return newState;

    default:
      return newState;
  }
};
