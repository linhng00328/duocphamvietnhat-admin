import callApi from "../../ultis/apiCaller";

export const fetchAllData = (store_code, params) => {
  if (params)
    return callApi(
      `/store/${store_code}/categories?params=true${params}`,
      "get",
      null
    );
  else return callApi(`/store/${store_code}/categories`, "get", null);
};

export const fetchDataId = (store_code, id) => {
  return callApi(`/store/${id}`, "get", null);
};

export const createCategoryP = (store_code, data) => {
  return callApi(`/store/${store_code}/categories`, "post", data);
};

export const updateCategoryP = (store_code, id, data) => {
  return callApi(`/store/${store_code}/categories/${id}`, "post", data);
};

export const destroyCategoryP = (store_code, id) => {
  return callApi(`/store/${store_code}/categories/${id}`, "delete", null);
};

export const sortCategory = (store_code, data) => {
  return callApi(`/store/${store_code}/category/sort`, "post", data);
};

export const sortCategoryChildren = (store_code, data) => {
  return callApi(`/store/${store_code}/category_children_sort`, "post", data);
};

export const destroyCategoryChild = (store_code, id, idChild) => {
  return callApi(
    `/store/${store_code}/categories/${id}/category_children/${idChild}`,
    "delete",
    null
  );
};
export const createCategoryChild = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/categories/${id}/category_children`,
    "post",
    data
  );
};
export const updateCategoryChild = (store_code, id, idChild, data) => {
  return callApi(
    `/store/${store_code}/categories/${id}/category_children/${idChild}`,
    "post",
    data
  );
};
