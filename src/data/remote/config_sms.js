import callApi from "../../ultis/apiCaller";

export const fetchSmsConfig = (store_code) => {
  return callApi(`/store/${store_code}/otp_configs`, "get", null);
};

export const updateSmsConfig = (store_code, data, id) => {
  return callApi(`/store/${store_code}/otp_configs/${id}`, "put", data);
};
