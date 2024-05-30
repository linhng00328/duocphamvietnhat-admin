import callApi from "../../ultis/apiCaller";

export const listPosOrder = (store_code, branch_id) => {
  return callApi(`/store/${store_code}/carts/${branch_id}/list`, "get", null);
};

export const addProductInCart = (store_code, branch_id, id, data) => {
  return callApi(
    // `/store/${store_code}/carts/${branch_id}/list/${id}/items`,
    `/store/${store_code}/carts/${branch_id}/list/${id}/items/v1`,
    "post",
    data
  );
};

export const updateNameInCart = (store_code, branch_id, id, data) => {
  return callApi(
    `/store/${store_code}/carts/${branch_id}/list/${id}/change_name`,
    "put",
    data
  );
};

export const addComboInCart = (store_code, branch_id, id, data) => {
  return callApi(
    // `/store/${store_code}/carts/${branch_id}/list/${id}/use_combo`,
    `/store/${store_code}/carts/${branch_id}/list/${id}/use_combo/v1`,
    "post",
    data
  );
};

export const deleteOneCart = (store_code, branch_id, id) => {
  return callApi(
    `/store/${store_code}/carts/${branch_id}/list/${id}`,
    "delete",
    null
  );
};

export const createOneTab = (store_code, branch_id, data) => {
  return callApi(`/store/${store_code}/carts/${branch_id}/list`, "post", data);
};

export const fetchInfoOneCart = (store_code, branch_id, id) => {
  return callApi(
    // `/store/${store_code}/carts/${branch_id}/list/${id}`,
    `/store/${store_code}/carts/${branch_id}/list/${id}/v1`,
    "get",
    null
  );
};

export const updateQuantityLineItem = (
  store_code,
  branch_id,
  id_cart,
  data
) => {
  return callApi(
    // `/store/${store_code}/carts/${branch_id}/list/${id_cart}/items`,
    `/store/${store_code}/carts/${branch_id}/list/${id_cart}/items/v1`,
    "put",
    data
  );
};
export const subQuantityProduct = (store_code, branch_id, id_cart, data) => {
  return callApi(
    `/store/${store_code}/carts/${branch_id}/list/${id_cart}/items/v1`,
    "put",
    data
  );
};

export const destroyOneProduct = (store_code, branch_id, id_cart, data) => {
  return callApi(
    `/store/${store_code}/carts/${branch_id}/list/${id_cart}/items/v1`,
    "put",
    data
  );
};

export const updateInfoCart = (store_code, branch_id, id_cart, data) => {
  return callApi(
    `/store/${store_code}/carts/${branch_id}/list/${id_cart}`,
    "put",
    data
  );
};
export const updateInfoCarts = (store_code, branch_id, id_cart, data) => {
  return callApi(
    // `/store/${store_code}/carts/${branch_id}/list/${id_cart}`,
    `/store/${store_code}/carts/${branch_id}/list/${id_cart}/v1`,
    "put",
    data
  );
};

export const paymentOrderPos = (store_code, branch_id, id_cart, data) => {
  return callApi(
    `/store/${store_code}/carts/${branch_id}/list/${id_cart}/order`,
    "post",
    data
  );
};

export const fetchVoucher = (store_code, branch_id, id_cart, data) => {
  return callApi(
    // `/store/${store_code}/carts/${branch_id}/list/${id_cart}/use_voucher`,
    `/store/${store_code}/carts/${branch_id}/list/${id_cart}/use_voucher/v1`,
    "post",
    data
  );
};

export const handleCreateUsers = (store_code, data) => {
  return callApi(`/store/${store_code}/customers`, "post", data);
};
export const createCartEditOrder = (store_code, order_code, data) => {
  return callApi(
    `/store/${store_code}/orders/create_cart_edit_order/${order_code}/init`,
    "post",
    data
  );
};
export const updatePriceItem = (
  store_code,
  branch_id,
  cart_id,
  idItem,
  data
) => {
  return callApi(
    `/store/${store_code}/carts/${branch_id}/list/${cart_id}/items/${idItem}`,
    "put",
    data
  );
};
export const updateNoteItem = (
  store_code,
  branch_id,
  cart_id,
  idItem,
  data
) => {
  return callApi(
    `/store/${store_code}/carts/${branch_id}/list/${cart_id}/items/${idItem}/note`,
    "put",
    data
  );
};
