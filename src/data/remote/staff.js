import callApi from "../../ultis/apiCaller";

export const fetchAllStaff = (store_code, page, _params, branch_id) => {
  var params = ``;
  if (_params) {
    params = params + _params;
  }
  if (branch_id) {
    params = params + `branch_id=${branch_id}`;
  }
  return callApi(
    `/store/${store_code}/staffs${params != "" ? "?" + params : ""}`,
    "get",
    null
  );
};

export const fetchStaffId = (store_code, decentralizationId) => {
  return callApi(
    `/store/${store_code}/staffs/${decentralizationId} `,
    "get",
    null
  );
};

export const createStaff = (store_code, data) => {
  return callApi(`/store/${store_code}/staffs`, "post", data);
};

export const updateStaff = (id, decentralization, store_code) => {
  return callApi(`/store/${store_code}/staffs/${id}`, "put", decentralization);
};

export const destroyStaff = (store_code, id) => {
  return callApi(`/store/${store_code}/staffs/${id}`, "delete", null);
};

export const updateCustomerToSale = (store_code, id, data) => {
  return callApi(`/store/${store_code}/staffs/${id}/update_sale`, "post", data);
};

// coder newer
export const historyReportSalerToDistributor  = (store_code, from_time, to_time) => {
  return callApi(`/store/${store_code}/overview_sale_visit_agencies${from_time ? `?from_time=${from_time}` : ''}${to_time ? `&to_time=${to_time}` : ''}`, 'get')
}

export const reportSalerToDistributor = (store_code, from_time, to_time, staff_id) => {
  return callApi(`/store/${store_code}/sale_visit_agencies${from_time ? `?from_time=${from_time}` : ''}${to_time ? `&to_time=${to_time}` : ''}${staff_id ? `&staff_id=${staff_id}` : ''}`, 'get');
}