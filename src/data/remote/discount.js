import callApi from "../../ultis/apiCaller";

export const fetchAllDiscount = (store_code) => {
  return callApi(`/store/${store_code}/discounts`, "get", null);
};

export const fetchAllDiscountEnd = (store_code , page) => {
  return callApi(`/store/${store_code}/discounts_end?page=${page}`, "get", null);
};

export const fetchDiscountId = (store_code , id) => {
  return callApi(`/store/${store_code}/discounts/${id}`, "get", null);
};

export const createDiscount = (store_code,data) =>{
  return callApi(`/store/${store_code}/discounts`, "post", data);
}

export const updateDiscount = (store_code,data,id) =>{
  return callApi(`/store/${store_code}/discounts/${id}`, "put", data);
}

export const destroyDiscount = (store_code, id) =>{
  return callApi(`/store/${store_code}/discounts/${id}`, "delete", null);
}

export const upload = (file) =>{
  return callApi(`/images`, "post", file);
}
