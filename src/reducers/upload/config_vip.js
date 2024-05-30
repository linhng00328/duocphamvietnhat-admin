import * as Types from "../../constants/ActionType";

var initialState = {
  login_img: "",
 
  logo_img: "",
  logo_after_img: "",



};

export const configVipImg = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.UPLOAD_CONFIG_VIP_IMG_LOGIN:
      newState.login_img = action.data;
      return newState;
      case Types.UPLOAD_CONFIG_VIP_IMG_LOGO:
      newState.logo_img = action.data;
      return newState;
      case Types.UPLOAD_CONFIG_VIP_IMG_LOGO_AFTER:
      newState.logo_after_img = action.data;
      return newState;
  
    default:
      return newState;
  }
};
