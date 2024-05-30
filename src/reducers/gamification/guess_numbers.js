import * as Types from "../../constants/ActionType";

var initialState = {
  listGameGuessNumbers: {},
  gameGuessNumbers: {},
  deletedSuccessfully: false,
};

export const guess_numbers = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.LIST_GAME_GUESS_NUMBERS:
      newState.listGameGuessNumbers = action.data;
      return newState;
    case Types.GAME_GUESS_NUMBERS:
      newState.gameGuessNumbers = action.data;
      return newState;
    case Types.ADD_GAME_GUESS_NUMBERS:
      newState.gameGuessNumbers = action.data;
      return newState;
    case Types.UPDATE_GAME_GUESS_NUMBERS:
      newState.gameGuessNumbers = action.data;
      return newState;
    case Types.DELETE_GAME_GUESS_NUMBERS:
      newState.deletedSuccessfully = action.data;
      return newState;

    default:
      return newState;
  }
};
