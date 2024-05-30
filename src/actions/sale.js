import XlsxPopulate from "xlsx-populate";
import * as Types from "../constants/ActionType";
import * as saleApi from "../data/remote/sale";
import { saveAs } from "file-saver";

export const fetchStaffConfig = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .fetchStaffConfig(store_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.FETCH_ALL_SALE_CONFIG,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
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

export const fetchAllSteps = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .fetchAllSteps(store_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.FETCH_ALL_SALE_STEP,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
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
export const addStep = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .addStep(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.ADD_SALE_STEP,
            data: res.data.success,
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
          dispatch(fetchAllSteps(store_code));
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
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
export const updateStep = (store_code, idStep, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .updateStep(store_code, idStep, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.UPDATE_SALE_STEP,
            data: res.data.success,
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
          dispatch(fetchAllSteps(store_code));
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
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
      });
  };
};
export const removeStep = (store_code, idStep) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .removeStep(store_code, idStep)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.REMOVE_SALE_STEP,
            data: res.data.success,
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
          dispatch(fetchAllSteps(store_code));
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
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
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .updateConfig(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "success",
              title: "Thành công ",
              disable: "show",
              content: res.data.msg,
            },
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
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
export const addCustomerToSale = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .addCustomerToSale(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.ADD_CUSTOMER_TO_SALE,
            data: res.data.success,
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
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
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
export const fetchStatisticalSaleForUser = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .fetchStatisticalSaleForUser(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.STATISTICAL_SALE_USER,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
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
export const fetchAllTopCommission = (store_code, page = 1, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi.fetchAllTopCommission(store_code, page, params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_SALE_TOP_COMMISSION,
          data: res.data.data,
        });
    });
  };
};
export const fetchListIdsFromSale = (store_code, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi.fetchListIdsFromSale(store_code, params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_LIST_IDS_CUSTOMER_FROM_SALE,
          data: res.data.data,
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
export const exportTopten = (store_code, page, params, report_type) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });

    saleApi.fetchAllTopCommission(store_code, page, params).then((res) => {
      console.log(res);

      if (res.data.code !== 401)
        if (typeof res.data.data != "undefined") {
          if (typeof res.data.data.data != "undefined") {
            if (res.data.data.data.length > 0) {
              var newArray = [];

              for (const item of res.data.data.data) {
                var newItem = {};
                var arangeKeyItem = {};
                if (report_type === "point") {
                  arangeKeyItem = {
                    name: item?.name,
                    phone_number: item?.phone_number,
                    // points_count: item.points_count,
                    sum_point: item.sum_point,
                  };
                } else {
                  arangeKeyItem = {
                    name: item?.name,
                    phone_number: item?.phone_number,
                    total_customer_in_filer: item?.total_customer_in_filer,
                    orders_count: item.orders_count,
                    sum_total_after_discount_no_use_bonus:
                      item.sum_total_after_discount_no_use_bonus,
                  };
                }
                Object.entries(arangeKeyItem).forEach(([key, value], index) => {
                  if (key == "name") {
                    newItem["Tên"] = value;
                  }
                  if (key == "phone_number") {
                    newItem["Số điện thoại"] = value;
                    // newItem["Tên sản phẩm"] = value
                  }
                  if (key == "total_customer_in_filer") {
                    newItem["Số khách hàng"] = value;
                    // newItem["Tên sản phẩm"] = value
                  }
                  if (report_type === "point") {
                    // if (key == "points_count") {
                    //   newItem["Số xu"] = value;
                    //   // newItem["Tên sản phẩm"] = value
                    // }
                    if (key == "sum_point") {
                      newItem["Tổng số xu"] = value;
                    }
                  } else {
                    if (key == "orders_count") {
                      newItem["Số đơn hàng"] = value;
                      // newItem["Tên sản phẩm"] = value
                    }
                    if (key == "sum_total_after_discount_no_use_bonus") {
                      newItem["Tổng doanh số"] = value;
                    }
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

              dispatch({
                type: Types.SHOW_LOADING_LAZY,
                loading: "hide",
              });

              saveAsExcel(
                { data: newArray, header: header },
                "Danh sách Top Sale"
              );
            }
          }
        }
    });
  };
};

//Sale Management
export const fetchStatisticalSale = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .fetchStatisticalSale(store_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.STATISTICAL_SALE,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
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
export const fetchListCustomerOfSale = (store_code, page, queryString) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .fetchListCustomerOfSale(store_code, page, queryString)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.FETCH_ALL_CUSTOMER_OF_SALE,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
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
export const fetchDetailCustomerOfSale = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .fetchDetailCustomerOfSale(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.FETCH_DETAIL_OF_CUSTOMER,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
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
export const addCustomerOfSale = (store_code, data, funcModal) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .addCustomerOfSale(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.ADD_CUSTOMER_OF_SALE,
            data: res.data.success,
          });
          funcModal();
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "success",
              title: "Thành công ",
              disable: "show",
              content: res.data.msg,
            },
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
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
export const updateCustomerOfSale = (store_code, data, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .updateCustomerOfSale(store_code, data, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.UPDATE_CUSTOMER_OF_SALE,
            data: res.data.success,
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
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
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
export const deletedCustomerOfSale = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .deletedCustomerOfSale(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.REMOVE_CUSTOMER_OF_SALE,
            data: res.data.success,
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
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
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
