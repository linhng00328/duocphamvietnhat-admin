import * as Types from "../constants/ActionType";
import * as customerApi from "../data/remote/customer";
import * as chatApi from "../data/remote/chat";
import moment from "moment";

export const fetchAllChat = (store_code, page = 1) => {
  return (dispatch) => {

    chatApi.fetchAllChat(store_code, page).then((res) => {

      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_CHAT,
          data: res.data.data,
        });
    });
  };
};

export const fetchCustomerId = (store_code, customerId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    customerApi.fetchCustomerId(store_code, customerId).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ID_CUSTOMER,
          data: res.data.data,
        });
    });
  };
};

export const fetchChatId = (store_code, customerId, pag = 1) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    chatApi.fetchChatId(store_code, customerId, pag).then((res) => {

      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide"
      })

      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ID_CHAT,
          data: res.data.data,
        });
      chatApi.fetchAllChat(store_code, 1).then((res) => {

        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_CHAT,
            data: res.data.data,
          });
      });
    }).catch(function (errors) {
      console.log(errors)
    });
  };
};


export const sendMessage = (store_code, customerId, message) => {
  console.log(store_code, customerId, message)
  return (dispatch) => {
    chatApi
      .postMessage(store_code, customerId, { content: message })
      .then((res) => {
        console.log(res)
        if (res.data.code !== 401) {
          if (res.data.code == 400) {
            dispatch({
              type: Types.ALERT_UID_STATUS,
              alert: {
                type: "danger",
                title: "Lỗi",
                disable: "show",
                content: res.data.msg,
              },
            });
          }
          else {
            chatApi.fetchAllChat(store_code, 1).then((res) => {

              if (res.data.code !== 401)
                dispatch({
                  type: Types.FETCH_ALL_CHAT,
                  data: res.data.data,
                });
            });
            dispatch({
              type: Types.FETCH_ID_CHAT_USER,
              data: {
                customer_id: customerId,
                content: message,
                link_images: null,
                is_user: true,
                created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
              },
            });
          }
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        dispatch({
          type: Types.FETCH_ID_CHAT_USER,
          data: {

          },
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

export const fetchAllCustomer = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    customerApi.fetchAllCustomer(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_CUSTOMER,
          data: res.data.data,
        });
    });
  };
};




