import callApi from "../../ultis/apiCaller";

export const fetchAllBonusProduct = (store_code) => {
  return callApi(`/store/${store_code}/bonus_product`, "get", null);
};

export const fetchAllBonusProductEnd = (store_code, page) => {
  return callApi(
    `/store/${store_code}/bonus_product_end?page=${page}`,
    "get",
    null
  );
};

export const fetchBonusProductId = (store_code, id) => {
  return callApi(`/store/${store_code}/bonus_product/${id}`, "get", null);
};

export const createBonusProduct = (store_code, data) => {
  return callApi(`/store/${store_code}/bonus_product`, "post", data);
};

export const updateBonusProduct = (store_code, data, id) => {
  return callApi(`/store/${store_code}/bonus_product/${id}`, "put", data);
};

export const destroyBonusProduct = (store_code, id) => {
  return callApi(`/store/${store_code}/bonus_product/${id}`, "delete", null);
};

export const upload = (file) => {
  return callApi(`/images`, "post", file);
};

export const fetchBonusProductItem = (store_code, id, params) => {
  return callApi(
    `/store/${store_code}/bonus_product/${id}/bonus_product_item${
      params ? `?${params}` : ""
    }`,
    "get",
    null
  );
};

export const createBonusProductItem = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/bonus_product/${id}/bonus_product_item`,
    "post",
    data
  );
};

export const updateBonusProductItem = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/bonus_product/${id}/bonus_product_item`,
    "put",
    data
  );
};

export const destroyBonusProductItem = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/bonus_product/${id}/bonus_product_item`,
    "delete",
    data
  );
};
