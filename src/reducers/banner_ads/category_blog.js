import * as Types from "../../constants/ActionType";

var initialState = {
  allBannerAds: [],
  bannerAdsID: {  },
  type: [],
};

export const bannerAds = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_BANNER_ADS:
      newState.allBannerAds = action.data;
      return newState;
    case Types.FETCH_ID_BANNER_ADS:
      newState.bannerAdsID = action.data;
      return newState;
   
    default:
      return newState;
  }
};
