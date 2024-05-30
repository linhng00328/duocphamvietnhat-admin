import callApi from "../../ultis/apiCaller";

export const fetchCollaboratorConf = (store_code) => {
  return callApi(`/store/${store_code}/collaborator_configs`, "get", null);
};
export const fetchAllSteps = (store_code) => {
  return callApi(
    `/store/${store_code}/collaborator_configs/bonus_steps`,
    "get",
    null
  );
};
export const createStep = (store_code, data) => {
  return callApi(
    `/store/${store_code}/collaborator_configs/bonus_steps`,
    "post",
    data
  );
};

export const destroyStep = (store_code, id) => {
  return callApi(
    `/store/${store_code}/collaborator_configs/bonus_steps/${id}`,
    "delete",
    null
  );
};

export const updateStep = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/collaborator_configs/bonus_steps/${id}`,
    "put",
    data
  );
};

export const updateConfig = (store_code, data) => {
  return callApi(`/store/${store_code}/collaborator_configs`, "post", data);
};

export const fetchAllCollaborator = (store_code, page = 1, params) => {
  if (params)
    return callApi(
      `/store/${store_code}/collaborators?page=${page}${params}`,
      "get",
      null
    );
  else
    return callApi(
      `/store/${store_code}/collaborators?page=${page}`,
      "get",
      null
    );
};

export const fetchAllCollaboratorRegisterRequests = (
  store_code,
  page = 1,
  params
) => {
  if (params)
    return callApi(
      `/store/${store_code}/collaborator_register_requests?page=${page}${params}`,
      "get",
      null
    );
  else
    return callApi(
      `/store/${store_code}/collaborator_register_requests?page=${page}`,
      "get",
      null
    );
};

export const handleCollaboratorRegisterRequest = (store_code, id, status) => {
  return callApi(
    `/store/${store_code}/collaborator_register_requests/${id}/status`,
    "put",
    { status }
  );
};

export const fetchAllRequestPayment = (store_code, params) => {
  if (params)
    return callApi(
      `/store/${store_code}/collaborators/request_payment/current?param=true${params}`,
      "get",
      null
    );
  else
    return callApi(
      `/store/${store_code}/collaborators/request_payment/current`,
      "get",
      null
    );
};
export const fetchAllHistory = (store_code, page, params) => {
  if (params)
    return callApi(
      `/store/${store_code}/collaborators/request_payment/history${params}`,
      "get",
      null
    );
  else
    return callApi(
      `/store/${store_code}/collaborators/request_payment/history`,
      "get",
      null
    );
};
export const updateRequestPayment = (store_code, data) => {
  return callApi(
    `/store/${store_code}/collaborators/request_payment/change_status`,
    "post",
    data
  );
};

export const updateAllRequestPayment = (store_code) => {
  return callApi(
    `/store/${store_code}/collaborators/request_payment/settlement`,
    "post",
    null
  );
};
export const updateCollaborator = (store_code, id, data) => {
  return callApi(`/store/${store_code}/collaborators/${id}`, "put", data);
};

export const updateBankInfoCollaborator = (store_code, id, data) => {
  return callApi(`/store/${store_code}/collaborators/${id}/updateBankInfo`, "put", data);
};
export const fetchAllTopReport = (store_code, page = 1, params) => {
  if (params != null) {
    return callApi(
      `/store/${store_code}/collaborators/report?page=${page}${params}`,
      "get",
      null
    );
  }

  return callApi(
    `/store/${store_code}/collaborators/report?page=${page}`,
    "get",
    null
  );
};
export const historiesBalanceCollaborator = (store_code, id, queryString) => {
  return callApi(
    `/store/${store_code}/collaborators/${id}/history_balance?${queryString}`,
    "get",
    null
  );
};
export const changePriceBalance = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/collaborators/${id}/add_sub_balance`,
    "post",
    data
  );
};
