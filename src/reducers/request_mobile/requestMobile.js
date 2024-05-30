import * as Types from "../../constants/ActionType";

var initialState = {
  allRequestMobile: [],
};

export const requestMobile = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_REQUEST_MOBILE:
      newState.allRequestMobile = action.data;
      return newState;

    default:
      return newState;
  }
};
