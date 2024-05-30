import callApi from "../../ultis/apiCaller";

export const fetchListConnectEcommerce = (store_code, params) => {
  return callApi(
    `/store/${store_code}/ecommerce/connect/list${params ? `?${params}` : ""}`,
    "get",
    null
  );
};

export const connectEcommerce = (platform, store_code) => {
  return callApi(
    `/store/ecommerce/connect/${platform}?store_code=${store_code}`,
    "get",
    null
  );
};

export const updateConnectEcommerce = (store_code, shop_id, data) => {
  return callApi(
    `/store/${store_code}/ecommerce/connect/list/${shop_id}`,
    "put",
    data
  );
};
export const disconnectEcommerce = (store_code, shop_id) => {
  return callApi(
    `/store/${store_code}/ecommerce/connect/list/${shop_id}`,
    "delete",
    null
  );
};

export const fetchListProductEcommerce = (store_code, params) => {
  return callApi(
    `/store/${store_code}/ecommerce/db/products${params ? `?${params}` : ""}`,
    "get",
    null
  );
};

export const syncProductEcommerce = (store_code, data) => {
  return callApi(`/store/${store_code}/ecommerce/products/sync`, "post", data);
};

export const updatePriceProductEcommerce = (store_code, data, id) => {
  return callApi(
    `/store/${store_code}/ecommerce/db/products/${id}`,
    "put",
    data
  );
};

export const fetchListOrderEcommerce = (store_code, params) => {
  return callApi(
    `/store/${store_code}/ecommerce/db/orders${params ? `?${params}` : ""}`,
    "get",
    null
  );
};
export const syncOrderEcommerce = (store_code, data) => {
  return callApi(`/store/${store_code}/ecommerce/orders/sync`, "post", data);
};
