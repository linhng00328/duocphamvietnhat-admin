import * as Types from "../../constants/ActionType";

var initialState = {
 data : {},
 isLoadConfigUser : false
};

export const vip_user = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_CONFIG_VIP_USER:
      newState.data = action.data;
      return newState;
     
    default:
      return newState;
  }
};
