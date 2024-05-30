import callApi from "../../ultis/apiCaller";

export const fetchAllInventory = (store_code, branch_id, page, params) => {
  return params
    ? callApi(
        `/store/${store_code}/${branch_id}/inventory/tally_sheets?page=${page}${params}`,
        "get",
        null
      )
    : callApi(
        `/store/${store_code}/${branch_id}/inventory/tally_sheets?page=${page}`,
        "get",
        null
      );
};
export const createInventorys = (store_code, branch_id, data) => {
  return callApi(
    `/store/${store_code}/${branch_id}/inventory/tally_sheets`,
    "post",
    data
  );
};

export const fetchDetailInventory = (store_code, branch_id, id) => {
  return callApi(
    `/store/${store_code}/${branch_id}/inventory/tally_sheets/${id}`,
    "get",
    null
  );
};
export const handleBalanceInventory = (store_code, branch_id, id) => {
  return callApi(
    `/store/${store_code}/${branch_id}/inventory/tally_sheets/${id}/balance`,
    "post",
    null
  );
};
export const deleteItemInventory = (store_code, branch_id, id) => {
  return callApi(
    `/store/${store_code}/${branch_id}/inventory/tally_sheets/${id}`,
    "delete",
    null
  );
};
export const editInventorys = (store_code, branch_id, id, data) => {
  return callApi(
    `/store/${store_code}/${branch_id}/inventory/tally_sheets/${id}`,
    "put",
    data
  );
};
export const historyInventorys = (store_code, branch_ids, data, page = 1) => {
  if (branch_ids?.toString()?.includes(",")) {
    return callApi(
      `/store/${store_code}/inventory/history?page=${page}&branch_ids=${branch_ids}`,
      "post",
      data
    );
  } else {
    return callApi(
      `/store/${store_code}/${branch_ids}/inventory/history?page=${page}`,
      "post",
      data
    );
  }
};
