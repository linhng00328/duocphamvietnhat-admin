import * as Types from "../../constants/ActionType";
import shallowEqual from "../../ultis/shallowEqual";
var initialState = {
  allShipment: [],
  shipmentID: [],
  calculate: [],
  listShipmentV2: [],
};

function getData(state, shipment) {
  var newItem = [...state];
  var newShipmen = [...shipment];
  console.log(newItem, newShipmen);
  for (var i = 0; i < newShipmen.length; i++) {
    // for (const [index,item] of state.entries()) {

    var check = false;
    for (var j = 0; j < state.length; j++) {
      if (
        newShipmen[i].partner_id == state[j].partner_id &&
        newShipmen[i].ship_type == state[j].ship_type
      ) {
        check = true;
        newItem[j] = newShipmen[i];
        break;
      }
    }

    if (check == false) newItem.push(newShipmen[i]);
  }
  return newItem;
}

export const shipment = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_SHIPMENT:
      newState.allShipment = action.data;
      return newState;
    case Types.FETCH_ALL_CALCULATE_SHIPMENT:
      newState.calculate =
        getData(newState.calculate, action.data) || newState.calculate;
      return newState;
    case Types.RESET_ALL_SHIPMENT:
      newState.allShipment = action.data;
      return newState;
    case Types.FETCH_ID_SHIPMENT:
      newState.shipmentID = action.data;
      return newState;
    case Types.FETCH_LIST_SHIPMENT:
      newState.listShipmentV2 = action.data;
      return newState;
    default:
      return newState;
  }
};
