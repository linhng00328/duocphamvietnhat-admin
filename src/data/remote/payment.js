import callApi from "../../ultis/apiCaller";

export const fetchAllPayment = (store_code) => {
  return callApi(`/store/${store_code}/payment_methods`, "get", null);
};

export const fetchPaymentId = (store_code , id) => {
  return callApi(`/store/${id}`, "get", null);
};

export const createPayment = (store_code,data) =>{
  return callApi(`/store/${store_code}/payment_methods`, "post", data);
}

export const updatePayment = (store_code,id ,data) =>{
  return callApi(`/store/${store_code}/payment_methods/${id}`, "put", data);
}

export const destroyPayment = (store_code, id) =>{
  return callApi(`/store/${store_code}/payment_methods/${id}`, "delete", null);
}
