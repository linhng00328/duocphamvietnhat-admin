import * as Types from '../../constants/ActionType';

var initialState = {
  product_img: '',
  listImgProduct: [],
  listImgProductV2: [],
  listImgDistribute: [],
  product_video: '',
  loadingImg: false,
};

export const productImg = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.UPLOAD_PRODUCT_IMG:
      newState.product_img = action.data;
      return newState;
    case Types.UPLOAD_PRODUCT_VIDEO:
      newState.product_video = action.data;
      return newState;
    case Types.UPLOAD_ALL_PRODUCT_IMG:
      newState.listImgProduct = action.data;
      return newState;
    case Types.LOADING_UPLOAD_ALL_PRODUCT_IMG:
      newState.loadingImg = action.loading;
      return newState;
    case Types.UPLOAD_ALL_PRODUCT_IMG_V2:
      newState.listImgProductV2 = action.data;
      return newState;
    case Types.UPLOAD_ALL_DISTRIBUTE_IMG:
      newState.listImgDistribute = action.data;
      return newState;
    default:
      return newState;
  }
};
