import * as Types from "../constants/ActionType";
import * as placeApi from "../data/remote/place";

export const fetchPlaceDistrict = (id) => {
  return (dispatch) => {
    placeApi.fetchPlaceDistrict(id).then((res) => {
      console.log(res);

      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_PLACE_DISTRICT,
          data: res.data.data,
        });
    });
  };
};

export const fetchPlaceDistrict_Wards = (id) => {
  return (dispatch) => {
    placeApi.fetchPlaceDistrict(id).then((res) => {
      console.log(res);

      if (res.data.code !== 401) {
        dispatch({
          type: Types.FETCH_PLACE_DISTRICT,
          data: res.data.data,
        });

        if (res.data.data.length > 0) {
          placeApi.fetchPlaceWards(res.data.data[0].id).then((res) => {
            console.log(res);
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_PLACE_WARDS,
                data: res.data.data,
              });
          });
        }
      }
    });
  };
};

export const fetchPlaceProvince = () => {
  return (dispatch) => {
    placeApi.fetchPlaceProvince().then((res) => {
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_PLACE_PROVICE,
          data: res.data.data,
        });
    });
  };
};

export const fetchPlaceWards = (id) => {
  return (dispatch) => {
    placeApi.fetchPlaceWards(id).then((res) => {
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_PLACE_WARDS,
          data: res.data.data,
        });
    });
  };
};
