import * as Types from "../../constants/ActionType";

var initialState = {
  combo_img: "",
 



};

export const comboImg = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.UPLOAD_COMBO_IMG:
      newState.combo_img = action.data;
      return newState;
  
    default:
      return newState;
  }
};
