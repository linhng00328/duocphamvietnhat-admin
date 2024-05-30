import callApi from "../../ultis/apiCaller";

export const fetchAllData = (store_code) => {
  return callApi(`/store/${store_code}/attribute_fields`, "get", null);
};

export const fetchDataId = (store_code , id) => {
  return callApi(`/store/${id}`, "get", null);
};

export const createCategoryP = (store_code,data) =>{
  return callApi(`/store/${store_code}/categories`, "post", data);
}

export const updateAttributeP = (store_code,data) =>{
  return callApi(`/store/${store_code}/attribute_fields`, "put", data);
}

export const destroyCategoryP = (store_code, id) =>{
  return callApi(`/store/${store_code}/categories/${id}`, "delete", null);
}
