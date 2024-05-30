import callApi from "../../ultis/apiCaller";

export const fetchAllRevenueExpenditures = (
  store_code,
  branch_id,
  page = 1,
  params
) => {
  return params
    ? callApi(
        `/store/${store_code}/${branch_id}/revenue_expenditures?page=${page}${params}`,
        "get",
        null
      )
    : callApi(
        `/store/${store_code}/${branch_id}/revenue_expenditures?page=${page}`,
        "get",
        null
      );
};
export const fetchRevenueExpendituresById = (
  store_code,
  branch_id,
  revenue_expenditure_id
) => {
  return callApi(
    `/store/${store_code}/${branch_id}/revenue_expenditures/${revenue_expenditure_id}`,
    "get",
    null
  );
};
export const createRevenueExpenditures = (store_code, branch_id, data) => {
  return callApi(
    `/store/${store_code}/${branch_id}/revenue_expenditures`,
    "post",
    data
  );
};
