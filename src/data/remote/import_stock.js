import callApi from "../../ultis/apiCaller";

export const fetchAllImportStock = (store_code, branch_id, page, params) => {
  return params
    ? callApi(
        `/store/${store_code}/${branch_id}/inventory/import_stocks?page=${page}${params}`,
        "get",
        null
      )
    : callApi(
        `/store/${store_code}/${branch_id}/inventory/import_stocks?page=${page}`,
        "get",
        null
      );
};
export const createImportStocks = (store_code, branch_id, data) => {
  return callApi(
    `/store/${store_code}/${branch_id}/inventory/import_stocks`,
    "post",
    data
  );
};
export const updateImportStock = (store_code, branch_id, id, data) => {
  return callApi(
    `/store/${store_code}/${branch_id}/inventory/import_stocks/${id}`,
    "put",
    data
  );
};
export const fetchDetailImportStock = (store_code, branch_id, id) => {
  return callApi(
    `/store/${store_code}/${branch_id}/inventory/import_stocks/${id}`,
    "get",
    null
  );
};
export const changeStatus = (store_code, branch_id, id, data) => {
  return callApi(
    `/store/${store_code}/${branch_id}/inventory/import_stocks/${id}/status`,
    "put",
    data
  );
};

export const chooseMethorPayment = (store_code, branch_id, id, data) => {
  return callApi(
    `/store/${store_code}/${branch_id}/inventory/import_stocks/${id}/payment`,
    "put",
    data
  );
};

export const postRefund = (id, data, store_code, branch_id) => {
  return callApi(
    `/store/${store_code}/${branch_id}/inventory/import_stocks/${id}/refund`,
    "post",
    data
  );
};

export const printImportStock = (store_code, branch_id, id) => {
  return callApi(
    `/store/${store_code}/${branch_id}/inventory/import_stocks/${id}/print`,
    "get",
    null
  );
};
