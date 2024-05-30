import * as Types from "../constants/ActionType";
import history from "../history";
import * as voucherApi from "../data/remote/voucher";
import * as uploadApi from "../data/remote/upload";
import { getQueryParams } from "../ultis/helpers";

export const fetchAllVoucher = (store_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    voucherApi.fetchAllVoucher(store_id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_VOUCHER,
          data: res.data.data,
        });
    });
  };
};

export const fetchAllVoucherEnd = (store_id, page = 1) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    voucherApi.fetchAllVoucherEnd(store_id, page).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_VOUCHER,
          data: res.data.data,
        });
    });
  };
};

export const fetchVoucherId = (store_id, voucherId, onSuccess = () => {}) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    voucherApi.fetchVoucherId(store_id, voucherId).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        onSuccess();
        dispatch({
          type: Types.FETCH_ID_VOUCHER,
          data: res.data.data,
        });
    });
  };
};

export const updateVoucher = (store_code, voucher, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    voucherApi
      .updateVoucher(store_code, voucher, id)
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
          `/voucher/${store_code}?type=${getQueryParams("type") ?? 1}${
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
            content:
              error?.response?.data?.msg || error?.response?.data?.message,
          },
        });
      });
  };
};

export const updateVoucherIsEnd = (store_code, voucher, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    voucherApi
      .updateVoucher(store_code, voucher, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        voucherApi
          .fetchAllVoucher(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_VOUCHER,
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

export const createVoucher = (store_code, voucher, status) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    voucherApi

      .createVoucher(store_code, voucher)
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
        if (status) history.replace(`/voucher/${store_code}?type=${status}`);
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

export const destroyVoucher = (store_code, id, is_end) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    voucherApi
      .destroyVoucher(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        if (is_end == 1) {
          voucherApi.fetchAllVoucherEnd(store_code, 1).then((res) => {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_VOUCHER,
                data: res.data.data,
              });
          });
        } else {
          voucherApi
            .fetchAllVoucher(store_code)
            .then((res) => {
              if (res.data.code !== 401)
                dispatch({
                  type: Types.FETCH_ALL_VOUCHER,
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
        }
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

export const uploadImgVoucher = (file) => {
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
          type: Types.UPLOAD_VOUCHER_IMG,
          data: res.data.data,
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

export const initialUpload = () => {
  return (dispatch) => {
    dispatch({
      type: Types.UPLOAD_DISCOUNT_IMG,
      data: null,
    });
  };
};

export const fetchAllVoucherCodes = (store_code, vourcher_id, page, search_value, status, perpage) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    voucherApi.fetchAllVoucherCodes(store_code, vourcher_id, page, search_value, status, perpage).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_VOUCHER_CODES,
          data: res.data.data,
        });
    });
  };
};

export const fetchExportVoucherCodes = (store_code, vourcher_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    voucherApi.fetchExportVoucherCodes(store_code, vourcher_id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401){
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công",
            disable: "show",
            content: "Xuất file thành công !",
          },
        });
        let anchor = document.createElement('a');
        anchor.href = res.data.data;
        anchor.click();
        document.body.removeChild(anchor);
      }
    });
  };
};

export const changeStatuVourcherCodes = (store_code, vourcher_id, data, onSuccess = () => {}) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    voucherApi.changeStatuVourcherCodes(store_code, vourcher_id, data).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401){
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công",
            disable: "show",
            content: "Vô hiệu mã thành công !",
          },
        });
        if(onSuccess) onSuccess()
      }
    });
  };
};

export const fetchAllListProductsByVoucherId = (store_code, vourcher_id, page, perpage, onSuccess = () => {}) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    voucherApi.fetchAllListProductsByVoucherId(store_code, vourcher_id, page, perpage).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401){
        onSuccess();
        dispatch({
          type: Types.FETCH_LIST_PRODUCTS_BY_VOUCHER_ID,
          data: res.data.data,
        });
      }
    });
  };
};