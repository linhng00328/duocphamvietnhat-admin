import * as Types from "../../constants/ActionType";

var initialState = {
  allChat: [],
  chatID: [],
  message : {}
};

export const chat = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_CHAT:
      newState.allChat = action.data;
      return newState;
    case Types.FETCH_ID_CHAT:
      newState.chatID = action.data;
      return newState;
      case Types.FETCH_ID_CHAT_USER:
        newState.message = action.data;
        return newState;
    default:
      return newState;
  }
};
