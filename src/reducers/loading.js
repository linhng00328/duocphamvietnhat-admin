import * as Types from "../constants/ActionType";
var initialState = {
  disable : "hide",
  disable_shipper : "initial",

  disable_lazy : "hide"
};

export const loadingReducers = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.SHOW_LOADING:
      newState.disable = action.loading;
      return newState;
      case Types.SHOW_LOADING_LAZY:
        newState.disable_lazy = action.loading;
        return newState;
        case Types.SHOW_LOADING_SHIPPER:
          newState.disable_shipper = action.loading;
          return newState;
    default:
      return newState;
  }
};
