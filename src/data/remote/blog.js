import callApi from "../../ultis/apiCaller";

export const fetchAllBlog = (store_code , page , params) => {
  // return callApi(`/store/${store_code}/posts?page=${page}`, "get", null);

  return params ? callApi(`/store/${store_code}/posts?page=${page}${params}`, "get", null) 
  :callApi(`/store/${store_code}/posts?page=${page}`, "get", null)
};

export const fetchBlogId = (store_code  , blogId) => {
  return callApi(`/store/${store_code}/posts/${blogId}`, "get", null);
};

export const createBlog = (store_code,data) =>{
  return callApi(`/store/${store_code}/posts`, "post", data);
}

export const updateBlog = (categoryBId, categoryB, store_code) =>{
  return callApi(`/store/${store_code}/posts/${categoryBId}`, "post", categoryB);
}

export const destroyBlog = (store_code , storeAid) =>{
  return callApi(`/store/${store_code}/posts/${storeAid}`, "delete", null);
}
