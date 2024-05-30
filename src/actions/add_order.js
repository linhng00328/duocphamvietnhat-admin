import * as Types from "../constants/ActionType";
import * as orderApi from "../data/remote/order_product";
export const createOrder = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    orderApi
      .createOrder(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        orderApi.fetchAllData(store_code).then((res) => {
          if (res.data.code === 200)
            dispatch({
              type: Types.FETCH_ALL_ORDER_PRODUCT,
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
export const createOrderBill = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    orderApi
      .createOrderBill(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        orderApi.fetchAllData(store_code).then((res) => {
          if (res.data.code === 200)
            dispatch({
              type: Types.FETCH_ALL_ORDER_PRODUCT,
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
export const fetchSearchPersion = (store_code, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    orderApi.fetchSearchPersion(store_code, params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_SEARCH_PERSION,
          data: res.data.data,
        });
    });
  };
};

export const fetchAllCombo = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    orderApi.fetchAllCombo(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_COMBO_PRODUCT,
          data: res.data.data,
        });
    });
  };
};

export const findAddress = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    orderApi.findAddress(store_code, id).then((res) => {
      console.log(res);
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_INFO_PERSION,
          data: res.data.data,
        });
    });
  };
};

export const fetchAllOrder = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    orderApi
      .fetchAllData(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_ORDER_PRODUCT,
            data: res.data.data,
          });
        // dispatch({
        //   type: Types.ALERT_UID_STATUS,
        //   alert: {
        //     type: "success",
        //     title: "Thành công 1",
        //     disable: "show",
        //     content: "loi",
        //   },
        // });
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

export const fetchAllPertion = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    orderApi.fetchAllPertion(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_PERTION_INFO,
          data: res.data.data,
        });
    });
  };
};

export const destroyOneProduct = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    orderApi
      .deleteProduct(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        orderApi
          .fetchAllData(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_ORDER_PRODUCT,
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

export const updateQuantityLineItem = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    orderApi
      .updateQuantityLineItem(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        dispatch({
          type: Types.FETCH_ALL_ORDER_PRODUCT,
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
export const subQuantityProduct = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    orderApi
      .subQuantityProduct(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.FETCH_ALL_ORDER_PRODUCT,
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
// export const fetchAllVoucher = (store_code) => {
//   return (dispatch) => {
//     dispatch({
//       type: Types.SHOW_LOADING,
//       loading : "show"
//     })
//     orderApi.fetchAllVoucher(store_code).then((res) => {
//       dispatch({
//         type: Types.SHOW_LOADING,
//         loading : "hide"
//       })
//       if(res.data.code !== 401)
//       dispatch({
//         type: Types.FETCH_ALL_VOUCHER_PRODUCT,
//         data: res.data.data,
//       });
//       if(res.data.msg_code === "NO_VOUCHER_EXISTS"){
//         console.log(".......")
//         dispatch({
//           type: Types.ALERT_UID_STATUS,
//           alert: {
//             type: "danger",
//             title: "Lỗi",
//             disable: "show",
//             content: "error"
//             ,
//           },
//         });
//       }
//     });
//   };
// };
export const fetchAllVoucher = (store_code, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    orderApi
      .fetchAllVoucher(store_code, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.FETCH_ALL_VOUCHER_PRODUCT,
          data: res.data.data,
        });
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error.response?.data?.msg ?? "",
          },
        });
      });
  };
};
export const showAlertMaxQuantity = () => {
  return (dispatch) => {
    dispatch({
      type: Types.ALERT_UID_STATUS,
      alert: {
        type: "danger",
        title: "Lỗi",
        disable: "show",
        content: "Quá số lượng sản phẩm trong kho",
      },
    });
  };
};
export const showAlertErrVoucher = () => {
  return (dispatch) => {
    dispatch({
      type: Types.ALERT_UID_STATUS,
      alert: {
        type: "danger",
        title: "Lỗi",
        disable: "show",
        content: "Chưa đủ điều kiện dùng voucher",
      },
    });
  };
};
