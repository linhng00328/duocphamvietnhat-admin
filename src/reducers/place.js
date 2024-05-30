
import * as Types from "../constants/ActionType";

var initialState = {
    province: [],
    district: [],
    wards: []
};

export const placeReducers = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case Types.FETCH_PLACE_PROVICE:
            newState.province = action.data;
            return newState;
        case Types.FETCH_PLACE_DISTRICT:
            newState.district = action.data;
            return newState;
        case Types.FETCH_PLACE_WARDS:
            newState.wards = action.data;
            return newState;
        default:
            return newState;
    }
};

