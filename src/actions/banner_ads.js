import * as Types from "../constants/ActionType";
import history from "../history";
import * as bannerAdsApi from "../data/remote/banner_ads";
import * as uploadApi from "../data/remote/upload";

export const fetchAllBannerAds = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    bannerAdsApi.fetchAllData(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_ALL_BANNER_ADS,
        data: res.data.data,
      });
    });
  };
};




export const createBannerAds = (store_code,data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    bannerAdsApi
      .createBannerAds(store_code,data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
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


export const destroyBannerAds = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    bannerAdsApi
      .destroyBannerAds(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        bannerAdsApi.fetchAllData(store_code)
          .then((res) => {
            if(res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_BANNER_ADS,
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

export const updateBannerAds = (categoryBId, categoryB, store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    bannerAdsApi
      .updateBannerAds(categoryBId, categoryB, store_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
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

export const uploadImgBannerAds = (file) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    uploadApi
      .upload(file)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        dispatch({
          type: Types.UPLOAD_BANNER_ADS_IMG,
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
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};
export const initialUpload = () => {
  return (dispatch) => {
    dispatch({
      type: Types.UPLOAD_BANNER_ADS_IMG,
      data: null
    });
  }
}