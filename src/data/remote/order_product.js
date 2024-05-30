import callApi from "../../ultis/apiCaller";

export const createOrder = (store_code, data) => {
  return callApi(`/store/${store_code}/pos/carts/items`, "post", data);
};
export const fetchAllData = (store_code, data) => {
  return callApi(`/store/${store_code}/pos/carts`, "post", data);
};
export const deleteProduct = (store_code, data) => {
  return callApi(`/store/${store_code}/pos/carts/items`, "put", data);
};
export const updateQuantityLineItem = (store_code, data) => {
  return callApi(`/store/${store_code}/pos/carts/items`, "put", data);
};
export const subQuantityProduct = (store_code, data) => {
  return callApi(`/store/${store_code}/pos/carts/items`, "put", data);
};
export const fetchAllVoucher = (store_code, params) => {
  return callApi(
    `/customer/${store_code}/vouchers${params ? `?${params}` : ""}`,
    "get"
  );
};
export const fetchAllPertion = (store_code) => {
  return callApi(`/store/${store_code}/customers`, "get");
};
export const fetchSearchPersion = (store_code, params) => {
  return callApi(`/store/${store_code}/customers?${params}`, "get", null);
};
export const createOrderBill = (store_code, data) => {
  return callApi(`/store/${store_code}/pos/carts/orders`, "post", data);
};
export const findAddress = (store_code, id) => {
  return callApi(`/store/${store_code}/customers/${id}`, "get");
};
export const fetchAllCombo = (store_code) => {
  return callApi(`/customer/${store_code}/combos`, "get");
};
