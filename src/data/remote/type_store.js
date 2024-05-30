import callApi from "../../ultis/apiCaller";

export const fetchAllData = () => {
    return callApi("/type_of_store", "get", null);
  };
  