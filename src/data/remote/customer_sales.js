import callApi from "../../ultis/apiCaller";

export const fetchAllCustomerSale = (store_code, page, params, limit = 20) => {
  return params
    ? callApi(
        `/store/${store_code}/customer_sales?page=${page}${params}&limit=${limit}`,
        "get",
        null
      )
    : callApi(`/store/${store_code}/customer_sales?page=${page}`, "get", null);
};

export const fetchCustomerSaleId = (store_code, blogId) => {
  return callApi(`/store/${store_code}/customer_sales/${blogId}`, "get", null);
};
export const createCustomerSale = (store_code, data) => {
  return callApi(`/store/${store_code}/customer_sales`, "post", data);
};
export const createMultiCustomerSale = (store_code, data) => {
  return callApi(`/store/${store_code}/customer_sales/all`, "post", data);
};
export const editCustomerSale = (store_code, id, data) => {
  return callApi(`/store/${store_code}/customer_sales/${id}`, "put", data);
};
export const destroyCustomerSale = (store_code, id) => {
  return callApi(`/store/${store_code}/customer_sales/${id}`, "delete", null);
};
export const editMultiCustomerSale = (store_code, data) => {
  return callApi(`/store/${store_code}/customer_sales`, "put", data);
};
export const createMultiAccountForCustomerSale = (store_code, data) => {
  return callApi(
    `/store/${store_code}/customer_sales_send_to_customer`,
    "post",
    data
  );
};
