import * as Types from "../../constants/ActionType";

var initialState = {
  allPopup: [],
  popupID: {  },
  type: [],
};

export const popup = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_POPUP:
      newState.allPopup = action.data;
      return newState;
    case Types.FETCH_ID_POPUP:
      newState.popupID = action.data;
      return newState;
   
    default:
      return newState;
  }
};
