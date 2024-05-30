import callApi from "../../ultis/apiCaller";

export const fetchPlaceDistrict = (id) => {
  return callApi(`/place/vn/district/${id}`, "get", null);
};

export const fetchPlaceProvince = () => {
  return callApi(`/place/vn/province`, "get", null);
};
export const fetchPlaceWards = (id) => {
  return callApi(`/place/vn/wards/${id}`, "get", null);
};