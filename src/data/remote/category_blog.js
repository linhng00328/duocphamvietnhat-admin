import callApi from "../../ultis/apiCaller";

export const fetchAllData = (store_code) => {
  return callApi(`/store/${store_code}/post_categories`, "get", null);
};



export const createCategoryB = (store_code,data) =>{
  return callApi(`/store/${store_code}/post_categories`, "post", data);
}

export const updateCategoryB = (categoryBId, categoryB, store_code) =>{
  return callApi(`/store/${store_code}/post_categories/${categoryBId}`, "post", categoryB);
}

export const destroyCategoryB = (store_code , storeAid) =>{
  return callApi(`/store/${store_code}/post_categories/${storeAid}`, "delete", null);
}


export const sortCategory = (store_code ,data) =>{
  return callApi(`/store/${store_code}/category/sort`, "post", data);
}

export const destroyCategoryChildB = (store_code, id,idChild) =>{
  return callApi(`/store/${store_code}/post_categories/${id}/category_children/${idChild}`, "delete", null);
}
export const createCategoryChildB = (store_code,id,data) =>{
  return callApi(`/store/${store_code}/post_categories/${id}/category_children`, "post", data);
}
export const updateCategoryChildB = (store_code,id,idChild ,data) =>{
  return callApi(`/store/${store_code}/post_categories/${id}/category_children/${idChild}`, "post", data);
}