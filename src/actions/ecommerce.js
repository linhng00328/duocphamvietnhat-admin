import XlsxPopulate from "xlsx-populate";
import { saveAs } from "file-saver";
import * as Types from "../constants/ActionType";
import * as ecommerceApi from "../data/remote/ecommerce";

//Danh sách kết nối sàn
export const fetchListConnectEcommerce = (store_code, params, funcModal) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    ecommerceApi
      .fetchListConnectEcommerce(store_code, params)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          if (funcModal) {
            funcModal(res.data.data);
          }
          dispatch({
            type: Types.LIST_CONNECT_ECOMMERCE,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

// Kết nối sàn
export const connectEcommerce = (platform, store_code, funcModal) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    ecommerceApi
      .connectEcommerce(platform, store_code)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        funcModal();
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

// Cập nhật kết nối sàn
export const updateConnectEcommerce = (
  store_code,
  shop_id,
  data,
  funcModal
) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    ecommerceApi
      .updateConnectEcommerce(store_code, shop_id, data)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        funcModal();
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

// Gỡ kết nối sàn
export const disconnectEcommerce = (store_code, shop_id, funcModal) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    ecommerceApi
      .disconnectEcommerce(store_code, shop_id)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (funcModal) {
          funcModal();
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

//Danh sách sản phẩm theo store
export const fetchListProductEcommerce = (store_code, params) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    ecommerceApi
      .fetchListProductEcommerce(store_code, params)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.LIST_PRODUCTS_ECOMMERCE,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

// Đồng bộ sản phẩm
export const syncProductEcommerce = (store_code, data, funcModal) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING_SPINNERS, loading: true });
    ecommerceApi
      .syncProductEcommerce(store_code, data)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING_SPINNERS, loading: false });
        if (res.data.code === 200) {
          dispatch({
            type: Types.SYNC_PRODUCTS_FROM_STORES,
            data: res.data.data,
          });
          funcModal(res.data.data);
        }
      })
      .catch(function (error) {
        dispatch({ type: Types.SHOW_LOADING_SPINNERS, loading: false });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

// Sửa giá sản phẩm
export const updatePriceProductEcommerce = (
  store_code,
  data,
  id,
  funcModal
) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    ecommerceApi
      .updatePriceProductEcommerce(store_code, data, id)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        funcModal();
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

//Danh sách đơn hàng theo store
export const fetchListOrderEcommerce = (store_code, params, funcModal) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    ecommerceApi
      .fetchListOrderEcommerce(store_code, params)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          if (funcModal) {
            funcModal();
          }
          dispatch({
            type: Types.LIST_ORDERS_ECOMMERCE,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

// Đồng bộ đơn hàng
export const syncOrderEcommerce = (store_code, data, funcModal) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING_SPINNERS, loading: true });
    ecommerceApi
      .syncOrderEcommerce(store_code, data)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING_SPINNERS, loading: false });
        if (res.data.code === 200) {
          dispatch({
            type: Types.SYNC_ORDERS_FROM_STORES,
            data: res.data.data,
          });
          funcModal(res.data.data);
        }
      })
      .catch(function (error) {
        dispatch({ type: Types.SHOW_LOADING_SPINNERS, loading: false });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

function getSheetData(data, header) {
  var fields = Object.keys(data[0]);
  var sheetData = data.map(function (row) {
    return fields.map(function (fieldName) {
      return row[fieldName] ? row[fieldName] : "";
    });
  });
  sheetData.unshift(header);
  return sheetData;
}

async function saveAsExcel(value, platform) {
  var data = value.data;
  var data_header = value.header;
  XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    const sheet1 = workbook.sheet(0);
    const sheetData = getSheetData(data, data_header);

    const totalColumns = sheetData[0].length;

    sheet1.cell("A1").value(sheetData);
    const range = sheet1.usedRange();

    const endColumn = "Z";
    sheet1.row(1).style("bold", true);

    sheet1.range("A1:" + endColumn + "1").style("fill", "F4D03F");
    range.style("border", true);

    return workbook.outputAsync().then((res) => {
      saveAs(res, `DANH SACH DON HANG ${platform}.xlsx`);
    });
  });
}

