import * as Types from "../constants/ActionType";
import history from "../history";
import * as bonusProductApi from "../data/remote/bonus_product";
import * as uploadApi from "../data/remote/upload";
import { getQueryParams } from "../ultis/helpers";

export const fetchAllBonusProduct = (store_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    bonusProductApi.fetchAllBonusProduct(store_id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_BONUS_PRODUCT,
          data: res.data.data,
        });
    });
  };
};

export const fetchAllBonusProductEnd = (store_id, page = 1) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    bonusProductApi.fetchAllBonusProductEnd(store_id, page).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_BONUS_PRODUCT,
          data: res.data.data,
        });
    });
  };
};

export const fetchBonusProductId = (store_id, BonusProductId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    bonusProductApi
      .fetchBonusProductId(store_id, BonusProductId)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ID_BONUS_PRODUCT,
            data: res.data.data,
          });
      });
  };
};

export const updateBonusProduct = (store_code, BonusProduct, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    bonusProductApi
      .updateBonusProduct(store_code, BonusProduct, id)
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
        history.replace(
          `/bonus_product/${store_code}?type=${getQueryParams("type") ?? 1}${
            getQueryParams("search")
              ? `&search=${getQueryParams("search")}`
              : ""
          }`
        );
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

export const updateBonusProductIsEnd = (store_code, BonusProduct, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    bonusProductApi
      .updateBonusProduct(store_code, BonusProduct, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        bonusProductApi
          .fetchAllBonusProduct(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_BONUS_PRODUCT,
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

export const createBonusProduct = (store_code, BonusProduct, status) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    bonusProductApi
      .createBonusProduct(store_code, BonusProduct)
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
        if (status)
          history.replace(`/bonus_product/${store_code}?type=${status}`);
        else history.goBack();
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

export const destroyBonusProduct = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    bonusProductApi
      .destroyBonusProduct(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        bonusProductApi
          .fetchAllBonusProduct(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_BONUS_PRODUCT,
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

export const uploadImgBonusProduct = (file) => {
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
          type: Types.UPLOAD_BONUS_PRODUCT_IMG,
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

export const initialUpload = () => {
  return (dispatch) => {
    dispatch({
      type: Types.UPLOAD_BONUS_PRODUCT_IMG,
      data: null,
    });
  };
};

export const fetchBonusProductItem = (store_id, bonus_product_id, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    bonusProductApi
      .fetchBonusProductItem(store_id, bonus_product_id, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_BONUS_PRODUCT_ITEM,
            data: res.data.data,
          });
      });
  };
};

export const createBonusProductItem = (
  store_code,
  bonus_product_id,
  data,
  onSuccess = () => {}
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    bonusProductApi
      .createBonusProductItem(store_code, bonus_product_id, data)
      .then((res) => {
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_BONUS_PRODUCT_ITEM,
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
        bonusProductApi
          .fetchBonusProductId(store_code, bonus_product_id)
          .then((res) => {
            if (onSuccess) {
              onSuccess(res.data.data?.group_products?.length - 1);
            }
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ID_BONUS_PRODUCT,
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
      });
  };
};

export const updateBonusProductItem = (store_code, bonus_product_id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    bonusProductApi
      .updateBonusProductItem(store_code, bonus_product_id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công",
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
  };
};

export const destroyBonusProductItem = (
  store_code,
  bonus_product_id,
  data,
  onSuccess = () => {}
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    bonusProductApi
      .destroyBonusProductItem(store_code, bonus_product_id, data)
      .then((res) => {
        if (onSuccess) {
          onSuccess();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        bonusProductApi
          .fetchBonusProductId(store_code, bonus_product_id)
          .then((res) => {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ID_BONUS_PRODUCT,
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
      });
  };
};
