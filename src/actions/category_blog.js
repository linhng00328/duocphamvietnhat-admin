import * as Types from "../constants/ActionType";
import history from "../history";
import * as categoryBApi from "../data/remote/category_blog";
import * as uploadApi from "../data/remote/upload";

export const fetchAllCategoryB = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    categoryBApi.fetchAllData(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_ALL_CATEGORY_BLOG,
        data: res.data.data,
      });
    });
  };
};




export const createCategoryB = (store_code,data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    categoryBApi
      .createCategoryB(store_code,data)
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


export const destroyCategoryB = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    categoryBApi
      .destroyCategoryB(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        categoryBApi.fetchAllData(store_code)
          .then((res) => {
            if(res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_CATEGORY_BLOG,
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

export const updateCategoryB = (categoryBId, categoryB, store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    categoryBApi
      .updateCategoryB(categoryBId, categoryB, store_code)
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

export const uploadImgCategoryB = (file,store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    uploadApi
      .upload(file,store_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        dispatch({
          type: Types.UPLOAD_CATEGORY_BLOG_IMG,
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
      type: Types.UPLOAD_CATEGORY_BLOG_IMG,
      data: null
    });
  }
}

export const createCategoryChild = (store_code,id,data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    categoryBApi
      .createCategoryChildB(store_code,id,data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        categoryBApi.fetchAllData(store_code).then((res) => {
          if(res.data.code === 200)

          dispatch({
            type: Types.FETCH_ALL_CATEGORY_BLOG,
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
          loading : "hide"
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

export const updateCategoryChild = (store_code,id,idChild,data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    categoryBApi
      .updateCategoryChildB(store_code,id,idChild,data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        categoryBApi.fetchAllData(store_code).then((res) => {
          if(res.data.code !== 401)
          {
          dispatch({
            type: Types.FETCH_ALL_CATEGORY_BLOG,
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

export const destroyCategoryChild = (store_code , id,idChild) => {

  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    categoryBApi
      .destroyCategoryChildB(store_code, id, idChild)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        categoryBApi
          .fetchAllData(store_code)
          .then((res) => {
            if(res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_CATEGORY_BLOG,
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