import callApi from "../../ultis/apiCaller";

export const fetchAllOtpUnit = (store_code) => {
  return callApi(`/store/${store_code}/otp_units`, "get", null);
};

export const createOtpUnit = (store_code, data) => {
  return callApi(`/store/${store_code}/otp_units`, "post", data);
};

export const destroyOtpUnit = (store_code, data) => {
  return callApi(`/store/${store_code}/otp_units`, "delete", data);
};

export const fetchOtpUnitId = (store_code, id) => {
  return callApi(`/store/${store_code}/otp_units/${id}`, "get", null);
};

export const updateOtpUnit = (store_code, id, data) => {
  return callApi(`/store/${store_code}/otp_units/${id}`, "put", data);
};

export const updateStatusOtpUnit = (store_code, id, data) => {
  return callApi(`/store/${store_code}/otp_units/${id}/status`, "put", data);
};

export const fetchHistorySMS = (store_code, params) => {
  return callApi(
    `/store/${store_code}/otp_histories${params ? `?${params}` : ""}`,
    "get",
    null
  );
};
