import callApi from "../../ultis/apiCaller";

export const fetchAllCalendarShift = (store_code, branch_id, params) => {
  return params
    ? callApi(
        `/store_v2/${store_code}/${branch_id}/calendar_shifts?${params}`,
        "get",
        null
      )
    : callApi(
        `/store_v2/${store_code}/${branch_id}/calendar_shifts`,
        "get",
        null
      );
};
export const fetchCalendarShiftId = (store_code, branch_id, id) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/calendar_shifts/${id}`,
    "get",
    null
  );
};
export const putOne = (store_code, branch_id, data) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/calendar_shifts/put_one`,
    "post",
    data
  );
};
export const putALot = (store_code, branch_id, data) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/calendar_shifts/put_a_lot`,
    "post",
    data
  );
};
