import callApi from "../../ultis/apiCaller";

export const fetchAllTimeSheet = (store_code, branch_id, params) => {
  return params
    ? callApi(
        `/store_v2/${store_code}/${branch_id}/timekeeping/calculate?${params}`,
        "get",
        null
      )
    : callApi(
        `/store_v2/${store_code}/${branch_id}/timekeeping/calculate`,
        "get",
        null
      );
};
export const bonusLessCheckinCheckout = (store_code, branch_id, data) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/bonus_less_checkin_checkout`,
    "post",
    data
  );
};
