import callApi from "../../ultis/apiCaller";

export const fetchAllBadge = (store_code, branch_ids) => {
  if (branch_ids) {
    if (branch_ids?.toString()?.includes(",")) {
      return callApi(
        `/store/${store_code}/badges?branch_ids=${branch_ids}`,
        "get",
        null
      );
    } else {
      return callApi(
        `/store_v2/${store_code}/${branch_ids}/badges/v1`,
        "get",
        null
      );
    }
  } else return callApi(`/store/${store_code}/badges`, "get", null);
};
