import * as Types from "../../constants/ActionType";

var initialState = {
  allDecentralization: [],
  decentralizationID: {  },
  type: [],
};

export const decentralization = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_DECENTRALIZATION:
      newState.allDecentralization = action.data;
      return newState;
    case Types.FETCH_ID_DECENTRALIZATION:
      newState.decentralizationID = action.data;
      return newState;
   
    default:
      return newState;
  }
};
