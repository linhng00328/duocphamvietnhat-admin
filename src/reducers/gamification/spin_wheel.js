import * as Types from "../../constants/ActionType";

var initialState = {
  listGameSpinWheels: {},
  gameSpinWheels: {},
  deletedSuccessfully: false,
  listGiftGameSpinWheels: {},
  giftGameSpinWheels: {},
  saveSuccessfully: false,
  deletedGiftSuccessfully: false,
};

export const spin_wheel = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.LIST_GAME_SPIN_WHEELS:
      newState.listGameSpinWheels = action.data;
      return newState;
    case Types.GAME_SPIN_WHEELS:
      newState.gameSpinWheels = action.data;
      return newState;
    case Types.ADD_GAME_SPIN_WHEELS:
      newState.gameSpinWheels = action.data;
      return newState;
    case Types.UPDATE_GAME_SPIN_WHEELS:
      newState.gameSpinWheels = action.data;
      return newState;
    case Types.DELETE_GAME_SPIN_WHEELS:
      newState.deletedSuccessfully = action.data;
      return newState;
    case Types.LIST_GIFT_GAME_SPIN_WHEELS:
      newState.listGiftGameSpinWheels = action.data;
      return newState;
    case Types.SAVE_GIFT_GAME_SPIN_WHEELS:
      const newStateSpinWheel = JSON.parse(JSON.stringify(newState));
      const newListGiftGameSpinWheels =
        newStateSpinWheel.listGiftGameSpinWheels;
      newListGiftGameSpinWheels.data = [
        ...newStateSpinWheel.listGiftGameSpinWheels.data,
        action.data,
      ];

      newState.listGiftGameSpinWheels = newListGiftGameSpinWheels;
      return newState;
    case Types.SAVE_GIFT_GAME_SPIN_WHEELS_MESSAGE:
      newState.saveSuccessfully = action.data;
      return newState;
    case Types.ADD_GIFT_GAME_SPIN_WHEELS:
      newState.giftGameSpinWheels = action.data;
      return newState;
    case Types.UPDATE_GIFT_GAME_SPIN_WHEELS:
      newState.giftGameSpinWheels = action.data;
      return newState;
    case Types.DELETE_GIFT_GAME_SPIN_WHEELS:
      newState.deletedGiftSuccessfully = action.data;
      return newState;
    default:
      return newState;
  }
};
