import callApi from "../../ultis/apiCaller";

export const fetchAllData = () => {
  return callApi("/store", "get", null);
};
export const fetchAllReportInventory = (
  store_code,
  branch_ids,
  page,
  params
) => {
  if (branch_ids?.toString()?.includes(",")) {
    return params
      ? callApi(
          `/store/${store_code}/report/stock/product_last_inventory?branch_ids=${branch_ids}&page=${page}&${params}`,
          "get",
          null
        )
      : callApi(
          `/store/${store_code}/report/stock/product_last_inventory?branch_ids=${branch_ids}&page=${page}`,
          "get",
          null
        );
  } else {
    return params
      ? callApi(
          `/store/${store_code}/report/stock/${branch_ids}/product_last_inventory?page=${page}&${params}`,
          "get",
          null
        )
      : callApi(
          `/store/${store_code}/report/stock/${branch_ids}/product_last_inventory?page=${page}`,
          "get",
          null
        );
  }
};

export const fetchImportExportStock = (
  store_code,
  branch_ids,
  page,
  params
) => {
  if (branch_ids?.toString()?.includes(",")) {
    return params
      ? callApi(
          `/store/${store_code}/report/stock/product_import_export_stock?branch_ids=${branch_ids}&page=${page}&${params}`,
          "get",
          null
        )
      : callApi(
          `/store/${store_code}/report/stock/product_import_export_stock?branch_ids=${branch_ids}&page=${page}`,
          "get",
          null
        );
  } else {
    return params
      ? callApi(
          `/store/${store_code}/report/stock/${branch_ids}/product_import_export_stock?page=${page}&${params}`,
          "get",
          null
        )
      : callApi(
          `/store/${store_code}/report/stock/${branch_ids}/product_import_export_stock?page=${page}`,
          "get",
          null
        );
  }
};

export const fetchAllInventoryHistory = (
  store_code,
  branch_id,
  page,
  params
) => {
  return params
    ? callApi(
        `/store/${store_code}/report/stock/${branch_id}/inventory_histories?page=${page}&${params}`,
        "get",
        null
      )
    : callApi(
        `/store/${store_code}/report/stock/${branch_id}/inventory_histories?page=${page}`,
        "get",
        null
      );
};
export const fetchAllCustomerDebt = (store_code, branch_ids, page, params) => {
  if (branch_ids?.toString()?.includes(",")) {
    return params
      ? callApi(
          `/store/${store_code}/report/finance/customer_debt?branch_ids=${branch_ids}&page=${page}&${params}`,
          "get",
          null
        )
      : callApi(
          `/store/${store_code}/report/finance/customer_debt?branch_ids=${branch_ids}&page=${page}`,
          "get",
          null
        );
  } else {
    return params
      ? callApi(
          `/store/${store_code}/report/finance/${branch_ids}/customer_debt?page=${page}&${params}`,
          "get",
          null
        )
      : callApi(
          `/store/${store_code}/report/finance/${branch_ids}/customer_debt?page=${page}`,
          "get",
          null
        );
  }
};
export const fetchReportProfit = (store_code, branch_ids, params) => {
  if (branch_ids?.toString()?.includes(",")) {
    return callApi(
      `/store/${store_code}/report/finance/profit_and_loss?${params}&branch_ids=${branch_ids}`,
      "get",
      null
    );
  } else {
    return callApi(
      `/store/${store_code}/report/finance/${branch_ids}/profit_and_loss?${params}`,
      "get",
      null
    );
  }
};
export const fetchReportProfitCompare = (store_code, branch_ids, params) => {
  if (branch_ids?.toString()?.includes(",")) {
    return callApi(
      `/store/${store_code}/report/finance/profit_and_loss?${params}&branch_ids=${branch_ids}`,
      "get",
      null
    );
  } else {
    return callApi(
      `/store/${store_code}/report/finance/${branch_ids}/profit_and_loss?${params}`,
      "get",
      null
    );
  }
};
export const fetchAllSupplierDebt = (store_code, branch_ids, page, params) => {
  if (branch_ids?.toString()?.includes(",")) {
    return callApi(
      `/store/${store_code}/report/finance/supplier_debt?branch_ids=${branch_ids}&page=${page}&${params}`,
      "get",
      null
    );
  } else {
    return callApi(
      `/store/${store_code}/report/finance/${branch_ids}/supplier_debt?page=${page}&${params}`,
      "get",
      null
    );
  }
};
export const fetchReportExpenditure = (
  store_code,
  branch_ids,
  page,
  params
) => {
  if (branch_ids?.toString()?.includes(",")) {
    return callApi(
      `/store/${store_code}/report/finance/revenue_expenditure?branch_ids=${branch_ids}&page=${page}${params}`,
      "get",
      null
    );
  } else {
    return callApi(
      `/store/${store_code}/report/finance/${branch_ids}/revenue_expenditure?page=${page}${params}`,
      "get",
      null
    );
  }
};

export const exportRevenueExpenditure = (
  store_id,
  branch_ids,
  page,
  params
) => {
  if (branch_ids?.toString()?.includes(",")) {
    return callApi(
      `/store/${store_id}/report/finance/revenue_expenditure/link_export?branch_ids=${branch_ids}&page=${page}${params}`,
      "get",
      null
    );
  } else {
    return callApi(
      `/store/${store_id}/report/finance/${branch_ids}/revenue_expenditure/link_export?page=${page}${params}`,
      "get",
      null
    );
  }
};

export const fetchDataId = (id) => {
  return callApi(`/store/${id}`, "get", null);
};

export const createStore = (data) => {
  return callApi("/store", "post", data);
};

export const updateStore = (data, id) => {
  return callApi(`/store/${id}`, "put", data);
};

export const destroyStore = (id) => {
  return callApi(`/store/${id}`, "delete", id);
};

export const fetchBranchStore = (store_code) => {
  return callApi(`/store/${store_code}/branches`, "get", null);
};
export const fetchAllSupplier = (store_code, page, params) => {
  return callApi(
    `/store/${store_code}/suppliers?page=${page}${params}`,
    "get",
    null
  );
};
export const deleteBranchStore = (store_code, id) => {
  return callApi(`/store/${store_code}/branches/${id}`, "delete", null);
};
export const deleteSupplier = (store_code, id) => {
  return callApi(`/store/${store_code}/suppliers/${id}`, "delete", null);
};
export const createBranchStore = (store_code, data) => {
  return callApi(`/store/${store_code}/branches`, "post", data);
};

export const updateBranchStore = (store_code, data, id) => {
  return callApi(`/store/${store_code}/branches/${id}`, "put", data);
};

export const createSupplier = (store_code, data) => {
  return callApi(`/store/${store_code}/suppliers`, "post", data);
};

export const editSupplier = (store_code, id, data) => {
  return callApi(`/store/${store_code}/suppliers/${id}`, "put", data);
};
export const fetchSupplierId = (store_code, supplier) => {
  return callApi(`/store/${store_code}/suppliers/${supplier}`, "get", null);
};
