import * as Types from "../constants/ActionType";
import * as rewardPointApi from "../data/remote/reward_point";


export const fetchRewardPoint = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    rewardPointApi.fetchRewardPoint(store_code).then((res) => {
   

      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide"
      })     
       if(res.data.code === 200)
      dispatch({
        type: Types.FETCH_REWARD_POINT,
        data: res.data.data,
      });
    });
  };
};


export const updateRewardPoint = (store_code ,data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    rewardPointApi
      .updateRewardPoint(store_code ,data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        rewardPointApi.fetchRewardPoint(store_code).then((res) => {
          console.log(res)
    
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide"
          })     
           if(res.data.code !== 401)
          dispatch({
            type: Types.FETCH_REWARD_POINT,
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

export const resetRewardPoint = (store_code) => {
  return (dispatch) => {

  
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    rewardPointApi
      .resetRewardPoint(store_code)
      .then((res) => {

     

        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        rewardPointApi.fetchRewardPoint(store_code).then((res) => {
    
       
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide"
          })     
           if(res.data.code === 200)
          dispatch({
            type: Types.FETCH_REWARD_POINT,
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

