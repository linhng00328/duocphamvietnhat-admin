import callApi from "../../ultis/apiCaller";

export const fetchAllShift = (store_code, branch_id, page = 1, params) => {
  return params
    ? callApi(
        `/store_v2/${store_code}/${branch_id}/shifts?page=${page}${params}`,
        "get",
        null
      )
    : callApi(
        `/store_v2/${store_code}/${branch_id}/shifts?page=${page}`,
        "get",
        null
      );
};

export const fetchShiftId = (store_code, branch_id, id) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/shifts/${id}`,
    "get",
    null
  );
};

export const createShift = (store_code, branch_id, data) => {
  return callApi(`/store_v2/${store_code}/${branch_id}/shifts`, "post", data);
};

export const updateShift = (store_code, branch_id, data, id) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/shifts/${id}`,
    "put",
    data
  );
};

export const destroyShift = (store_code, branch_id, id) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/shifts/${id}`,
    "delete",
    null
  );
};
