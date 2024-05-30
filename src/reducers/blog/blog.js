import * as Types from "../../constants/ActionType";

var initialState = {
  allBlog: [],
  blogID: {  },
  type: [],
  blogList: {}, //this variable is duplicate allBlog, it create to add new to make pagination
};

export const blog = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_BLOG:
      newState.allBlog = action.data;
      newState.blogList = action.data;
      return newState;
    case Types.FETCH_ID_BLOG:
      newState.blogID = action.data;
      return newState;
    default:
      return newState;
  }
};
