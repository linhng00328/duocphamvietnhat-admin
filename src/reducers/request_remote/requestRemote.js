import * as Types from "../../constants/ActionType";

var initialState = {
  allRequestRemote: [],
};

export const requestRemote = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_REQUEST_REMOTE:
      newState.allRequestRemote = action.data;
      return newState;

    default:
      return newState;
  }
};
