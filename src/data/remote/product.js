import callApi from "../../ultis/apiCaller";

export const fetchAllData = (store_code, page, params, agency_type_id) => {
  if (agency_type_id) {
    return params
      ? callApi(
          `/store/${store_code}/products?page=${page}${params}&agency_type_id=${agency_type_id}`,
          "get",
          null
        )
      : callApi(
          `/store/${store_code}/products?page=${page}&agency_type_id=${agency_type_id}`,
          "get",
          null
        );
  }

  return params
    ? callApi(
        `/store/${store_code}/products?page=${page}${params}&agency_type_id=${agency_type_id}`,
        "get",
        null
      )
    : callApi(
        `/store/${store_code}/products?page=${page}&agency_type_id=${agency_type_id}`,
        "get",
        null
      );
};
export const fetchAllProductV2 = (
  store_code,
  branch_ids,
  page,
  params,
  agency_type_id
) => {
  if (agency_type_id) {
    if (branch_ids?.toString()?.includes(",")) {
      return params
        ? callApi(
            `/store_v2/${store_code}/products?branch_ids=${branch_ids}&page=${
              page ?? ""
            }${params ?? ""}&agency_type_id=${agency_type_id ?? ""}`,
            "get",
            null
          )
        : callApi(
            `/store_v2/${store_code}/products?branch_ids=${branch_ids}&page=${
              page ?? ""
            }&agency_type_id=${agency_type_id ?? ""}`,
            "get",
            null
          );
    } else {
      return params
        ? callApi(
            `/store_v2/${store_code}/${branch_ids}/products?page=${page ?? ""}${
              params ?? ""
            }&agency_type_id=${agency_type_id ?? ""}`,
            "get",
            null
          )
        : callApi(
            `/store_v2/${store_code}/${branch_ids}/products?page=${
              page ?? ""
            }&agency_type_id=${agency_type_id ?? ""}`,
            "get",
            null
          );
    }
  }
  if (branch_ids?.toString()?.includes(",")) {
    return params
      ? callApi(
          `/store/${store_code}/products?branch_ids=${branch_ids}&page=${
            page ?? ""
          }${params ?? ""}&agency_type_id=${agency_type_id ?? ""}`,
          "get",
          null
        )
      : callApi(
          `/store/${store_code}/products?branch_ids=${branch_ids}&page=${
            page ?? ""
          }&agency_type_id=${agency_type_id ?? ""}`,
          "get",
          null
        );
  } else {
    return params
      ? callApi(
          `/store_v2/${store_code}/${branch_ids}/products?page=${page ?? ""}${
            params ?? ""
          }&agency_type_id=${agency_type_id ?? ""}`,
          "get",
          null
        )
      : callApi(
          `/store_v2/${store_code}/${branch_ids}/products?page=${
            page ?? ""
          }&agency_type_id=${agency_type_id ?? ""}`,
          "get",
          null
        );
  }
};

export const fetchProductId = (store_code, id) => {
  return callApi(`/store/${store_code}/products/${id}`, "get", null);
};

export const createProduct = (store_code, data) => {
  return callApi(`/store/${store_code}/products`, "post", data);
};
export const createProductV2 = (store_code, branch_id, data) => {
  return callApi(`/store_v2/${store_code}/${branch_id}/products`, "post", data);
};

export const updateProduct = (store_code, data, id) => {
  return callApi(`/store/${store_code}/products/${id}`, "put", data);
};

export const updatePriceOneProduct = (store_code, id, data) => {
  return callApi(`/store/${store_code}/products/${id}/price`, "put", data);
};

export const updateNameOneProduct = (store_code, id, data) => {
  return callApi(`/store/${store_code}/products/${id}/name`, "put", data);
};

export const updateDistribute = (store_code, data, productId, branchId) => {
  return callApi(
    `/store_v2/${store_code}/${branchId}/products/${productId}/distribute`,
    "put",
    data
  );
};

export const updateDistributeWithoutBranch = (store_code, data, productId) => {
  return callApi(
    `/store/${store_code}/products/${productId}/distribute`,
    "put",
    data
  );
};

export const destroyProduct = (store_code, id) => {
  return callApi(`/store/${store_code}/products/${id}`, "delete", null);
};

export const upload = (file) => {
  return callApi(`/images`, "post", file);
};

export const destroyMultiProduct = (store_code, data) => {
  return callApi(`/store/${store_code}/products`, "delete", data);
};

export const createMultiProduct = (store_code, data) => {
  return callApi(`/store/${store_code}/products/all`, "post", data);
};

export const createMultiProductInventory = (store_code, branch_id, data) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/products_inventory/all`,
    "post",
    data
  );
};

export const fetchAllListProduct = (store_code, search, params) => {
  return callApi(
    `/store/${store_code}/products?is_show_description=${true}&is_get_all=${true}&search=${search}${
      params ? params : ""
    }`,
    "get",
    null
  );
};

export const fetchAllProductEcommerce = (store_code, page, data) => {
  return callApi(
    `/store/${store_code}/ecommerce/products?page=${page}`,
    "post",
    data
  );
};
export const fetchProductAgencyPrice = (store_code, id, agency_id) => {
  return callApi(
    `/store/${store_code}/products/${id}/agency_price?agency_type_id=${agency_id}`,
    "get",
    null
  );
};

export const updateAgencyPrice = (store_code, data, id) => {
  return callApi(
    `/store/${store_code}/products/${id}/agency_price`,
    "put",
    data
  );
};

export const updateListAgencyPrice = (store_code, data) => {
  return callApi(
    `/store/${store_code}/products/agency_price/list`,
    "put",
    data
  );
};

export const editStock = (store_code, branch_id, data) => {
  return callApi(
    `/store/${store_code}/${branch_id}/inventory/update_balance`,
    "put",
    data
  );
};

export const editListStock = (store_code, branch_id, data) => {
  return callApi(
    `/store/${store_code}/${branch_id}/inventory/update_balance/list`,
    "put",
    data
  );
};

export const changePercentCol = (store_code, value) => {
  return callApi(
    `/store_v2/${store_code}/collaborator_products`,
    "post",
    value
  );
};

export const getAmountProductNearlyOutStock = (store_code, branch_id) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/amount_product_nearly_out_stock`,
    "get",
    null
  );
};

export const getProductRetailSteps = (store_code, branch_id, idProduct) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/product_retail_steps/${idProduct}`,
    "get",
    null
  );
};
