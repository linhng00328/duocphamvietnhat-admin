import * as Types from "../../constants/ActionType";

var initialState = {
  discount_img: "",
 



};

export const discountImg = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.UPLOAD_DISCOUNT_IMG:
      newState.discount_img = action.data;
      return newState;
  
    default:
      return newState;
  }
};
