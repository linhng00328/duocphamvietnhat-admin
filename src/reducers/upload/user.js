import * as Types from "../../constants/ActionType";

var initialState = {
  user_img: "",
 



};

export const userImg = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.UPLOAD_USER_IMG:
      newState.user_img = action.data;
      return newState;
  
    default:
      return newState;
  }
};
