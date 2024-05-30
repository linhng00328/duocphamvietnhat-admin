import callApi from "../../ultis/apiCaller";

export const fetchAllChat = (store_code , page) => {
  return callApi(`/store/${store_code}/message_customers?page=${page}`, "get", null);
};

export const fetchChatId = (store_code , customerId , pag) => {
  return callApi(`/store/${store_code}/message_customers/${customerId}?page=${pag}`, "get", null);
};

export const postMessage = (store_code , customerId , message) => {
  return callApi(`/store/${store_code}/message_customers/${customerId}`, "post", message);
};
