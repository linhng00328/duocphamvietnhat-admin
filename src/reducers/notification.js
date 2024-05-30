import * as Types from '../constants/ActionType';

var initialState = {
  allNotificaiton: [],
  generalSetting: [],
  publicApiConfig: {},
};

export const notificationReducers = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_NOTIFICATION:
      newState.allNotificaiton = action.data;
      return newState;
    case Types.FETCH_ALL_GENERAL_SETTING:
      newState.generalSetting = action.data;
      return newState;
    case Types.FETCH_PUBLIC_API_CONFIG:
      newState.publicApiConfig = action.data;
      return newState;
    default:
      return newState;
  }
};
