import * as Types from "../constants/ActionType";
import * as collaboratorApi from "../data/remote/collaborator";
import * as chatApi from "../data/remote/chat";
import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";
import { removeAscent } from "../ultis/helpers";

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

async function saveAsExcel(value, title) {
  var data = value.data;
  var data_header = value.header;
  XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    const sheet1 = workbook.sheet(0);
    const sheetData = getSheetData(data, data_header);
    console.log(sheetData);
    const totalColumns = sheetData[0].length;

    sheet1.cell("A1").value(sheetData);
    const range = sheet1.usedRange();
    const endColumn = String.fromCharCode(64 + totalColumns);
    sheet1.row(1).style("bold", true);
    sheet1.range("A1:" + endColumn + "1").style("fill", "F4D03F");
    range.style("border", true);
    return workbook.outputAsync().then((res) => {
      console.log(res);
      saveAs(res, title);
    });
  });
}

export const exportListCollaborator = (store_code, page, params) => {
  return (dispatch) => {
    collaboratorApi
      .fetchAllCollaborator(store_code, page, params)
      .then((res) => {
        if (res.data.code !== 401)
          if (res.data.code !== 401)
            if (typeof res.data.data != "undefined") {
              if (typeof res.data.data.data != "undefined") {
                if (res.data.data.data.length > 0) {
                  var newArray = [];
                  var index = 0;
                  for (const item of res.data.data.data) {
                    index = index + 1;
                    var newItem = {};
                    var arangeKeyItem = {
                      name: item.customer?.name,
                      phone_number: item.customer?.phone_number,
                      balance: item.balance ? item.balance : 0,
                      referral_phone_number:
                        item.customer.referral_phone_number,
                      status:
                        item.status == 1 ? "Đã kích hoạt" : "Chưa kích hoạt",
                    };
                    Object.entries(arangeKeyItem).forEach(
                      ([key, value], index) => {
                        if (key == "name") {
                          newItem["Tên"] = value;
                        }
                        if (key == "phone_number") {
                          newItem["Số điện thoại"] = value;
                        }
                        if (key == "balance") {
                          newItem["Số dư"] = value;
                        }
                        if (key == "referral_phone_number") {
                          newItem["Mã giới thiệu"] = value;
                        }
                        if (key == "status") {
                          newItem["Trạng thái"] = value;
                        }
                      }
                    );

                    newArray.push(newItem);
                  }
                  var header = [];
                  if (newArray.length > 0) {
                    Object.entries(newArray[0]).forEach(
                      ([key, value], index) => {
                        header.push(key);
                      }
                    );
                  }
                  saveAsExcel(
                    { data: newArray, header: header },
                    "Danh sách CTV"
                  );
                }
              }
            }
      });
  };
};

