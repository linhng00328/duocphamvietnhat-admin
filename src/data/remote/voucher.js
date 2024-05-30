import callApi from "../../ultis/apiCaller";

export const fetchAllVoucher= (store_code) => {
  return callApi(`/store/${store_code}/vouchers`, "get", null);
};

export const fetchAllVoucherEnd = (store_code , page) => {
  return callApi(`/store/${store_code}/vouchers_end?page=${page}`, "get", null);
};

export const fetchVoucherId = (store_code , id) => {
  return callApi(`/store/${store_code}/vouchers/${id}`, "get", null);
};

export const createVoucher= (store_code,data) =>{
  return callApi(`/store/${store_code}/vouchers`, "post", data);
}

export const updateVoucher= (store_code,data,id) =>{
  return callApi(`/store/${store_code}/vouchers/${id}`, "put", data);
}

export const destroyVoucher= (store_code, id) =>{
  return callApi(`/store/${store_code}/vouchers/${id}`, "delete", null);
}

export const upload = (file) =>{
  return callApi(`/images`, "post", file);
}

export const fetchAllVoucherCodes = (store_code, vourcher_id, page, search_value, status, perpage) => {
  return callApi(
    `/store/${store_code}/vouchers/${vourcher_id}/codes?search=${search_value}&page=${page}&status=${status}&limit=${perpage} `,
    "get",
  );
}

export const fetchExportVoucherCodes = (store_code, vourcher_id) => {
  return callApi(`/store/${store_code}/vouchers/${vourcher_id}/codes/link_export`, "get");
}

export const changeStatuVourcherCodes = (store_code, voucher_id, ids) => {
  return callApi(`/store/${store_code}/vouchers/${voucher_id}/codes`, "put", ids);
}

export const fetchAllListProductsByVoucherId = (store_code, vourcher_id, page, perpage) => {
  return callApi(
    `/store/${store_code}/vouchers/${vourcher_id}/products?page=${page}&limit=${perpage} `,
    "get",
  );
}
