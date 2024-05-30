import * as Types from "../../constants/ActionType"
const initState = {
    sheetsInventory:[],
    itemInventory:[],
    historyInventory:[],
}

export const inventory_reducer =(state = initState,action) =>{
    let newState = { ...state };
    switch (action.type) {
        case Types.FETCH_ALL_SHEETS_INVENTORY:
          newState.sheetsInventory = action.data;
          return newState;
        case Types.FETCH_ALL_ITEM_INVENTORY:
          newState.itemInventory = action.data;
          return newState;
        case Types.FETCH_ALL_HISTORY_INVENTORY:
          newState.historyInventory = action.data;
          return newState;
        default:
          return newState;
      }
}