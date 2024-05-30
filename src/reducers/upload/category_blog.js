import * as Types from "../../constants/ActionType";

var initialState = {
  categoryB_img: "",
 



};

export const categoryBImg = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.UPLOAD_CATEGORY_BLOG_IMG:
      newState.categoryB_img = action.data;
      return newState;
  
    default:
      return newState;
  }
};
