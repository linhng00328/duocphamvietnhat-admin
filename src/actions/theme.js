import * as Types from "../constants/ActionType";
import history from "../history";
import * as themeApi from "../data/remote/theme";
import * as uploadApi from "../data/remote/upload";
import * as Env from "../ultis/default";
import * as blogApi from "../data/remote/blog";
export const fetchTheme = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    themeApi.fetchTheme(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_THEME,
          data: res.data.data,
        });
    });
  };
};
export const uploadImgTheme_Logo = (file) => {
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
          type: Types.UPLOAD_THEME_IMG_LOGO,
          data: res.data.data,
        });
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      });
  };
};

export const uploadImgTheme_Face = (file) => {
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
          type: Types.UPLOAD_THEME_IMG_FACE,
          data: res.data.data,
        });
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      });
  };
};

export const uploadImgTheme_Favicon = (file) => {
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
          type: Types.UPLOAD_THEME_IMG_FAVICON,
          data: res.data.data,
        });
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      });
  };
};

export const fetchBlogId = (store_code, blog) => {
  console.log(blog);
  return (dispatch) => {
    blogApi.fetchBlogId(store_code, blog.id).then((res) => {
      if (res.data.code !== 401)
        dispatch({
          type: blog.type,
          data: res.data.data,
        });
    });
  };
};

export const updateTheme = (store_code, theme) => {
  console.log(theme);
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    themeApi
      .updateTheme(store_code, theme)
      .then((res) => {
        console.log(res);
        themeApi.fetchTheme(store_code).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_THEME,
              data: res.data.data,
            });
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

function loadBanner(dispatch, store_code, data) {
  console.log(data);
  themeApi
    .updateTheme(store_code, data)
    .then((res) => {
      console.log(res);
      themeApi.fetchTheme(store_code).then((res) => {
        console.log(res);
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_THEME,
            data: res.data.data,
          });
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

export const createBanner = function (store_code, data, banner, form) {
  return async (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    var res = null;

    if (typeof data.file != "undefined" && data.file != "") {
      const fd = new FormData();

      fd.append(`image`, data.file);
      fd.append("image_type", "HOME");
      try {
        res = await uploadApi.upload(fd);
      } catch (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      }
      if (res.data.code == 400) {
      }
    }
    var img = res != null ? res.data.data : null;
    var _banner = [...banner];
    _banner.push({ image_url: img, title: data.title, link_to: data.link_to });
    var _form = { ...form };
    _form.carousel_app_images = _banner;
    loadBanner(dispatch, store_code, _form);

    dispatch({
      type: Types.SHOW_LOADING,
      loading: "hide",
    });
  };
};

export const destroyBanner = function (store_code, data, banners, form) {
  return (dispatch) => {
    var _form = { ...form };

    var _banners = [...banners];
    banners.forEach((banner, index) => {
      if (index == data) {
        _banners.splice(index, 1);
      }
    });

    _form.carousel_app_images = _banners;

    loadBanner(dispatch, store_code, _form);
  };
};

export const updateBanner = function (store_code, data, banner, form) {
  console.log(banner);
  return async (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    var res = null;

    if (typeof data.file != "undefined" && data.file != "") {
      console.log("da vao");
      const fd = new FormData();

      fd.append(`image`, data.file);
      fd.append("image_type", "HOME");
      try {
        res = await uploadApi.upload(fd);
      } catch (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      }
      if (res.data.code == 400) {
      }
    }
    var img = "";
    if (res == null) {
      img =
        data.image == Env.IMG_NOT_FOUND || data.image == "" ? null : data.image;
    } else {
      img = res.data.data;
    }
    var _banner = [...banner];
    _banner[data.id] = {
      image_url: img,
      title: data.title,
      link_to: data.link_to,
    };
    var _form = { ...form };
    _form.carousel_app_images = _banner;
    loadBanner(dispatch, store_code, _form);
    console.log("aaaaaaa");
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "hide",
    });
  };
};
