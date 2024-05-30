import callApi from "../../ultis/apiCaller";
export const fetchStaffMobileCheckin = (
  store_code,
  branch_id,
  request_mobile_id
) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/mobile_checkin/staff/${request_mobile_id}`,
    "get",
    null
  );
};
