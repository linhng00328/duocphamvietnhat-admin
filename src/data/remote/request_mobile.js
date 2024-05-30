import callApi from "../../ultis/apiCaller";

export const fetchAllRequestMobile = (store_code, branch_id , page , params) => {

    if (params)
    return callApi(
      `/store_v2/${store_code}/${branch_id}/await_mobile_checkins?page=${page}${params}`,
      "get",
      null
    );
    else
    return callApi(
      `/store_v2/${store_code}/${branch_id}/await_mobile_checkins`,
      "get",
      null
    );
};

export const updateStatus = (store_code, branch_id, id, data) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/await_mobile_checkins/${id}/change_status`,
    "post",
    data
  );
};
