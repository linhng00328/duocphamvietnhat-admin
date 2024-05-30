import * as Type from "../constants/ActionType";
import * as transferStock from "../data/remote/transfer_stock";
import history from "../history";
import { getBranchId } from "../ultis/branchUtils";

export const fetchAllTransferStock = (store_code, branch_id, page, params) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    console.log("page", page);
    transferStock
      .fetchAllTransferStock(store_code, branch_id, page, params)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401) {
          dispatch({
            type: Type.FETCH_ALL_TRANSFER_STOCK,
            data: res.data.data,
          });
        }
      });
  };
};
export const fetchAllTransferStockReceiver = (
  store_code,
  branch_id,
  page,
  params
) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    console.log("page", page);
    transferStock
      .fetchAllTransferStockReceiver(store_code, branch_id, page, params)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401) {
          dispatch({
            type: Type.FETCH_ALL_TRANSFER_STOCK_RECEIVER,
            data: res.data.data,
          });
        }
      });
  };
};

export const fetchDetailTransferStock = (store_code, branch_id, id) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    transferStock
      .fetchDetailTransferStock(store_code, branch_id, id)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401) {
          dispatch({
            type: Type.FETCH_DETAIL_TRANSFER_STOCK,
            data: res.data.data,
          });
        }
      });
  };
};
export const createTransferStocks = (store_code, branch_id, id) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    transferStock
      .createTransferStocks(store_code, branch_id, id)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });

        history.replace(`/transfer_stocks/index/${store_code}`);
      })
      .catch(function (error) {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
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

export const updateTransferStock = (
  store_code,
  branch_id,
  id,
  data,
  redirect = true
) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    transferStock
      .updateTransferStock(store_code, branch_id, id, data)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        if (redirect) history.goBack();
        else {
          transferStock
            .fetchDetailTransferStock(store_code, branch_id, id)
            .then((res) => {
              dispatch({
                type: Type.SHOW_LOADING,
                loading: "hide",
              });
              if (res.data.code !== 401) {
                dispatch({
                  type: Type.FETCH_DETAIL_TRANSFER_STOCK,
                  data: res.data.data,
                });
              }
            });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
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

export const chooseMethorPayment = (store_code, branch_id, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    transferStock
      .chooseMethorPayment(store_code, branch_id, id, data)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        transferStock
          .fetchDetailTransferStock(store_code, branch_id, id)
          .then((res) => {
            dispatch({
              type: Type.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401) {
              dispatch({
                type: Type.FETCH_DETAIL_TRANSFER_STOCK,
                data: res.data.data,
              });
            }
          });
        dispatch({
          type: Type.ALERT_UID_STATUS,
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
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
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
export const changeStatus = (store_code, branch_id, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    transferStock.changeStatus(store_code, branch_id, id, data).then((res) => {
      dispatch({
        type: Type.SHOW_LOADING,
        loading: "hide",
      });
      transferStock
        .fetchDetailTransferStock(store_code, branch_id, id)
        .then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Type.FETCH_DETAIL_TRANSFER_STOCK,
              data: res.data.data,
            });
          dispatch({
            type: Type.ALERT_UID_STATUS,
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
            type: Type.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: error?.response?.data?.msg,
            },
          });
        });
    });
  };
};

export const postRefund = (id, data, store_code, branch = getBranchId()) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    transferStock
      .postRefund(id, data, store_code, branch)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
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
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
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
