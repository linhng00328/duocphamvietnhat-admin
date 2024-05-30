import callApi from "../../ultis/apiCaller";

export const fetchGroupCustomer = (store_code, params) => {
  return callApi(
    `/store/${store_code}/group_customers${params ? `?${params}` : ""}`,
    "get",
    null
  );
};

export const fetchListCustomerByGroup = (
  store_code,
  idGroupCustomer,
  params
) => {
  return callApi(
    `/store/${store_code}/group_customers/${idGroupCustomer}/customers${
      params ? `?${params}` : ""
    }`,
    "get",
    null
  );
};

export const fetchGroupCustomerById = (store_code, idGroupCustomer) => {
  return callApi(
    `/store/${store_code}/group_customers/${idGroupCustomer}`,
    "get",
    null
  );
};

export const createGroupCustomer = (store_code, data) => {
  return callApi(`/store/${store_code}/group_customers`, "post", data);
};

export const updateGroupCustomer = (store_code, idGroupCustomer, data) => {
  return callApi(
    `/store/${store_code}/group_customers/${idGroupCustomer}`,
    "put",
    data
  );
};

export const deleteGroupCustomer = (store_code, idGroupCustomer) => {
  return callApi(
    `/store/${store_code}/group_customers/${idGroupCustomer}`,
    "delete",
    null
  );
};
