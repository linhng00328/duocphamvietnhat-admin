import callApi from "../../ultis/apiCaller";

export const fetchHistoryOperation = (store_code, params) => {
  return callApi(
    `/store/${store_code}/operation_histories${params ? `?${params}` : ""}`,
    "get",
    null
  );
};
