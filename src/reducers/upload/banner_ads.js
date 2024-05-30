import * as Types from "../../constants/ActionType";

var initialState = {
  bannerAds_img: "",
 



};

export const bannerAdsImg = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.UPLOAD_BANNER_ADS_IMG:
      newState.bannerAds_img = action.data;
      return newState;
  
    default:
      return newState;
  }
};