export const exportListRequest = (store_code, searchValue, from) => {
  return (dispatch) => {
    collaboratorApi.fetchAllRequestPayment(store_code).then((res) => {
      if (res.data.code !== 401)
        if (res.data.code !== 401)
          if (typeof res.data.data != "undefined") {
            if (res.data.data.length > 0) {
              var newArray = [];
              var index = 0;

              var newArr = [];
              if (res.data.data?.length > 0) {
                for (const item of res.data.data) {
                  const itemSearch =
                    item.collaborator?.customer?.name
                      ?.toString()
                      ?.trim()
                      .toLowerCase() || "";
                  const itemAccountNumber = item.collaborator?.account_number
                    ?.toString()
                    ?.trim()
                    .toLowerCase();
                  const valueSearch = searchValue
                    ?.toString()
                    ?.trim()
                    .toLowerCase();
                  if (
                    removeAscent(itemSearch)?.includes(
                      removeAscent(valueSearch)
                    ) ||
                    removeAscent(itemAccountNumber)?.includes(
                      removeAscent(valueSearch)
                    )
                  ) {
                    newArr.push(item);
                  }
                }
              }
              const resFrom =
                from == ""
                  ? newArr
                  : newArr.filter((item) => item.from == from);
              if (resFrom.length == 0) return;

              const handleAddress = (
                address_detail,
                wards_name,
                district_name,
                province_name
              ) => {
                let addressDefault = "";
                if (address_detail) {
                  addressDefault += address_detail ? `${address_detail}, ` : "";
                }
                if (wards_name) {
                  addressDefault += wards_name ? `${wards_name}, ` : "";
                }
                if (district_name) {
                  addressDefault += district_name ? `${district_name}, ` : "";
                }
                if (province_name) {
                  addressDefault += province_name ? `${province_name}` : "";
                }
                return addressDefault;
              };
              for (const item of resFrom) {
                var newItem = {};
                var arangeKeyItem = {
                  name: item?.collaborator?.customer?.name,
                  phone_number: item?.collaborator?.customer?.phone_number,
                  from:
                    item.from == 0
                      ? "Khách hàng yêu cầu"
                      : item.from == 1
                      ? "Từ admin"
                      : "Tất cả",
                  money: Number(item.money),
                  date: item.created_at,
                  account_name:
                    item?.collaborator?.account_name === null
                      ? ""
                      : item?.collaborator?.account_name,
                  account_number:
                    item?.collaborator?.account_number === null
                      ? ""
                      : item?.collaborator?.account_number,
                  bank:
                    item?.collaborator?.bank === null
                      ? ""
                      : item?.collaborator?.bank,
                  cmnd:
                    item?.collaborator?.cmnd === null
                      ? ""
                      : item?.collaborator?.cmnd,
                  issued_by:
                    item?.collaborator?.issued_by === null
                      ? ""
                      : item?.collaborator?.issued_by,
                  address_default: handleAddress(
                    item?.collaborator?.customer?.address_detail,
                    item?.collaborator?.customer?.wards_name,
                    item?.collaborator?.customer?.district_name,
                    item?.collaborator?.customer?.province_name
                  ),
                };
                Object.entries(arangeKeyItem).forEach(([key, value], index) => {
                  if (key == "name") {
                    newItem["Họ tên"] = value;
                  }
                  if (key == "phone_number") {
                    newItem["Số điện thoại"] = value;
                  }
                  if (key == "from") {
                    newItem["Nguồn yêu cầu"] = value;
                  }
                  if (key == "money") {
                    newItem["Số tiền"] = value;
                  }
                  if (key == "date") {
                    newItem["Ngày yêu cầu"] = value;
                  }
                  if (key == "account_name") {
                    newItem["Tên chủ tài khoản"] = value;
                  }
                  if (key == "account_number") {
                    newItem["Số tài khoản"] = value;
                  }
                  if (key == "bank") {
                    newItem["Tên ngân hàng"] = value;
                  }
                  if (key == "cmnd") {
                    newItem["CMND/CCCD"] = value;
                  }
                  if (key == "issued_by") {
                    newItem["Nơi đăng kí"] = value;
                  }
                  if (key == "address_default") {
                    newItem["Địa chỉ"] = value;
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
                "Danh sách Quyết toán đại lý"
              );
            }
          }
    });
  };
};

export const exportTopten = (store_code, page, params) => {
  return (dispatch) => {
    collaboratorApi.fetchAllTopReport(store_code, page, params).then((res) => {
      console.log(res);

      if (res.data.code !== 401)
        if (typeof res.data.data != "undefined") {
          if (typeof res.data.data.data != "undefined") {
            if (res.data.data.data.length > 0) {
              var newArray = [];

              for (const item of res.data.data.data) {
                var newItem = {};
                var arangeKeyItem = {
                  name: item.customer?.name,
                  phone_number: item.customer?.phone_number,
                  balance: item.balance ? item.balance : "0",
                  orders_count: item.orders_count ? item.orders_count : "0",
                  sum_share_collaborator: item.sum_share_collaborator
                    ? item.sum_share_collaborator
                    : "0",
                  sum_total_after_discount: item.sum_total_after_discount
                    ? item.sum_total_after_discount
                    : "0",
                };
                Object.entries(arangeKeyItem).forEach(([key, value], index) => {
                  if (key == "name") {
                    newItem["Tên"] = value;
                  }
                  if (key == "phone_number") {
                    newItem["Số điện thoại"] = value;
                    // newItem["Tên sản phẩm"] = value
                  }
                  if (key == "balance") {
                    newItem["Tổng dư hiện tại"] = value;
                  }
                  if (key == "orders_count") {
                    newItem["Số đơn hàng"] = value;
                    // newItem["Tên sản phẩm"] = value
                  }
                  if (key == "sum_share_collaborator") {
                    newItem["Tổng hoa hồng"] = value;
                  }
                  if (key == "sum_total_after_discount") {
                    newItem["Tổng doanh số"] = value;
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
                "Danh sách Top CTV"
              );
            }
          }
        }
    });
  };
};

export const fetchCollaboratorConf = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    collaboratorApi.fetchCollaboratorConf(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_COLLABORATOR_CONFIG,
          data: res.data.data,
        });
    });
  };
};

export const fetchAllHistory = (store_code, page = 1, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    collaboratorApi.fetchAllHistory(store_code, page, params).then((res) => {
      console.log(res);
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_COLLABORATOR_HISTORY_PAYMENT,
          data: res.data.data,
        });
    });
  };
};

