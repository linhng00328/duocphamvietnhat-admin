import callApi from "../../ultis/apiCaller";

export const fetchAllBill = (
  store_code,
  page = 1,
  branch_ids,
  params,
  params_agency,
  is_export = false
) => {
  var stringURL = `/store/${store_code}/orders?page=${page}&is_export=${is_export}`;

  if (branch_ids) {
    stringURL =
      stringURL +
      `${
        branch_ids?.toString()?.includes(",")
          ? `&branch_id_list=${branch_ids}`
          : `&branch_id=${branch_ids}`
      }`;
  }
  if (params && params != null) stringURL = stringURL + params;
  if (params_agency && params_agency != null)
    stringURL = stringURL + params_agency;

  return callApi(stringURL, "get", null);
};

export const fetchReportProducSold = (
  store_code,
  page = 1,
  branch_ids,
  params,
  params_agency,
  is_export = false
) => {
  var stringURL = `/store/${store_code}/orders/report_product/products?page=${page}&is_export=${is_export}`;

  if (branch_ids) {
    stringURL =
      stringURL +
      `${
        branch_ids?.toString()?.includes(",")
          ? `&branch_id_list=${branch_ids}`
          : `&branch_id=${branch_ids}`
      }`;
  }
  if (params && params != null) stringURL = stringURL + params;
  if (params_agency && params_agency != null)
    stringURL = stringURL + params_agency;

  return callApi(stringURL, "get", null);
};

export const fetchAllBillByMethodPayment = (
  store_code,
  page = 1,
  branch_ids,
  params,
  params_agency,
  methodPaymentId,
  is_export = false,
) => {
  console.log("methodPaymentId", methodPaymentId);

  var stringURL = `/store/${store_code}/orders/totalPriceByMethodPayment/${methodPaymentId}?page=${page}&is_export=${is_export}`;

  if (branch_ids) {
    stringURL =
      stringURL +
      `${
        branch_ids?.toString()?.includes(",")
          ? `&branch_id_list=${branch_ids}`
          : `&branch_id=${branch_ids}`
      }`;
  }
  if (params && params != null) stringURL = stringURL + params;
  if (params_agency && params_agency != null)
    stringURL = stringURL + params_agency;

  return callApi(stringURL, "get", null);
};

export const fetchBillId = (store_code, order_code) => {
  return callApi(`/store/${store_code}/orders/${order_code}`, "get", null);
};

export const fetchBillHistory = (store_code, billId) => {
  return callApi(
    `/store/${store_code}/orders/status_records/${billId}`,
    "get",
    null
  );
};

export const fetchHistoryPay = (store_code, order_code) => {
  return callApi(
    `/store/${store_code}/orders/history_pay/${order_code}`,
    "get",
    null
  );
};

export const updateStatusOrder = (store_code, data) => {
  console.log(data);
  return callApi(
    `/store/${store_code}/orders/change_order_status`,
    "post",
    data
  );
};
export const updateListStatusOrder = (store_code, data) => {
  console.log(data);
  return callApi(
    `/store/${store_code}/orders/change_list_order_status`,
    "post",
    data
  );
};
export const updateStatusPayment = (store_code, data) => {
  return callApi(
    `/store/${store_code}/orders/change_payment_status`,
    "post",
    data
  );
};

export const sendOrderToDelivery = (store_code, data) => {
  return callApi(`/store/${store_code}/shipper/send_order`, "post", data);
};
export const cancelConnectToDelivery = (store_code, order_code) => {
  return callApi(
    `/store/${store_code}/shipper/cancel_order_ship_code/${order_code}`,
    "post",
    null
  );
};

export const getHistoryDeliveryStatus = (store_code, data) => {
  return callApi(
    `/store/${store_code}/shipper/history_order_status`,
    "post",
    data
  );
};

export const updateOrder = (data, store_code, order_code) => {
  return callApi(
    `/store/${store_code}/orders/update/${order_code}`,
    "put",
    data
  );
};

export const postRefund = (data, store_code, branch_id) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/pos/refund`,
    "post",
    data
  );
};
export const postCashRefund = (order_code, data, store_code, branch_id) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/orders/pay_order/${order_code}`,
    "post",
    data
  );
};

export const getCalculate = (store_code, data, branch_id) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/pos/refund/calculate`,
    "post",
    data
  );
};

export const syncShipment = (store_code, order_code, data) => {
  return callApi(
    `/store/${store_code}/shipper/order_and_payment_status/${order_code}`,
    "post",
    data
  );
};
export const deleteOrder = (store_code, order_code) => {
  return callApi(`/store/${store_code}/orders/${order_code}`, "delete", null);
};

export const updateShippingPackage = (store_code, order_code, data) => {
  return callApi(
    `/store/${store_code}/orders/update_package/${order_code}`,
    "put",
    data
  );
};
