import * as Types from "../constants/ActionType";
import * as shipmentApi from "../data/remote/shipment";

export const fetchAllShipment = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    shipmentApi.fetchAllShipment(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_SHIPMENT,
          data: res.data.data,
        });
    });
  };
};

export const calculateShipment = (store_code, shipment, value) => {
  return async (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_SHIPPER,
      loading: "show",
    });
    for (let index = 0; index < shipment.length; index++) {
      try {
        var res = await shipmentApi.calculate(
          store_code,
          shipment[index].id,
          value
        );
        console.log(res.data);
        if (res)
          dispatch({
            type: Types.FETCH_ALL_CALCULATE_SHIPMENT,
            data: res.data?.data,
          });
      } catch (error) {
        console.log(error);
      }
    }
    dispatch({
      type: Types.SHOW_LOADING_SHIPPER,
      loading: "hide",
    });
  };
};

export const fetchListShipmentV2 = (store_code, dataShipment, onSuccess) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_SHIPPER,
      loading: "show",
    });
    shipmentApi
      .fetchListShipmentV2(store_code)
      .then(async (res) => {
        if (res?.data?.code === 200) {
          const data = [];
          if (res?.data.data?.length > 0) {
            for (var element of res.data.data) {
              await shipmentApi
                .calculateShipmentV2(
                  store_code,
                  element.partner_id,
                  dataShipment
                )
                .then((resService) => {
                  if (
                    resService?.data?.code === 200 &&
                    resService?.data.data?.fee_with_type_ship?.length > 0
                  ) {
                    data.push(resService.data.data);
                    if (onSuccess) {
                      onSuccess(data);
                    }
                  }
                });
            }
          } else {
            onSuccess([]);
          }
        }
      })
      .finally(() => {
        dispatch({
          type: Types.SHOW_LOADING_SHIPPER,
          loading: "hide",
        });
      });
  };
};

export const calculateShipmentV2 = (
  store_code,
  partner_id,
  data,
  onSuccess
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    shipmentApi
      .calculateShipmentV2(store_code, partner_id, data)
      .then((res) => {
        if (res?.data?.code === 200) {
          if (onSuccess) {
            if (res?.data.data?.fee_with_type_ship?.length > 0) {
              onSuccess(res.data.data);
            } else {
              dispatch({
                type: Types.ALERT_UID_STATUS,
                alert: {
                  type: "danger",
                  title: "Lỗi",
                  disable: "show",
                  content: "Không có dịch vụ vận chuyển",
                },
              });
            }
          }
        } else {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: res?.data?.msg,
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
            content: error?.response?.data?.message,
          },
        });
      })
      .finally(() => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      });
  };
};

export const createShipment = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    shipmentApi
      .createShipment(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        shipmentApi.fetchAllShipment(store_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_SHIPMENT,
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

export const updateShipment = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    shipmentApi
      .updateShipment(store_code, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        shipmentApi.fetchAllShipment(store_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_SHIPMENT,
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

export const loginShipment = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    shipmentApi
      .loginShipment(store_code, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        shipmentApi
          .updateShipment(store_code, id, {
            token: res.data?.data?.token || "",
          })
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
            shipmentApi.fetchAllShipment(store_code).then((res) => {
              if (res.data.code !== 401)
                dispatch({
                  type: Types.FETCH_ALL_SHIPMENT,
                  data: res.data.data,
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
export const loginShipmentVietNamPost = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    shipmentApi
      .loginShipmentVietNamPost(store_code, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        shipmentApi
          .updateShipment(store_code, id, {
            token: res.data?.data?.token || "",
          })
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
            shipmentApi.fetchAllShipment(store_code).then((res) => {
              if (res.data.code !== 401)
                dispatch({
                  type: Types.FETCH_ALL_SHIPMENT,
                  data: res.data.data,
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

export const loginShipmentNhatTin = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    shipmentApi
      .loginShipmentNhatTin(store_code, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        shipmentApi
          .updateShipment(store_code, id, {
            token: res.data?.data?.token || "",
          })
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
            shipmentApi.fetchAllShipment(store_code).then((res) => {
              if (res.data.code !== 401)
                dispatch({
                  type: Types.FETCH_ALL_SHIPMENT,
                  data: res.data.data,
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

export const destroyShipment = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    shipmentApi
      .destroyShipment(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        shipmentApi
          .fetchAllShipment(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_SHIPMENT,
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

export const fetchShipmentId = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    shipmentApi.fetchShipmentId(store_code, id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ID_SHIPMENT,
          data: res.data.data,
        });
    });
  };
};
