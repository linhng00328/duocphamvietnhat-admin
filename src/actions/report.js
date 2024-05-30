import * as Types from "../constants/ActionType";
import history from "../history";
import * as storeApi from "../data/remote/store";
import * as typeStoreApi from "../data/remote/type_store";
import * as uploadApi from "../data/remote/upload";
import * as badgeApi from "../data/remote/badge";
import * as reportApi from "../data/remote/report";

export const fetchAllStore = () => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi.fetchAllData().then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_STORE,
          data: res.data.data,
        });
    });
  };
};
export const fetchAllReportInventory = (
  store_code,
  branch_id,
  page,
  params
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .fetchAllReportInventory(store_code, branch_id, page, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_REPORT_INVENTORY,
            data: res.data.data,
          });
      })
      .catch((error) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      });
  };
};
export const fetchAllCustomerDebt = (store_code, branch_id, page, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .fetchAllCustomerDebt(store_code, branch_id, page, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_REPORT_CUSTOMER_DEBT,
            data: res.data.data,
          });
      });
  };
};

export const fetchAllInventoryHistory = (
  store_code,
  branch_id,
  page,
  params
) => {
  console.log("params", params);
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .fetchAllInventoryHistory(store_code, branch_id, page, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_INVENTORY_HISTORY,
            data: res.data.data,
          });
      });
  };
};

export const fetchReportProfit = (store_code, branch_id, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi.fetchReportProfit(store_code, branch_id, params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_REPORT_PROFIT,
          data: res.data.data,
        });
    });
  };
};

export const fetchReportExpenditure = (store_code, branch_id, page, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .fetchReportExpenditure(store_code, branch_id, page, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_REPORT_EXPENDITURE,
            data: res.data.data,
          });
      });
  };
};

export const exportRevenueExpenditure = (
  store_code,
  branch_id,
  page,
  params,
  onSuccess = () => {}
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .exportRevenueExpenditure(store_code, branch_id, page, params)
      .then((res) => {
        const aTag = document.createElement("a");
        aTag.href = res.data.data;
        aTag.click();

        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      });
  };
};
export const fetchAllSupplierDebt = (store_code, branch_id, page, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .fetchAllSupplierDebt(store_code, branch_id, page, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_REPORT_SUPPLIER_DEBT,
            data: res.data.data,
          });
      });
  };
};

export const fetchReportProfitCompare = (store_code, branch_id, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .fetchReportProfitCompare(store_code, branch_id, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_REPORT_PROFIT_COMPARE,
            data: res.data.data,
          });
      });
  };
};

export const fetchImportExportStock = (store_code, branch_id, page, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .fetchImportExportStock(store_code, branch_id, page, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_IMPORT_EXPORT_STOCK,
            data: res.data.data,
          });
      })
      .catch((error) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      });
  };
};

export const fetchTopTenProduct = (store_code, branch_id, params = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    reportApi.fetchTopTenProduct(store_code, branch_id, params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_TOPTEN_REPORT,
          data: res.data.data,
        });
    });
  };
};

export const fetchOverview = (store_code, branch_id, params = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    reportApi
      .fetchOverview(store_code, branch_id, params)
      .then((res) => {
        console.log(res);
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_OVERVIEW_REPORT,
            data: res.data.data,
          });
      })
      .catch(function (error) {
        if (typeof error.response == "undefined") console.log(error);
        else {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: error?.response?.data?.msg,
            },
          });
        }
      });
  };
};

export const fetchDataId = (id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi.fetchDataId(id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ID_STORE,
          data: res.data.data,
        });
    });
  };
};
export const createStore = (data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .createStore(data)
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
        history.goBack();
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

export const updateStore = (data, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .updateStore(data, id)
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
        history.goBack();
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
export const fetchAllTypeStore = () => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    typeStoreApi.fetchAllData().then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_TYPESTORE,
          data: res.data.data,
        });
    });
  };
};
export const destroyStore = (id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .destroyStore(id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchAllData()
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_STORE,
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

export const uploadImgStore = (file) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    uploadApi
      .upload(file)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.UPLOAD_STORE_IMG,
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
  };
};
