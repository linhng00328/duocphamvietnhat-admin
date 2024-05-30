import callApi from "../../ultis/apiCaller";

export const fetchOverview = (store_code, branch_ids, params) => {
  if (branch_ids?.toString()?.includes(",")) {
    return params
      ? callApi(
          `/store/${store_code}/report/overview${params}&branch_ids=${branch_ids}`,
          "get",
          null
        )
      : callApi(
          `/store/${store_code}/report/overview?branch_ids=${branch_ids}`,
          "get",
          null
        );
  } else {
    return params
      ? callApi(
          `/store_v2/${store_code}/${branch_ids}/report/overview/v1${params}`,
          "get",
          null
        )
      : callApi(
          `/store_v2/${store_code}/${branch_ids}/report/overview/v1`,
          "get",
          null
        );
  }
};
export const fetchTopTenProduct = (store_code, branch_ids, params) => {
  if (branch_ids?.toString()?.includes(",")) {
    return callApi(
      `/store/${store_code}/report/top_ten_products${
        params
          ? `${params}&branch_ids=${branch_ids}`
          : `?branch_ids=${branch_ids}`
      }`,
      "get",
      null
    );
  } else {
    return callApi(
      `/store_v2/${store_code}/${branch_ids}/report/top_ten_products${params}`,
      "get",
      null
    );
  }
};
