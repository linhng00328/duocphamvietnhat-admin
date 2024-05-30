import * as Types from "../../constants/ActionType";

var initialState = {
  popup_img: "",
 



};

export const popupImg = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.UPLOAD_POPUP_IMG:
      newState.popup_img = action.data;
      return newState;
  
    default:
      return newState;
  }
};
