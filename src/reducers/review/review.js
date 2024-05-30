import * as Types from "../../constants/ActionType";

var initialState = {
  allReview: [],
};

export const review = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_REVIEW:
      newState.allReview = action.data;
      return newState;

    default:
      return newState;
  }
};
