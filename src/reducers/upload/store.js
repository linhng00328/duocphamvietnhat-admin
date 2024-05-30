import * as Types from "../../constants/ActionType";

var initialState = {
  store_img: "",
 



};

export const storeImg = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.UPLOAD_STORE_IMG:
      newState.store_img = action.data;
      return newState;
  
    default:
      return newState;
  }
};
