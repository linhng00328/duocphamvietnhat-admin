import * as Types from "../../constants/ActionType";

var initialState = {
  allCategoryB: [],
  categoryBID: {  },
  type: [],
};

export const categoryBlog = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_CATEGORY_BLOG:
      newState.allCategoryB = action.data;
      return newState;
    case Types.FETCH_ID_CATEGORY_BLOG:
      newState.categoryBID = action.data;
      return newState;
   
    default:
      return newState;
  }
};
