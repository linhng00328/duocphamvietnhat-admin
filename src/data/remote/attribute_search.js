import callApi from "../../ultis/apiCaller";

export const fetchAllData = (store_code, params) => {
  if (params)
    return callApi(
      `/store/${store_code}/attribute_searches?params=true${params}`,
      "get",
      null
    );
  else return callApi(`/store/${store_code}/attribute_searches`, "get", null);
};

export const createAttributeSearch = (store_code, data) => {
  return callApi(`/store/${store_code}/attribute_searches`, "post", data);
};

export const updateAttributeSearch = (store_code, id, data) => {
  return callApi(`/store/${store_code}/attribute_searches/${id}`, "post", data);
};

export const destroyAttributeSearch = (store_code, id) => {
  return callApi(
    `/store/${store_code}/attribute_searches/${id}`,
    "delete",
    null
  );
};

export const sortAttributeSearch = (store_code, data) => {
  return callApi(`/store/${store_code}/attribute_search/sort`, "post", data);
};

export const createAttributeSearchChild = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/attribute_searches/${id}/product_attribute_search_children`,
    "post",
    data
  );
};
export const updateAttributeSearchChild = (store_code, id, idChild, data) => {
  return callApi(
    `/store/${store_code}/attribute_searches/${id}/product_attribute_search_children/${idChild}`,
    "post",
    data
  );
};

export const destroyAttributeSearchChild = (store_code, id, idChild) => {
  return callApi(
    `/store/${store_code}/attribute_searches/${id}/product_attribute_search_children/${idChild}`,
    "delete",
    null
  );
};
export const setUpAttributeSearch = (store_code, id, form) => {
  return callApi(
    `/store/${store_code}/products/${id}/set_up_attribute_search`,
    "put",
    form
  );
};
export const getAttributeSearch = (store_code, id) => {
  return callApi(
    `/store/${store_code}/products/${id}/get_attribute_search`,
    "get",
    null
  );
};
