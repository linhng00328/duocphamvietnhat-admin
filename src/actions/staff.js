import * as Types from "../constants/ActionType";
import history from "../history";
import * as staffApi from "../data/remote/staff";

export const fetchAllStaff = (store_code, page = 1, params, branch_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    staffApi.fetchAllStaff(store_code, page, params, branch_id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_STAFF,
          data: res.data.data,
        });
    });
  };
};

export const fetchStaffId = (store_code, staffId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    staffApi.fetchStaffId(store_code, staffId).then((res) => {
      if (res.data.code !== 401)
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      dispatch({
        type: Types.FETCH_ID_STAFF,
        data: res.data.data,
      });
    });
  };
};

export const createStaff = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    staffApi
      .createStaff(store_code, data)
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

export const destroyStaff = (store_code, id, page, params, branch_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    staffApi
      .destroyStaff(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        staffApi
          .fetchAllStaff(store_code, page, params, branch_id)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_STAFF,
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

export const updateStaff = (id, data, store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    staffApi
      .updateStaff(id, data, store_code)
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
export const updateCustomerToSale = (store_code, id, data, branch_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    staffApi
      .updateCustomerToSale(store_code, id, data)
      .then((res) => {
        dispatch({
          type: Types.UPDATE_STATUS_STAFF_STAFF,
          data: res.data.data,
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
        // dispatch(fetchAllStaff(store_code, null, "", branch_id));
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

// code newer
export const fetchHistoryToDistributorByStaffId = (
  store_code,
  date_form,
  date_to
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    staffApi
      .historyReportSalerToDistributor(store_code, date_form, date_to)
      .then((res) => {
        if (res.data.code !== 401)
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
        dispatch({
          type: Types.FETCH_HISTORY_SALE_TO_DISTRIBUTOR,
          data: res.data.data,
        });
      });
  };
};

export const fetchReportSalerToDistributord = (
  store_code,
  date_from,
  date_to,
  staff_id
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    staffApi
      .reportSalerToDistributor(store_code, date_from, date_to, staff_id)
      .then((res) => {
        if (res.data.code !== 401)
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
        dispatch({
          type: Types.REPORT_SALER_TO_DISTRIBUTOR,
          data: res.data.data,
        });
      });
  };
};