//Export danh sách đơn hàng
export const exportListOrder = (store_code, params, funcModal, platform) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    ecommerceApi.fetchListOrderEcommerce(store_code, params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });

      if (res.data.code !== 401) {
        if (typeof res.data.data.data != "undefined") {
          if (res.data.data.data.length > 0) {
            var newArray = [];
            for (const item of res.data.data.data) {
              var newItem = {};
              var arangeKeyItem = {
                order_code: item.order_code ?? "",
                created_at: item.created_at,
                updated_at: item.updated_at,

                receiver_customer_phone: item.customer_phone,
                receiver_customer_name: item.customer_name,
                receiver_customer_email: item.customer_email,
                receiver_customer_wards: item.customer_wards_name,
                receiver_customer_district: item.customer_district_name,
                receiver_customer_province: item.customer_province_name,
                receiver_customer_address_detail: item.customer_address_detail,

                orderer_customer_phone: item.customer?.phone_number,
                orderer_customer_name: item.customer?.name,
                orderer_customer_email: item.customer?.email,
                orderer_customer_wards: item.customer?.wards_name,
                orderer_customer_district: item.customer?.district_name,
                orderer_customer_province: item.customer?.province_name,
                orderer_customer_address_detail: item.customer?.address_detail,

                partner_shipper_name: item.partner_shipper_name,
                customer_note: item.customer_note,

                total_final: item.total_final,
                remaining_amount: item.remaining_amount,

                total_before_discount: item.total_before_discount,
                total_after_discount: item.total_after_discount,

                total_shipping_fee: item.total_shipping_fee,

                payment_status: item.payment_status,

                order_status: funcModal(item.order_status, item.from_platform)
                  ?.name,
              };
              Object.entries(arangeKeyItem).forEach(([key, value], index) => {
                if (key == "order_code") {
                  newItem["Mã đơn hàng"] = value;
                }
                if (key == "created_at") {
                  newItem["Ngày tạo"] = value;
                }
                if (key == "updated_at") {
                  newItem["Ngày cập nhật"] = value;
                }
                if (key == "receiver_customer_phone") {
                  newItem["Số điện thoại người nhận"] = value;
                }
                if (key == "receiver_customer_name") {
                  newItem["Tên người nhận"] = value;
                }
                if (key == "receiver_customer_email") {
                  newItem["Email người nhận"] = value;
                }
                if (key == "receiver_customer_wards") {
                  newItem["Phường/Xã người nhận"] = value;
                }
                if (key == "receiver_customer_district") {
                  newItem["Quận/Huyện người nhận"] = value;
                }
                if (key == "receiver_customer_province") {
                  newItem["Tỉnh/TP người nhận"] = value;
                }
                if (key == "receiver_customer_address_detail") {
                  newItem["Chi tiết địa chỉ người nhận"] = value;
                }
                if (key == "receiver_customer_address_detail") {
                  newItem["Chi tiết địa chỉ người nhận"] = value;
                }

                if (key == "orderer_customer_phone") {
                  newItem["Số điện thoại người gửi"] = value;
                }
                if (key == "orderer_customer_name") {
                  newItem["Tên người gửi"] = value;
                }
                if (key == "orderer_customer_email") {
                  newItem["Email người gửi"] = value;
                }
                if (key == "orderer_customer_wards") {
                  newItem["Phường/Xã người gửi"] = value;
                }
                if (key == "orderer_customer_district") {
                  newItem["Quận/Huyện người gửi"] = value;
                }
                if (key == "orderer_customer_province") {
                  newItem["Tỉnh/TP người gửi"] = value;
                }
                if (key == "orderer_customer_address_detail") {
                  newItem["Chi tiết địa chỉ người gửi"] = value;
                }
                if (key == "orderer_customer_address_detail") {
                  newItem["Chi tiết địa chỉ người gửi"] = value;
                }

                if (key == "order_from") {
                  newItem["Đặt hàng từ"] = value;
                }

                if (key == "partner_shipper_name") {
                  newItem["Đơn vị vận chuyển"] = value;
                }

                if (key == "customer_note") {
                  newItem["Ghi chú"] = value;
                }

                if (key == "total_final") {
                  newItem["Tổng tiền"] = value;
                }
                if (key == "total_shipping_fee") {
                  newItem["Phí vận chuyển"] = value;
                }

                if (key == "remaining_amount") {
                  newItem["Thanh toán còn lại"] = value;
                }

                if (key == "payment_status") {
                  newItem["Trạng thái thanh toán"] = value ?? "";
                }

                if (key == "order_status") {
                  newItem["Trạng thái đơn hàng"] = value ?? "";
                }

                if (key == "total_after_discount") {
                  newItem["Trước khi giảm giá"] = value;
                }
                if (key == "total_before_discount") {
                  newItem["Sau khi giảm giá"] = value;
                }
              });

              newArray.push(newItem);
            }
            var header = [];
            if (newArray.length > 0) {
              Object.entries(newArray[0]).forEach(([key, value], index) => {
                header.push(key);
              });
            }

            saveAsExcel({ data: newArray, header: header }, platform);
          }
        }
      }
    });
  };
};
