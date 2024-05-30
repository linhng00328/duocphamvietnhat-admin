import * as Types from "../constants/ActionType";
import * as attributeApi from "../data/remote/attribute_search";

export const fetchAllAttributeSearch = (store_code, params = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributeApi.fetchAllData(store_code, params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_ATTRIBUTE_SEARCH,
          data: res.data.data,
        });
    });
  };
};

export const createAttributeSearch = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributeApi
      .createAttributeSearch(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        attributeApi.fetchAllData(store_code).then((res) => {
          if (res.data.code === 200)
            dispatch({
              type: Types.FETCH_ALL_ATTRIBUTE_SEARCH,
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

export const sortAttributeSearch = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributeApi
      .sortAttributeSearch(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Sắp xếp thành công ",
            disable: "show",
            content: "Sắp xếp thành công",
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

export const updateAttributeSearch = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributeApi
      .updateAttributeSearch(store_code, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        attributeApi.fetchAllData(store_code).then((res) => {
          if (res.data.code !== 401) {
            dispatch({
              type: Types.FETCH_ALL_ATTRIBUTE_SEARCH,
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
          }
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
export const createAttributeSearchChild = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributeApi
      .createAttributeSearchChild(store_code, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        attributeApi.fetchAllData(store_code).then((res) => {
          if (res.data.code === 200)
            dispatch({
              type: Types.FETCH_ALL_ATTRIBUTE_SEARCH,
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

export const updateAttributeSearchChild = (store_code, id, idChild, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributeApi
      .updateAttributeSearchChild(store_code, id, idChild, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        attributeApi.fetchAllData(store_code).then((res) => {
          if (res.data.code !== 401) {
            dispatch({
              type: Types.FETCH_ALL_ATTRIBUTE_SEARCH,
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
          }
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

export const destroyAttributeSearchChild = (store_code, id, idChild) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributeApi
      .destroyAttributeSearchChild(store_code, id, idChild)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        attributeApi
          .fetchAllData(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_ATTRIBUTE_SEARCH,
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
export const destroyAttributeSearch = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributeApi
      .destroyAttributeSearch(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        attributeApi
          .fetchAllData(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_ATTRIBUTE_SEARCH,
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
export const getAttributeSearch = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributeApi.getAttributeSearch(store_code, id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_ATTRIBUTE_SEARCH_PRODUCT,
          data: res.data.data,
        });
    });
  };
};
export const setUpAttributeSearch = (store_code, id, form) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributeApi.setUpAttributeSearch(store_code, id, form).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
    });
  };
};