export const updateAllRequestPayment = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    collaboratorApi
      .updateAllRequestPayment(store_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        collaboratorApi.fetchAllRequestPayment(store_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_COLLABORATOR_REQUEST_PAYMENT,
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

export const fetchAllTopReport = (store_code, page = 1, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    collaboratorApi.fetchAllTopReport(store_code, page, params).then((res) => {
      console.log(res);
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_COLLABORATOR_TOP_REPORT,
          data: res.data.data,
        });
    });
  };
};

export const updateCollaborator = (store_code, id, data, page, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    collaboratorApi
      .updateCollaborator(store_code, id, data)
      .then((res) => {
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
        collaboratorApi
          .fetchAllCollaborator(store_code, page, params)
          .then((res) => {
            dispatch({
              type: Types.SHOW_LOADING_LAZY,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_COLLABORATOR,
                data: res.data.data,
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

export const updateRequestPayment = (store_code, data) => {
  console.log(store_code, data);
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    collaboratorApi
      .updateRequestPayment(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        collaboratorApi.fetchAllRequestPayment(store_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_COLLABORATOR_REQUEST_PAYMENT,
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

export const fetchAllRequestPayment = (store_code, params = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    collaboratorApi.fetchAllRequestPayment(store_code, params).then((res) => {
      console.log(res);
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_COLLABORATOR_REQUEST_PAYMENT,
          data: res.data.data,
        });
    });
  };
};

export const fetchAllCollaborator = (store_code, page = 1, params = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    collaboratorApi
      .fetchAllCollaborator(store_code, page, params)
      .then((res) => {
        console.log(res);
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_COLLABORATOR,
            data: res.data.data,
          });
      });
  };
};

export const handleCollaboratorRegisterRequest = (store_code, id, status) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    collaboratorApi
      .handleCollaboratorRegisterRequest(store_code, id, status)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        dispatch({
          type: Types.SUCCESS_EDIT_REQUEST_STATUS_COLLABORATOR,
          status: status,
          id: id,
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
  };
};

export const fetchAllCollaboratorRegisterRequests = (
  store_code,
  page = 1,
  params = null
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    collaboratorApi
      .fetchAllCollaboratorRegisterRequests(store_code, page, params)
      .then((res) => {
        console.log(res);
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_COLLABORATOR_REGISTER_REQUEST,
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

export const fetchAllSteps = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    collaboratorApi.fetchAllSteps(store_code).then((res) => {
      console.log(res);
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_COLLABORATOR_STEP,
          data: res.data.data,
        });
    });
  };
};

export const createStep = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    collaboratorApi
      .createStep(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        collaboratorApi.fetchAllSteps(store_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_COLLABORATOR_STEP,
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

export const destroyStep = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    collaboratorApi
      .destroyStep(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        collaboratorApi
          .fetchAllSteps(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_COLLABORATOR_STEP,
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

export const updateStep = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    collaboratorApi
      .updateStep(store_code, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        collaboratorApi.fetchAllSteps(store_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_COLLABORATOR_STEP,
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
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
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

export const updateConfig = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    collaboratorApi
      .updateConfig(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        collaboratorApi.fetchCollaboratorConf(store_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_COLLABORATOR_CONFIG,
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
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
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

export const historiesBalanceCollaborator = (store_code, id, queryString) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    collaboratorApi
      .historiesBalanceCollaborator(store_code, id, queryString)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.FETCH_HISTORIES_BALANCE_COLLABORATOR,
            data: res.data.data,
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
export const changePriceBalance = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    collaboratorApi
      .changePriceBalance(store_code, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.CHANGE_PRICE_BALANCE,
            data: res.data.data,
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

export const updateBankInfoCollaborator = (store_code, id, data, page, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    collaboratorApi
      .updateBankInfoCollaborator(store_code, id, data)
      .then((res) => {
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
        collaboratorApi
          .fetchAllCollaborator(store_code, page, params)
          .then((res) => {
            dispatch({
              type: Types.SHOW_LOADING_LAZY,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_COLLABORATOR,
                data: res.data.data,
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