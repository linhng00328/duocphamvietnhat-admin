import axios from "axios";
import { store } from "../index";
import * as Types from "../constants/ActionType";
import * as userLocalApi from "../data/local/user";
import history from "../history";
import * as helpers from "../ultis/helpers";
const exceptPrefix = ["/login", "/register", "/otp", "/forgot"];
var flagNumberOrder = 1;
export const fetchNewNumberOrder = () => {
  flagNumberOrder = helpers.randomString(10);
};
export const getNumberOrder = () => {
  return flagNumberOrder;
};
function checkEndPoint(endpoint) {
  for (const prefix of exceptPrefix) {
    if (
      endpoint.includes(prefix) == true &&
      endpoint.includes("/otp_units") == false &&
      endpoint.includes("/otp_configs") == false
    ) {
      return true;
    }
  }
  return false;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (endpoint, method, body) {
  if (checkEndPoint(endpoint) == false) {
    axios.interceptors.request.use(
      (config) => {
        config.headers.token = userLocalApi.getToken();
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      function (response) {
        if (
          typeof response.data.code !== "undefined" &&
          response.data.code === 404
        ) {
          // history.push("/notfound");
        } else if (response.data.code === 401) {
          history.push("/login");
        } else {
          store.dispatch({
            type: Types.AUTHENTICATION_LOGIN,
            auth: true,
          });
        }

        return response;
      },
      function (error) {
        try {
          if (error.response.data.code == 404) {
            store.dispatch({
              type: Types.ERROR_RESPONSE,
              alert: {
                type: "danger",
                title: "Lỗi ",
                disable: "show",
                content: "Đã xảy ra lỗi, vui lòng kiểm tra lại",
              },
            });
          }
          if (error.response.data.code == 401) {
            history.push("/login");
          }
          store.dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
        } catch (error) {
          store.dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
        }

        return Promise.reject(error);
      }
    );
  }

  return axios({
    method: method,
    url: `${helpers.callUrl()}${endpoint}`,
    data: body,
    cancelToken: axios.CancelToken.source().token,
  });
}
