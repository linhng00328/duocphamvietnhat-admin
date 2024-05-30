import * as Types from "../constants/ActionType";
import history from "../history";
import * as storeAApi from "../data/remote/store_address";
import * as notificationApi from "../data/remote/notification";
import * as badgeApi from "../data/remote/badge"
import { getBranchId } from "../ultis/branchUtils";
export const fetchAllStoreA = (store_code, branch_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    storeAApi.fetchAllData(store_code, branch_id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_STORE_ADDRESS,
          data: res.data.data,
        });
    });
  };
};


export const fetchShipConfig = (id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    storeAApi.fetchShipConfig(id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_SHIP_CONFIG,
          data: res.data.data,
        });
    });
  };
};

export const updateShipConfig = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    storeAApi
      .updateShipConfig(store_code, data)
      .then((res) => {
        storeAApi.fetchShipConfig(store_code).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide"
          })
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_SHIP_CONFIG,
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
  };
};




export const createStoreA = (store_code, data, _this , funcModal) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    storeAApi
      .createStoreA(store_code, data)
      .then((res) => {
        if (funcModal) {
          funcModal()
          _this.setState({
            txtName: "",
            txtPhone: "",
            CtxtName: "",
            CtxtPhone: "",
            txtAddress_detail: "",
            txtCountry: 1,
            txtProvince: "",
            txtDistrict: "",
            txtWards: "",
            CtxtAddress_detail: "",
      
            CtxtProvince: "",
            CtxtDistrict: "",
            CtxtWards: "",
      
            txtEmail: "",
            txtPickup: "",
            txtReturn: "",
          })
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        badgeApi.fetchAllBadge(store_code, getBranchId()).then((res) => {

          if (res.data.code !== 401) {
            dispatch({
              type: Types.FETCH_ALL_BADGE,
              data: res.data.data,
            });


          }
        })
        if (funcModal == null)
          history.goBack();
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
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


export const destroyStoreA = (store_code, id, branch_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    storeAApi
      .destroyStoreA(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        storeAApi.fetchAllData(store_code, branch_id)
          .then((res) => {
            if (res.data.code !== 401)

              dispatch({
                type: Types.FETCH_ALL_STORE_ADDRESS,
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
          loading: "hide"
        })
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




export const updateStoreAPos = (storeAId, storeA, store_code, $this) => {
  return (dispatch) => {

    storeAApi
      .updateStoreA(storeAId, storeA, store_code)
      .then((res) => {

        badgeApi.fetchAllBadge(store_code,getBranchId()).then((res) => {
          // dispatch({
          //   type: Types.SHOW_LOADING,
          //   loading : "hide"
          // })
          
          if(res.data.code !== 401)
          {
          dispatch({
            type: Types.FETCH_ALL_BADGE,
            data: res.data.data,
          });
          $this.loadFirst = true

        
        }
        })
   
      
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
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




export const updateStoreA = (storeAId, storeA, store_code, funcModal = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    storeAApi
      .updateStoreA(storeAId, storeA, store_code)
      .then((res) => {
        if (funcModal) {
          funcModal()
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        dispatch({

          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        badgeApi.fetchAllBadge(store_code, getBranchId()).then((res) => {

          if (res.data.code !== 401) {
            dispatch({
              type: Types.FETCH_ALL_BADGE,
              data: res.data.data,
            });


          }
        })
        if (funcModal == null)
          history.goBack();
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
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