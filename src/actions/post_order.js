import * as Types from "../constants/ActionType";
import * as PosApi from "../data/remote/pos_order";
export const listPosOrder = (store_code, branch_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.FETCH_LIST_POS_ORDER_LOADING,
    });
    PosApi.listPosOrder(store_code, branch_id).then((res) => {
      console.log("res", res);
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_LIST_POS_ORDER,
          data: res.data.data,
        });
    });
  };
};

export const updateNameInCart = (
  store_code,
  branch_id,
  id_cart,
  data,
  onSuccess = () => {}
) => {
  return (dispatch) => {
    PosApi.updateNameInCart(store_code, branch_id, id_cart, data)
      .then((res) => {
        if (onSuccess) onSuccess();
        dispatch({
          type: Types.UPDATE_NAME_POS_ORDER,
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

export const addComboInCart = (store_code, branch_id, id_cart, data) => {
  return (dispatch) => {
    PosApi.addComboInCart(store_code, branch_id, id_cart, data)
      .then((res) => {
        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
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
export const addProductInCart = (store_code, branch_id, id_cart, data) => {
  return (dispatch) => {
    PosApi.addProductInCart(store_code, branch_id, id_cart, data)
      .then((res) => {
        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
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
export const deleteOneCart = (store_code, branch_id, id_cart) => {
  return (dispatch) => {
    PosApi.deleteOneCart(store_code, branch_id, id_cart)
      .then((res) => {
        console.log("res", res);

        PosApi.listPosOrder(store_code, branch_id).then((res) => {
          if (res.data.code === 200)
            dispatch({
              type: Types.FETCH_LIST_POS_ORDER,
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

export const createOneTab = (store_code, branch_id, data) => {
  return (dispatch) => {
    PosApi.createOneTab(store_code, branch_id, data)
      .then((res) => {
        console.log("res", res);

        PosApi.listPosOrder(store_code, branch_id).then((res) => {
          if (res.data.code === 200)
            dispatch({
              type: Types.FETCH_LIST_POS_ORDER,
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

export const fetchInfoOneCart = (store_code, branch_id, id) => {
  return (dispatch) => {
    PosApi.fetchInfoOneCart(store_code, branch_id, id).then((res) => {
      console.log("res", res);
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
          data: res.data.data,
        });
    });
  };
};
export const updateQuantityLineItem = (
  store_code,
  branch_id,
  id_cart,
  data
) => {
  return (dispatch) => {
    dispatch({
      type: Types.LOADING_CHANGE_QUANTITY_LINE_ITEM,
    });
    PosApi.updateQuantityLineItem(store_code, branch_id, id_cart, data)
      .then((res) => {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });

        dispatch({
          type: Types.NONE_CHANGE_QUANTITY_LINE_ITEM,
        });
        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
          data: res.data.data,
        });
      })
      .catch(function (error) {
        PosApi.fetchInfoOneCart(store_code, branch_id, id_cart).then((res) => {
          if (res.data.code == 200)
            dispatch({
              type: Types.FETCH_LIST_CART_ITEM,
              data: res.data.data,
            });
        });

        dispatch({
          type: Types.NONE_CHANGE_QUANTITY_LINE_ITEM,
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

export const subQuantityProduct = (store_code, branch_id, id_cart, data) => {
  console.log("id_cart", id_cart);
  return (dispatch) => {
    dispatch({
      type: Types.LOADING_CHANGE_QUANTITY_LINE_ITEM,
    });
    PosApi.subQuantityProduct(store_code, branch_id, id_cart, data)
      .then((res) => {
        dispatch({
          type: Types.NONE_CHANGE_QUANTITY_LINE_ITEM,
        });
        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
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
          type: Types.NONE_CHANGE_QUANTITY_LINE_ITEM,
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

export const destroyOneProduct = (store_code, branch_id, id_cart, data) => {
  console.log("id_cart", id_cart);
  return (dispatch) => {
    PosApi.destroyOneProduct(store_code, branch_id, id_cart, data)
      .then((res) => {
        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
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

export const updateInfoCart = (store_code, branch_id, id, data) => {
  return (dispatch) => {
    PosApi.updateInfoCart(store_code, branch_id, id, data)
      .then((res) => {
        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
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

export const updateInfoCarts = (store_code, branch_id, id, data) => {
  return (dispatch) => {
    PosApi.updateInfoCarts(store_code, branch_id, id, data)
      .then((res) => {
        var data2 = res.data.data;
        data2.noUpdateUI = data.noUpdateUI;

        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
          data: data2,
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
export const paymentOrderPos = (
  store_code,
  branch_id,
  id,
  data,
  _this,
  onSuccess = () => {}
) => {
  return (dispatch) => {
    dispatch({
      type: Types.POS_ORDER_PAYMENT_LOADING,
      loadingOrder: true,
    });
    PosApi.paymentOrderPos(store_code, branch_id, id, data)
      .then((res) => {
        if (_this) {
          _this.onSave = _this.props?.allowAutoPrint;
          _this.setState({
            priceCustomer: 0,
            totalFinal: 0,
            listPosItem: [],
            modalUpdateCart: {
              name: "",
              phone_number: "",
              debt: 0,
              id: 0,
            },
          });
        }
        if (onSuccess) onSuccess(res.data.data?.order_code);
        dispatch({
          type: Types.POS_ORDER_PAYMENT_SUCCESS,
          data: {
            orderAfterPayment: res.data.data,
            loadingOrder: false,
            // allowAutoPrint: data.allowAutoPrint
            // allowAutoPrint: true
          },
        });

        PosApi.listPosOrder(store_code, branch_id).then((res) => {
          if (res.data.code === 200)
            dispatch({
              type: Types.FETCH_LIST_POS_ORDER,
              data: res.data.data,
            });
        });
      })
      .catch(function (error) {
        dispatch({
          type: Types.POS_ORDER_PAYMENT_LOADING,
          loadingOrder: false,
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content:
              error?.response?.data?.msg || error?.response?.data?.message,
          },
        });
      });
  };
};
export const refreshEditOrder = (data) => {
  return (dispatch) => {
    dispatch({
      type: Types.FROM_EDIT_ORDER,
      data,
    });
  };
};

export const fetchVoucher = (store_code, branch_id, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.USE_VOUCHER_CART_LOAD,
    });
    PosApi.fetchVoucher(store_code, branch_id, id, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          dispatch({
            type: Types.USE_VOUCHER_CART_DONE,
            data: res.data.data,
          });
          window.$(".modal").modal("hide");
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "success",
              title: "Thành công ",
              disable: "show",
              content: res.data.msg,
            },
          });
        } else {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Thất bại ",
              disable: "show",
              content: res.data.msg,
            },
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

export const createCartEditOrder = (store_code, order_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.LOADING_CHANGE_QUANTITY_LINE_ITEM,
    });
    PosApi.createCartEditOrder(store_code, order_code)
      .then((res) => {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });

        dispatch({
          type: Types.NONE_CHANGE_QUANTITY_LINE_ITEM,
        });

        dispatch(
          fetchInfoOneCart(
            store_code,
            res.data.data.branch_id,
            res.data.data.id
          )
        );
      })
      .catch(function (error) {
        dispatch({
          type: Types.NONE_CHANGE_QUANTITY_LINE_ITEM,
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

export const updatePriceItem = (
  store_code,
  branch_id,
  cart_id,
  idItem,
  data
) => {
  return (dispatch) => {
    dispatch({
      type: Types.LOADING_CHANGE_QUANTITY_LINE_ITEM,
    });
    PosApi.updatePriceItem(store_code, branch_id, cart_id, idItem, data)
      .then((res) => {
        dispatch({
          type: Types.UPDATE_PRICE_ITEM,
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
            content:
              error?.response?.data?.msg || error?.response?.data?.message,
          },
        });
      });
  };
};

export const updateNoteItem = (
  store_code,
  branch_id,
  cart_id,
  idItem,
  data
) => {
  return (dispatch) => {
    dispatch({
      type: Types.LOADING_CHANGE_QUANTITY_LINE_ITEM,
    });
    PosApi.updateNoteItem(store_code, branch_id, cart_id, idItem, data)
      .then((res) => {
        dispatch({
          type: Types.UPDATE_NOTE_ITEM,
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
            content:
              error?.response?.data?.msg || error?.response?.data?.message,
          },
        });
      });
  };
};
