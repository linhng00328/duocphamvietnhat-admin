import * as Types from "../constants/ActionType";
import * as gamificationApi from "../data/remote/gamification";
import history from "../history";

//Game vòng quay
export const fetchListGameSpinWheels = (store_code, params) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .fetchListGameSpinWheels(store_code, params)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.LIST_GAME_SPIN_WHEELS,
            data: res.data.data,
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
      });
  };
};

export const fetchGameSpinWheelsById = (store_code, idGame) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .fetchGameSpinWheelsById(store_code, idGame)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.GAME_SPIN_WHEELS,
            data: res.data.data,
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
      });
  };
};

export const addGameSpinWheels = (store_code, form) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .addGameSpinWheels(store_code, form)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.ADD_GAME_SPIN_WHEELS,
            data: res.data.data,
          });
          history.push(`/game_spin_wheels/${store_code}`);
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
      });
  };
};

export const updateGameSpinWheels = (store_code, idGame, form, page) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .updateGameSpinWheels(store_code, idGame, form)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.UPDATE_GAME_SPIN_WHEELS,
            data: res.data.data,
          });
          gamificationApi
            .fetchListGameSpinWheels(store_code, `page=${page}`)
            .then((res) => {
              if (res.data.code === 200) {
                dispatch({
                  type: Types.LIST_GAME_SPIN_WHEELS,
                  data: res.data.data,
                });
                history.push(`/game_spin_wheels/${store_code}?page=${page}`);
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
      });
  };
};

export const deleteGameSpinWheels = (store_code, id) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .deleteGameSpinWheels(store_code, id)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.DELETE_GAME_SPIN_WHEELS,
            data: res.data.success,
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

export const fetchListGiftGameSpinWheels = (store_code, idGame) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .fetchListGiftGameSpinWheels(store_code, idGame)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.LIST_GIFT_GAME_SPIN_WHEELS,
            data: res.data.data,
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
      });
  };
};
export const addGiftGameSpinWheels = (store_code, idGame, data) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .addGiftGameSpinWheels(store_code, idGame, data)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.ADD_GIFT_GAME_SPIN_WHEELS,
            data: res.data.data,
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
      });
  };
};
export const saveGiftGameSpinWheel = (store_code, idGame, data) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .addGiftGameSpinWheels(store_code, idGame, data)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.SAVE_GIFT_GAME_SPIN_WHEELS,
            data: res.data.data,
          });
          dispatch({
            type: Types.SAVE_GIFT_GAME_SPIN_WHEELS_MESSAGE,
            data: true,
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
      });
  };
};
export const updateGiftGameSpinWheels = (store_code, idGame, idGift, data) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .updateGiftGameSpinWheels(store_code, idGame, idGift, data)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.UPDATE_GIFT_GAME_SPIN_WHEELS,
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

export const deleteGiftGameSpinWheels = (store_code, idGame, idGift) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .deleteGiftGameSpinWheels(store_code, idGame, idGift)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.DELETE_GIFT_GAME_SPIN_WHEELS,
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

//Game đoán số
export const fetchListGameGuessNumbers = (store_code, params) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .fetchListGameGuessNumbers(store_code, params)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.LIST_GAME_GUESS_NUMBERS,
            data: res.data.data,
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
      });
  };
};

export const fetchGameGuessNumbersById = (store_code, idGame) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .fetchGameGuessNumbersById(store_code, idGame)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.GAME_GUESS_NUMBERS,
            data: res.data.data,
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
      });
  };
};

export const addGameGuessNumbers = (store_code, form) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .addGameGuessNumbers(store_code, form)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.ADD_GAME_GUESS_NUMBERS,
            data: res.data.data,
          });
          history.push(`/game_guess_numbers/${store_code}`);
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
      });
  };
};

export const updateGameGuessNumbers = (store_code, idGame, form, page) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .updateGameGuessNumbers(store_code, idGame, form)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.UPDATE_GAME_GUESS_NUMBERS,
            data: res.data.data,
          });
          gamificationApi
            .fetchListGameSpinWheels(store_code, `page=${page}`)
            .then((res) => {
              if (res.data.code === 200) {
                dispatch({
                  type: Types.LIST_GAME_SPIN_WHEELS,
                  data: res.data.data,
                });
                history.push(`/game_guess_numbers/${store_code}?page=${page}`);
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
      });
  };
};

export const deleteGameGuessNumbers = (store_code, id) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .deleteGameGuessNumbers(store_code, id)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.DELETE_GAME_GUESS_NUMBERS,
            data: res.data.success,
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
