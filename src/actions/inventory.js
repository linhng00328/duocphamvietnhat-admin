import * as Type from "../constants/ActionType";
import * as inventory from "../data/remote/inventory";
import history from "../history";
import { getBranchId, getBranchIds } from "../ultis/branchUtils";

export const fetchAllInventory = (store_code, branch_id, page, params) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    console.log("params", params);
    inventory
      .fetchAllInventory(store_code, branch_id, page, params)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401) {
          dispatch({
            type: Type.FETCH_ALL_SHEETS_INVENTORY,
            data: res.data.data,
          });
        }
      });
  };
};
export const historyInventorys = (store_code, data, page = 1) => {
  const branch_id = getBranchId();
  const branch_ids = getBranchIds();
  const branchIds = branch_ids ? branch_ids : branch_id;
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    inventory
      .historyInventorys(store_code, branchIds, data, page)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401) {
          dispatch({
            type: Type.FETCH_ALL_HISTORY_INVENTORY,
            data: res.data.data,
          });
        }
      });
  };
};
export const editInventorys = (store_code, branch_id, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    inventory.editInventorys(store_code, branch_id, id, data).then((res) => {
      dispatch({
        type: Type.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401) {
        dispatch({
          type: Type.FETCH_ALL_SHEETS_INVENTORY,
          data: res.data.data,
        });
      }
    });
  };
};
export const createInventorys = (store_code, branch_id, data) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    inventory
      .createInventorys(store_code, branch_id, data)
      .then((res) => {
        console.log("res", res);
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        inventory.fetchAllInventory(store_code, branch_id).then((res) => {
          if (res.data.code === 200)
            dispatch({
              type: Type.FETCH_ALL_SHEETS_INVENTORY,
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
export const fetchDetailInventory = (store_code, branch_id, id) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    inventory.fetchDetailInventory(store_code, branch_id, id).then((res) => {
      dispatch({
        type: Type.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401) {
        dispatch({
          type: Type.FETCH_ALL_ITEM_INVENTORY,
          data: res.data.data,
        });
      }
    });
  };
};

export const handleBalanceInventory = (store_code, branch_id, id) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    inventory
      .handleBalanceInventory(store_code, branch_id, id)
      .then((res) => {
        console.log("res", res);
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        inventory
          .fetchDetailInventory(store_code, branch_id, id)
          .then((res) => {
            if (res.data.code === 200)
              dispatch({
                type: Type.FETCH_ALL_ITEM_INVENTORY,
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

export const deleteItemInventory = (store_code, branch_id, id) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    inventory
      .deleteItemInventory(store_code, branch_id, id)
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
