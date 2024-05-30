import callApi from "../../ultis/apiCaller";

//User Management
export const fetchStaffConfig = (store_code) => {
  return callApi(`/store/${store_code}/staff_sale_configs`, "get", null);
};
export const fetchAllSteps = (store_code) => {
  return callApi(
    `/store/${store_code}/staff_sale_configs/bonus_steps`,
    "get",
    null
  );
};

export const addStep = (store_code, data) => {
  return callApi(
    `/store/${store_code}/staff_sale_configs/bonus_steps`,
    "post",
    data
  );
};
export const updateStep = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/staff_sale_configs/bonus_steps/${id}`,
    "put",
    data
  );
};
export const removeStep = (store_code, id) => {
  return callApi(
    `/store/${store_code}/staff_sale_configs/bonus_steps/${id}`,
    "delete",
    null
  );
};
export const updateConfig = (store_code, data) => {
  return callApi(`/store/${store_code}/staff_sale_configs`, "post", data);
};
export const addCustomerToSale = (store_code, data) => {
  return callApi(
    `/store/${store_code}/staff_sale_configs/add_customers_to_sale`,
    "post",
    data
  );
};
export const fetchStatisticalSaleForUser = (store_code, id) => {
  return callApi(
    `/store/${store_code}/staff_sale/overview?staff_id=${id}`,
    "get",
    null
  );
};
export const fetchAllTopCommission = (store_code, page = 1, params) => {
  if (params != null) {
    return callApi(
      `/store/${store_code}/staff_sale_configs/staff_sale_top?page=${page}${params}`,
      "get",
      null
    );
  }
  return callApi(
    `/store/${store_code}/staff_sale_configs/staff_sale_top?page=${page}`,
    "get",
    null
  );
};
export const fetchListIdsFromSale = (store_code, params) => {
  if (params != null) {
    return callApi(
      `/store/${store_code}/staff_sale_configs/get_ids_customer_staff_sale_top?${params}`,
      "get",
      null
    );
  }
  return callApi(
    `/store/${store_code}/staff_sale_configs/get_ids_customer_staff_sale_top`,
    "get",
    null
  );
};

//Sale Management
export const fetchStatisticalSale = (store_code) => {
  return callApi(
    `/store/${store_code}/staff_sale_configs/overview_one_sale`,
    "get",
    null
  );
};
export const fetchListCustomerOfSale = (store_code, page, params) => {
  return callApi(
    `/store/${store_code}/staff_sale/customers?page=${page}${
      params ? `${params}` : ""
    }`,
    "get",
    null
  );
};
export const fetchDetailCustomerOfSale = (store_code, id) => {
  return callApi(
    `/store/${store_code}/staff_sale/customers/${id}`,
    "get",
    null
  );
};
export const addCustomerOfSale = (store_code, data) => {
  return callApi(`/store/${store_code}/staff_sale/customers`, "post", data);
};
export const updateCustomerOfSale = (store_code, data, id) => {
  return callApi(
    `/store/${store_code}/staff_sale/customers/${id}`,
    "put",
    data
  );
};
export const deletedCustomerOfSale = (store_code, id) => {
  return callApi(
    `/store/${store_code}/staff_sale/customers/${id}`,
    "delete",
    null
  );
};
