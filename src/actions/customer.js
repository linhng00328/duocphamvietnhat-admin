import * as Types from "../constants/ActionType";
import history from "../history";
import * as customerApi from "../data/remote/customer";
import * as saleApi from "../data/remote/sale";
import * as chatApi from "../data/remote/chat";
import XlsxPopulate from "xlsx-populate";
import { saveAs } from "file-saver";
import { formatDDMMYYYY } from "../ultis/date";

export const fetchAllCustomer = (
  store_code,
  page,
  params,
  referral_phone_number
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .fetchAllCustomer(store_code, page, params, referral_phone_number)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_CUSTOMER,
            data: res.data.data,
          });
      });
  };
};

export const exportAllListCustomer = (
  store_code,
  params,
  isSale,
  referral_phone_number
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    if (isSale) {
      const queryString = params + "&is_export=true";
      saleApi
        .fetchListCustomerOfSale(store_code, 1, queryString)
        .then((res) => {
          dispatch({
            type: Types.SHOW_LOADING_LAZY,
            loading: "hide",
          });
          if (res.data.code == 200) {
            if (res.data.data.data.length > 0) {
              var newArray = [];

              for (const item of res.data.data.data) {
                var newItem = {};
                var arangeKeyItem = {
                  name: item.name ?? "",
                  phone_number: item.phone_number ?? "",
                  referral_phone_number: item.referral_phone_number ?? "",
                  address_detail: item.address_detail ?? "",
                  wards_name: item.wards_name ?? "",
                  district_name: item.district_name ?? "",
                  province_name: item.province_name ?? "",
                  sex:
                    item.sex == 1
                      ? "Nữ"
                      : item.sex == 2
                      ? "Nam"
                      : "Không xác định",
                  date_of_birth:
                    item.date_of_birth == null ? "" : item.date_of_birth,
                  points: item.points ?? "",
                  official: item.official,
                  created_at: item.created_at,
                  updated_at: item.updated_at,
                  debt: item.debt,
                  total_final_all_status: item.total_final_all_status,
                  total_final_without_refund: item.total_final_without_refund,
                  role: item.is_agency
                    ? "Đại lý"
                    : item.is_collaborator
                    ? "Cộng tác viên"
                    : "Khách hàng",
                  agency_type: item.agency_type,
                };
                Object.entries(arangeKeyItem).forEach(([key, value], index) => {
                  if (key == "name") {
                    newItem["Tên khách hàng"] = value;
                  }
                  if (key == "phone_number") {
                    newItem["Số điện thoại"] = value;
                  }
                  if (key == "referral_phone_number") {
                    newItem["SĐT người giới thiệu"] = value;
                  }
                  if (key == "wards_name") {
                    newItem["Phường/Xã"] = value;
                  }
                  if (key == "district_name") {
                    newItem["Quận/Huyện"] = value;
                  }
                  if (key == "province_name") {
                    newItem["Tỉnh/TP"] = value;
                  }
                  if (key == "address_detail") {
                    newItem["Địa chỉ chi tiết"] = value;
                  }
                  if (key == "sex") {
                    newItem["Giới tính"] = value;
                  }
                  if (key == "date_of_birth") {
                    newItem["Ngày sinh"] = value;
                  }
                  if (key == "points") {
                    newItem["Xu hiện tại"] = value;
                  }
                  if (key == "official") {
                    newItem["Chính thức"] = value;
                  }
                  if (key == "created_at") {
                    newItem["Ngày tạo"] = value;
                  }
                  if (key == "updated_at") {
                    newItem["Ngày cập nhật"] = value;
                  }
                  if (key == "debt") {
                    newItem["Nợ hiện tại"] = value;
                  }
                  if (key == "total_final_all_status") {
                    newItem["Tổng bán"] = value;
                  }
                  if (key == "total_final_without_refund") {
                    newItem["Tổng bán trừ trả hàng và hủy"] = value;
                  }
                  if (key == "role") {
                    newItem["Vai trò"] = value;
                  }
                  if (key == "agency_type") {
                    newItem["Cấp đại lý"] =
                      value && item.is_agency ? value.name : "";
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
              console.log(header);
              saveAsExcel(
                { data: newArray, header: header },
                "DANH SÁCH KHÁCH HÀNG CỦA SALE.xlsx"
              );
            }
          }
        });
    } else {
      customerApi
        .fetchAllCustomer(store_code, 1, params, referral_phone_number, true)
        .then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
          if (res.data.code == 200) {
            if (res.data.data.data.length > 0) {
              var newArray = [];

              for (const item of res.data.data.data) {
                var newItem = {};
                var arangeKeyItem = {
                  name: item.name ?? "",
                  phone_number: item.phone_number ?? "",
                  referral_phone_number: item.referral_phone_number ?? "",
                  sale_name: item.sale_staff?.name ?? "",
                  address_detail: item.address_detail ?? "",
                  wards_name: item.wards_name ?? "",
                  district_name: item.district_name ?? "",
                  province_name: item.province_name ?? "",
                  sex:
                    item.sex == 1
                      ? "Nữ"
                      : item.sex == 2
                      ? "Nam"
                      : "Không xác định",
                  date_of_birth:
                    item.date_of_birth == null ? "" : item.date_of_birth,
                  points: item.points ?? "",
                  official: item.official,
                  created_at: item.created_at,
                  updated_at: item.updated_at,
                  debt: item.debt,
                  total_final_all_status: item.total_final_all_status,
                  total_final_without_refund: item.total_final_without_refund,
                  role: item.is_agency
                    ? "Đại lý"
                    : item.is_collaborator
                    ? "Cộng tác viên"
                    : "Khách hàng",
                  agency_type: item.agency_type,
                };
                Object.entries(arangeKeyItem).forEach(([key, value], index) => {
                  if (key == "name") {
                    newItem["Tên khách hàng"] = value;
                  }
                  if (key == "phone_number") {
                    newItem["Số điện thoại"] = value;
                  }
                  if (key == "referral_phone_number") {
                    newItem["SĐT người giới thiệu"] = value;
                  }
                  if (key == "sale_name") {
                    newItem["Sale được phân công"] = value;
                  }
                  if (key == "wards_name") {
                    newItem["Phường/Xã"] = value;
                  }
                  if (key == "district_name") {
                    newItem["Quận/Huyện"] = value;
                  }
                  if (key == "province_name") {
                    newItem["Tỉnh/TP"] = value;
                  }
                  if (key == "address_detail") {
                    newItem["Địa chỉ chi tiết"] = value;
                  }
                  if (key == "sex") {
                    newItem["Giới tính"] = value;
                  }
                  if (key == "date_of_birth") {
                    newItem["Ngày sinh"] = value;
                  }
                  if (key == "points") {
                    newItem["Xu hiện tại"] = value;
                  }
                  if (key == "official") {
                    newItem["Chính thức"] = value;
                  }
                  if (key == "created_at") {
                    newItem["Ngày tạo"] = value;
                  }
                  if (key == "updated_at") {
                    newItem["Ngày cập nhật"] = value;
                  }
                  if (key == "debt") {
                    newItem["Nợ hiện tại"] = value;
                  }
                  if (key == "total_final_all_status") {
                    newItem["Tổng bán"] = value;
                  }
                  if (key == "total_final_without_refund") {
                    newItem["Tổng bán trừ trả hàng và hủy"] = value;
                  }
                  if (key == "role") {
                    newItem["Vai trò"] = value;
                  }
                  if (key == "agency_type") {
                    newItem["Cấp đại lý"] =
                      value && item.is_agency ? value.name : "";
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
              console.log(header);
              saveAsExcel({ data: newArray, header: header });
            }
          }
        });
    }
  };
};

export const importAllListCustomer = (
  store_code,
  data,
  onSuccess = () => {}
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .importAllCustomerFromXLSX(store_code, data)
      .then((res) => {
        if (onSuccess) onSuccess();
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          tryShow: true,
          alert: {
            tryShow: true,
            type: "success",
            title: res.data.msg,
            disable: "show",
            content: res.data.msg,
          },
        });
      })
      .catch((error) => {
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

async function saveAsExcel(value, nameFile = "DANH SACH KHACH HANG.xlsx") {
  var data = value.data;
  var data_header = value.header;
  XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    const sheet1 = workbook.sheet(0);
    const sheetData = getSheetData(data, data_header);

    const totalColumns = sheetData[0].length;

    sheet1.cell("A1").value(sheetData);
    const range = sheet1.usedRange();
    const endColumn = String.fromCharCode(64 + totalColumns);

    sheet1.row(1).style("bold", true);

    sheet1.range("A1:" + endColumn + "1").style("fill", "F4D03F");
    range.style("border", true);

    return workbook.outputAsync().then((res) => {
      saveAs(res, nameFile);
    });
  });
}

export const fetchAllCustomerByInferralPhone = (
  store_code,
  page,
  params,
  referral_phone_number
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .fetchAllCustomer(store_code, page, params, referral_phone_number)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_CUSTOMER_BY_INFERRAL_PHONE,
            data: res.data.data,
          });
      });
  };
};
export const fetchChatId = (store_code, customerId, pag = 1) => {
  return (dispatch) => {
    chatApi
      .fetchChatId(store_code, customerId, pag)
      .then((res) => {
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ID_CHAT,
            data: res.data.data,
          });
      })
      .catch(function (errors) {
        console.log(errors);
      });
  };
};
export const fetchCustomerId = (store_code, customerId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi.fetchCustomerId(store_code, customerId).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ID_CUSTOMER,
          data: res.data.data,
        });
    });
  };
};

