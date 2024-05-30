import callApi from "../../ultis/apiCaller";

export const fetchAllShipment = (store_code) => {
  return callApi(`/store/${store_code}/shipments`, "get", null);
};

export const fetchShipmentId = (store_code, id) => {
  return callApi(`/store/${id}`, "get", null);
};

export const createShipment = (store_code, data) => {
  return callApi(`/store/${store_code}/shipments`, "post", data);
};

export const updateShipment = (store_code, id, data) => {
  return callApi(`/store/${store_code}/shipments/${id}`, "put", data);
};

export const loginShipment = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/shipment_get_token/viettel`,
    "post",
    data
  );
};
export const loginShipmentVietNamPost = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/shipment_get_token/vietnam_post`,
    "post",
    data
  );
};
export const loginShipmentNhatTin = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/shipment_get_token/nhat_tin`,
    "post",
    data
  );
};
export const destroyShipment = (store_code, id) => {
  return callApi(`/store/${store_code}/shipments/${id}`, "delete", null);
};

export const calculate = (store_code, id, data) => {
  return callApi(
    `/store/${store_code}/shipments/${id}/calculate`,
    "post",
    data
  );
};

//V2
export const fetchListShipmentV2 = (store_code) => {
  return callApi(`/store/${store_code}/shipment/list_shipper`, "post", null);
};

export const calculateShipmentV2 = (store_code, partner_id, data) => {
  return callApi(
    `/store/${store_code}/shipment/calculate_fee/${partner_id}`,
    "post",
    data
  );
};
