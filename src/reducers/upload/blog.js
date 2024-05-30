import * as Types from "../../constants/ActionType";

var initialState = {
  blog_img: "",
 



};

export const blogImg = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.UPLOAD_BLOG_IMG:
      newState.blog_img = action.data;
      return newState;
  
    default:
      return newState;
  }
};
