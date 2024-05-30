import * as Types from "../../constants/ActionType";

var initialState = {
  allRewardPoint: {  },
};

export const reward_point = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_REWARD_POINT:
  
      newState.allRewardPoint = action.data;
      return newState;
 
   
    default:
      return newState;
  }
};
