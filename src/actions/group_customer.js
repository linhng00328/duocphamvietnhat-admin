import * as Types from "../constants/ActionType";
import * as groupCustomerApi from "../data/remote/group_customer";

export const fetchGroupCustomer = (store_code, params) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    groupCustomerApi
      .fetchGroupCustomer(store_code, params)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code !== 401) {
          dispatch({
            type: Types.FETCH_ALL_GROUP_CUSTOMER,
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
            content: error?.response?.data?.message,
          },
        });
      });
  };
};
export const fetchListCustomerByGroup = (
  store_code,
  idGroupCustomer,
  params
) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    groupCustomerApi
      .fetchListCustomerByGroup(store_code, idGroupCustomer, params)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code !== 401) {
          dispatch({
            type: Types.FETCH_ALL_CUSTOMER,
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
            content: error?.response?.data?.message,
          },
        });
      });
  };
};
export const fetchGroupCustomerById = (store_code, idGroupCustomer) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    groupCustomerApi
      .fetchGroupCustomerById(store_code, idGroupCustomer)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code !== 401) {
          dispatch({
            type: Types.FETCH_GROUP_CUSTOMER,
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
            content: error?.response?.data?.message,
          },
        });
      });
  };
};

export const createGroupCustomer = (store_code, data) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    groupCustomerApi
      .createGroupCustomer(store_code, data)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code !== 401) {
          dispatch({ type: Types.CREATE_GROUP_CUSTOMER, data: res.data.data });
          groupCustomerApi
            .fetchGroupCustomer(store_code)
            .then((res) => {
              if (res.data.code !== 401) {
                dispatch({
                  type: Types.FETCH_ALL_GROUP_CUSTOMER,
                  data: res.data.data,
                });
              }
              dispatch({
                type: Types.ALERT_UID_STATUS,
                alert: {
                  type: "success",
                  title: "Thành công",
                  disable: "show",
                  content: res.data?.msg,
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
                  content: error?.response?.data?.message,
                },
              });
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

export const updateGroupCustomer = (
  store_code,
  idGroupCustomer,
  data,
  params
) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    groupCustomerApi
      .updateGroupCustomer(store_code, idGroupCustomer, data)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code !== 401) {
          dispatch({
            type: Types.UPDATE_GROUP_CUSTOMER,
            data: res.data.data,
          });
          groupCustomerApi
            .fetchGroupCustomer(store_code, params)
            .then((res) => {
              if (res.data.code !== 401) {
                dispatch({
                  type: Types.FETCH_ALL_GROUP_CUSTOMER,
                  data: res.data.data,
                });
              }

              dispatch({
                type: Types.ALERT_UID_STATUS,
                alert: {
                  type: "success",
                  title: "Thành công",
                  disable: "show",
                  content: res.data?.msg,
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
                  content: error?.response?.data?.message,
                },
              });
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
            content: error?.response?.data?.message,
          },
        });
      });
  };
};

export const deleteGroupCustomer = (store_code, idGroupCustomer, params) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    groupCustomerApi
      .deleteGroupCustomer(store_code, idGroupCustomer)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code !== 401) {
          dispatch({
            type: Types.DELETE_GROUP_CUSTOMER,
            message: res.data.msg,
          });
          groupCustomerApi
            .fetchGroupCustomer(store_code, params)
            .then((res) => {
              if (res.data.code !== 401) {
                dispatch({
                  type: Types.FETCH_ALL_GROUP_CUSTOMER,
                  data: res.data.data,
                });
              }
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
                  content: error?.response?.data?.message,
                },
              });
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
            content: error?.response?.data?.message,
          },
        });
      });
  };
};
