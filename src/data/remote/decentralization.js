import callApi from "../../ultis/apiCaller";

export const fetchAllDecentralization = (store_code) => {
  return callApi(`/store/${store_code}/decentralizations`, "get", null);

};

export const fetchDecentralizationId = (store_code  , decentralizationId) => {
  return callApi(`/store/${store_code}/decentralizations/${decentralizationId}`, "get", null);
};

export const createDecentralization = (store_code,data) =>{
  return callApi(`/store/${store_code}/decentralizations`, "post", data);
}

export const updateDecentralization = (id, decentralization, store_code) =>{
  return callApi(`/store/${store_code}/decentralizations/${id}`, "put", decentralization);
}

export const destroyDecentralization = (store_code , id) =>{
  return callApi(`/store/${store_code}/decentralizations/${id}`, "delete", null);
}
