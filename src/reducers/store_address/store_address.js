import * as Types from "../../constants/ActionType";

var initialState = {
  allStoreA: [],
  storeAID: { store_code: "", name: "", address: "", id_type_of_store: "" },
  type: [],
  shipConfig : {}
};

export const storeAddress = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_STORE_ADDRESS:
      newState.allStoreA = action.data;
      return newState;
    case Types.FETCH_ID_STORE_ADDRESS:
      newState.storeAID = action.data;
      return newState;
      case Types.FETCH_SHIP_CONFIG:
        newState.shipConfig = action.data;
        return newState;
    default:
      return newState;
  }
};
