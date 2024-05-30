import * as Types from "../constants/ActionType";
import history from "../history";
import * as revenueExpendituresApi from "../data/remote/revenue_expenditures";
import * as storeApi from "../data/remote/store";
import * as customerApi from "../data/remote/customer";

import moment from "moment";
export const fetchAllRevenueExpenditures = (
  store_code,
  branch_id,
  page = 1,
  params = null
) => {
  console.log("asda")
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    // dispatch({
    //   type: Types.SHOW_LOADING_LAZY,
    //   loading: "show",
    // });
    revenueExpendituresApi
      .fetchAllRevenueExpenditures(store_code, branch_id, page, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        // dispatch({
        //   type: Types.SHOW_LOADING_LAZY,
        //   loading: "hide",
        // });
        if (res.data.code !== 401)
        {
          dispatch({
            type: Types.FETCH_ALL_REVENUE_EXPENDITURES,
            data: res.data.data,
          });
          dispatch({
            type: Types.RESET_STATUS_LOADING,
            data: true,
          });
        }
      
      });
  };
};
export const fetchAllSupplier = (store_code, page, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi.fetchAllSupplier(store_code, page, params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_SUPPLIER,
          data: res.data.data,
        });
    });
  };
};
export const fetchRevenueExpendituresById = (
  store_code,
  branch_id,
  revenue_expenditure_id
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    revenueExpendituresApi
      .fetchRevenueExpendituresById(
        store_code,
        branch_id,
        revenue_expenditure_id
      )
      .then((res) => {
        if (res.data.code !== 401)
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
        dispatch({
          type: Types.FETCH_REVENUE_EXPENDITURES_BY_ID,
          data: res.data.data,
        });
      });
  };
};
export const fetchReportExpenditure = (store_code, branch_id, page, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .fetchReportExpenditure(store_code, branch_id, page, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_REPORT_EXPENDITURE,
            data: res.data.data,
          });
      });
  };
};
export const createRevenueExpenditures = (
  store_code,
  branch_id,
  data,
  params,
  funcModal,
  getForCustomer,
  _this
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    revenueExpendituresApi
      .createRevenueExpenditures(store_code, branch_id, data)
      .then((res) => {
        if (res.data.success && funcModal) {
          funcModal()
        }
        if(_this)
        {
          _this.setState({
            payment_method: null,
            change_money: 0,
            type: null,
            recipient_group: null,
            recipient_references_id: null,
      
            allow_accounting: true,
            description: "",
          })
        }
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


        if (getForCustomer) {
          if(getForCustomer == "CUSTOMER")
          customerApi.fetchCustomerId(store_code, data.recipient_references_id).then((res) => {
        
              dispatch({
                type: Types.FETCH_ID_CUSTOMER,
                data: res.data.data,
              });
          });
          if(getForCustomer == "SUPPLIER")
          {
            storeApi.fetchSupplierId(store_code, data.recipient_references_id).then((res) => {
      
                dispatch({
                  type: Types.FETCH_ID_SUPPLIER,
                  data: res.data.data,
                });
            });
          }
          
          revenueExpendituresApi
            .fetchAllRevenueExpenditures(store_code, branch_id, 1, params)
            .then((res) => {
              dispatch({
                type: Types.SHOW_LOADING,
                loading: "hide",
              });
              // dispatch({
              //   type: Types.SHOW_LOADING_LAZY,
              //   loading: "hide",
              // });
              if (res.data.code !== 401)
                dispatch({
                  type: Types.FETCH_ALL_REVENUE_EXPENDITURES,
                  data: res.data.data,
                });
            });
        }
        else {
          storeApi
            .fetchReportExpenditure(store_code, branch_id, 1, params)
            .then((res) => {
              if (res.data.code === 200)
                dispatch({
                  type: Types.FETCH_REPORT_EXPENDITURE,
                  data: res.data.data,
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
    // .then((res) => {
    //   dispatch({
    //     type: Types.SHOW_LOADING,
    //     loading: "hide",
    //   });
    // dispatch({
    //   type: Types.ALERT_UID_STATUS,
    //   alert: {
    //     type: "success",
    //     title: "Thành công ",
    //     disable: "show",
    //     content: res.data.msg,
    //   },
    // });

    // })
    // .catch(function (error) {
    //   dispatch({
    //     type: Types.SHOW_LOADING,
    //     loading: "hide",
    //   });
    //   dispatch({
    //     type: Types.ALERT_UID_STATUS,
    //     alert: {
    //       type: "danger",
    //       title: "Lỗi",
    //       disable: "show",
    //       content: error?.response?.data?.msg,
    //     },
    //   });
    // });
  };
};
