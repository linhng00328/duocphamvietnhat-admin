import * as Types from "../../constants/ActionType";

var initialState = {
    face_img: "",
    logo_img: "",
    favicon_img: "",




};

export const themeImg = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case Types.UPLOAD_THEME_IMG_FACE:
            newState.face_img = action.data;
            return newState;
        case Types.UPLOAD_THEME_IMG_LOGO:
            newState.logo_img = action.data;
            return newState;
        case Types.UPLOAD_THEME_IMG_FAVICON:
            newState.favicon_img = action.data;
            return newState;
        default:
            return newState;
    }
};