export const fetchAllPointHistory = (
  id,
  store_code,
  page,
  branch_id,
  params
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi.fetchAllPointHistory(id, store_code, page).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_POINT_HISTORY,
          data: res.data.data,
        });
    });
  };
};

export const createCustomer = (store_code, id, funcModal = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .createCustomer(store_code, id)
      .then((res) => {
        if (res.data.success && funcModal != null) {
          console.log("da vao r");
          funcModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          tryShow: true,
          alert: {
            tryShow: true,
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        dispatch({
          type: Types.CREATED_CUSTOMER,
          isFromPosAndSave:
            id.isFromPosAndSave == null ? false : id.isFromPosAndSave,
          data: res.data.data,
        });

        if (id.isFromPosAndSave != true) {
          customerApi
            .fetchAllCustomer(store_code, 1)
            .then((res) => {
              if (res.data.code !== 401) {
                dispatch({
                  type: Types.FETCH_ALL_CUSTOMER,
                  data: res.data.data,
                });
                history.push(`/customer/${store_code}`);
              }
            })
            .catch(function (error) {
              dispatch({
                type: Types.SHOW_LOADING,
                loading: "hide",
              });
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
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

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

export const editCustomer = (store_code, id, data, funcModal = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .editCustomer(store_code, id, data)
      .then((res) => {
        if (res.data.success && funcModal != null) {
          console.log("da vao r");
          funcModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        customerApi.fetchCustomerId(store_code, id).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ID_CUSTOMER,
              data: res.data.data,
            });
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "success",
              title: "Thành công ",
              disable: "show",
              content: res.data.msg,
            },
          });
        });
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

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
export const changeTypeRoleCustomer = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .changeTypeRoleCustomer(store_code, id, data)
      .then((res) => {
        dispatch({
          type: Types.UPDATE_ROLE_CUSTOMER_FOR_INTERFACE,
          data: res.data.success,
        });
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
      })
      .catch(function (error) {
        console.log("return ~ error", error);
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.message,
          },
        });
      });
  };
};

export const changeTypeManyRoleCustomer = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .changeTypeManyRoleCustomer(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.UPDATE_ROLE_CUSTOMER_FOR_INTERFACE,
          data: res.data.success,
        });
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
      })
      .catch(function (error) {
        console.log("return ~ error", error);
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.message,
          },
        });
      });
  };
};

export const changePointForCustomer = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .changePointForCustomer(store_code, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.ADD_SUB_POINT_CUSTOMER,
            data: res.data.success,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
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
