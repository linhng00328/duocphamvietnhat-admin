import callApi from "../../ultis/apiCaller";

  export const fetchAllTransferStock = (store_code,branch_id,page,params) => {
    return params ? callApi(`/store/${store_code}/${branch_id}/inventory/transfer_stocks/sender?page=${page}${params}`, "get", null) 
      :callApi(`/store/${store_code}/${branch_id}/inventory/transfer_stocks/sender?page=${page}`, "get", null)
  };
  export const createTransferStocks = (store_code,branch_id,data) => {
    return  callApi(`/store/${store_code}/${branch_id}/inventory/transfer_stocks`, "post", data)
  };
  export const updateTransferStock = (store_code,branch_id,id,data) => {
    return  callApi(`/store/${store_code}/${branch_id}/inventory/transfer_stocks/${id}`, "put", data)
  };
  export const fetchDetailTransferStock = (store_code,branch_id,id) => {
    return  callApi(`/store/${store_code}/${branch_id}/inventory/transfer_stocks/${id}`, "get", null)
  };

  export const fetchAllTransferStockReceiver = (store_code,branch_id,page,params) => {
    return params ? callApi(`/store/${store_code}/${branch_id}/inventory/transfer_stocks/receiver?page=${page}${params}`, "get", null) 
      :callApi(`/store/${store_code}/${branch_id}/inventory/transfer_stocks/receiver?page=${page}`, "get", null)
  };
  // export const fetchAllTransferStockReceiver = (store_code,branch_id,id) => {
  //   return  callApi(`/store/${store_code}/${branch_id}/inventory/transfer_stocks/receiver`, "get", null)
  // };
  
  export const changeStatus = (store_code,branch_id,id,data) => {
    return  callApi(`/store/${store_code}/${branch_id}/inventory/transfer_stocks/${id}/status`, "put", data)
  };

  export const chooseMethorPayment = (store_code,branch_id,id,data) => {
    return  callApi(`/store/${store_code}/${branch_id}/inventory/transfer_stocks/sender/${id}/payment`, "put", data)
  };

  
export const postRefund = (id , data,store_code, branch_id) =>{
  return callApi(`/store/${store_code}/${branch_id}/inventory/transfer_stocks/sender/${id}/refund`, "post", data);
}
