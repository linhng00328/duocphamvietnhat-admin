import * as Types from "../constants/ActionType";
import history from "../history";
import * as blogApi from "../data/remote/blog";
import * as uploadApi from "../data/remote/upload";

export const fetchAllBlog = (store_code , page=1 , params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    blogApi.fetchAllBlog(store_code , page,params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
        if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_ALL_BLOG,
        data: res.data.data,
      });
    });
  };
};

export const fetchBlogId = (store_code , blogId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    blogApi.fetchBlogId(store_code , blogId).then((res) => {
      if(res.data.code !== 401)
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      dispatch({
        type: Types.FETCH_ID_BLOG,
        data: res.data.data,
      });
    });
  };
};



export const createBlog = (store_code,data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    blogApi
      .createBlog(store_code,data)
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


export const destroyBlog = (store_code, id) => {
  
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    blogApi
      .destroyBlog(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        blogApi.fetchAllBlog(store_code)
          .then((res) => {
            if(res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_BLOG,
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

export const updateBlog = (categoryBId, categoryB, store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    blogApi
      .updateBlog(categoryBId, categoryB, store_code)
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

export const uploadImgBlog = (file) => {
  
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
          type: Types.UPLOAD_BLOG_IMG,
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
      type: Types.UPLOAD_BLOG_IMG,
      data: null
    });
  }
}