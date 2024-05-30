import callApi from "../../ultis/apiCaller";

export const fetchAllData = (store_code, branch_id) => {
  return callApi(
    `/store/${store_code}/store_address?branch_id=${branch_id??""}`,
    "get",
    null
  );
};
export const fetchShipConfig = (id) => {
  return callApi(`/store/${id}/config_ship`, "get", null);
};

export const updateShipConfig = (store_code, data) => {
  return callApi(`/store/${store_code}/config_ship`, "put", data);
};

export const fetchDataId = (id) => {
  return callApi(`/store/${id}`, "get", null);
};

export const createStoreA = (store_code, data) => {
  return callApi(`/store/${store_code}/store_address`, "post", data);
};

export const updateStoreA = (storeAId, storeA, store_code) => {
  return callApi(
    `/store/${store_code}/store_address/${storeAId}`,
    "put",
    storeA
  );
};

export const destroyStoreA = (store_code, storeAid) => {
  return callApi(
    `/store/${store_code}/store_address/${storeAid}`,
    "delete",
    null
  );
};
