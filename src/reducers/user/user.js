import * as Types from "../../constants/ActionType";

var initialState = {
  userID: {  },
};

export const user = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ID_USER:
      newState.userID = action.data;
      return newState;
 
   
    default:
      return newState;
  }
};
