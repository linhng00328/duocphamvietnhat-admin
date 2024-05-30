import callApi from "../../ultis/apiCaller";

export const fetchAgencyConf = (store_code) => {
  return callApi(`/store/${store_code}/agency_configs`, "get", null);
};
export const sortAgencyType = (store_code, data) => {
  return callApi(`/store/${store_code}/sort_agency_type`, "post", data);
};
//Doanh số hoa hồng
export const fetchAllSteps = (store_code) => {
  return callApi(
    `/store/${store_code}/agency_configs/bonus_steps`,
    "get",
    null
  );
};
export const createStep = (store_code, data) => {
  return callApi(
    `/store/${store_code}/agency_configs/bonus_steps`,
    "post",
    data
  );
};

export const destroyStep = (store_code, id) => {
  return callApi(
    `/store/${store_code}/agency_configs/bonus_steps/${id}`,
    "delete",
    null
  );
};

export const updateStep = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/agency_configs/bonus_steps/${id}`,
    "put",
    data
  );
};
//Doanh số nhập hàng
export const fetchAllStepsImport = (store_code) => {
  return callApi(
    `/store/${store_code}/agency_configs/import_bonus_steps`,
    "get",
    null
  );
};
export const createStepImport = (store_code, data) => {
  return callApi(
    `/store/${store_code}/agency_configs/import_bonus_steps`,
    "post",
    data
  );
};

export const destroyStepImport = (store_code, id) => {
  return callApi(
    `/store/${store_code}/agency_configs/import_bonus_steps/${id}`,
    "delete",
    null
  );
};

export const updateStepImport = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/agency_configs/import_bonus_steps/${id}`,
    "put",
    data
  );
};

export const updateConfig = (store_code, data) => {
  return callApi(`/store/${store_code}/agency_configs`, "post", data);
};
export const updateConfigImport = (store_code, data) => {
  return callApi(
    `/store/${store_code}/config_type_bonus_period_import`,
    "put",
    data
  );
};

export const fetchAllAgency = (store_code, page, params) => {
  if (params)
    return callApi(
      `/store/${store_code}/agencies?page=${page}${params}`,
      "get",
      null
    );
  else
    return callApi(`/store/${store_code}/agencies?page=${page}`, "get", null);
};

export const fetchAllRequestPayment = (store_code) => {
  return callApi(
    `/store/${store_code}/agencies/request_payment/current`,
    "get",
    null
  );
};
export const fetchAllHistory = (store_code) => {
  return callApi(
    `/store/${store_code}/agencies/request_payment/history`,
    "get",
    null
  );
};
export const updateRequestPayment = (store_code, data) => {
  return callApi(
    `/store/${store_code}/agencies/request_payment/change_status`,
    "post",
    data
  );
};

export const updateAllRequestPayment = (store_code) => {
  return callApi(
    `/store/${store_code}/agencies/request_payment/settlement`,
    "post",
    null
  );
};
export const updateAgency = (store_code, id, data) => {
  return callApi(`/store/${store_code}/agencies/${id}`, "put", data);
};

export const fetchAllAgencyType = (store_code) => {
  return callApi(`/store/${store_code}/agency_type`, "get", null);
};

export const createAgencyType = (store_code, data) => {
  return callApi(`/store/${store_code}/agency_type`, "post", data);
};

export const destroyType = (store_code, data) => {
  return callApi(`/store/${store_code}/agency_type/${data}`, "DELETE", null);
};
export const updateAgencyType = (store_code, id, data) => {
  return callApi(`/store/${store_code}/agency_type/${id}`, "put", data);
};

export const fetchAllTopReport = (store_code, page = 1, params) => {
  if (params != null) {
    return callApi(
      `/store/${store_code}/agencies/report?page=${page}${params}`,
      "get",
      null
    );
  }

  return callApi(
    `/store/${store_code}/agencies/report?page=${page}`,
    "get",
    null
  );
};

export const getBonusAgencyConfig = (store_code) => {
  return callApi(`/store/${store_code}/bonus_agency_config`, "get", null);
};

export const updateBonusAgencyConfig = (store_code, data) => {
  return callApi(`/store/${store_code}/bonus_agency_config`, "put", data);
};

export const addBonusSteps = (store_code, data) => {
  return callApi(
    `/store/${store_code}/bonus_agency_config/bonus_steps`,
    "post",
    data
  );
};

export const updateBonusSteps = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/bonus_agency_config/bonus_steps/${id}`,
    "put",
    data
  );
};

export const deleteBonusSteps = (store_code, id) => {
  return callApi(
    `/store/${store_code}/bonus_agency_config/bonus_steps/${id}`,
    "delete",
    null
  );
};
export const historiesBalance = (store_code, id, queryString) => {
  return callApi(
    `/store/${store_code}/agencies/${id}/history_balance?${queryString}`,
    "get",
    null
  );
};
export const changePriceBalance = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/agencies/${id}/add_sub_balance`,
    "post",
    data
  );
};

export const fetchAllTopCommission = (store_code, page = 1, params) => {
  if (params != null) {
    return callApi(
      `/store/${store_code}/agencies/report_share?page=${page}${params}`,
      "get",
      null
    );
  }
  return callApi(
    `/store/${store_code}/agencies/report_share?page=${page}`,
    "get",
    null
  );
};
export const fetchAllAgencyRegisterRequests = (
  store_code,
  page = 1,
  params
) => {
  if (params)
    return callApi(
      `/store/${store_code}/agency_register_requests?page=${page}${params}`,
      "get",
      null
    );
  else
    return callApi(
      `/store/${store_code}/agency_register_requests?page=${page}`,
      "get",
      null
    );
};

export const handleAgencyRegisterRequest = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/agency_register_requests/${id}/status`,
    "put",
    data
  );
};

export const updateAgencyPercentDiscount = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/agency_type/${id}/override_price`,
    "post",
    data
  );
};
export const updateAgencyCommission = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/agency_type/${id}/edit_percent_agency`,
    "post",
    data
  );
};

//Auto set tầng đại lý
export const autoSetLevelAgencyType = (store_code, data) => {
  return callApi(
    `/store/${store_code}/auto_set_level_agency_type`,
    "post",
    data
  );
};
export const getHistoryChangeLevelAgency = (store_code, params) => {
  return callApi(
    `/store/${store_code}/get_history_change_level_agency${
      params ? `?${params}` : ""
    }`,
    "get",
    null
  );
};
