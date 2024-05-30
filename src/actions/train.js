import * as Types from "../constants/ActionType";
import history from "../history";
import * as trainApi from "../data/remote/train";
import * as uploadApi from "../data/remote/upload";

export const fetchAllCourse = (store_code, page = 1, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi.fetchAllCourse(store_code, page, params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_TRAIN_COURSE,
          data: res.data.data,
        });
    });
  };
};
export const fetchAllCourseForFilter = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi.fetchAllCourseForFilter(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_TRAIN_COURSE_FILTER,
          data: res.data.data,
        });
    });
  };
};

export const fetchQuizId = (store_code, courseId, quizId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi.fetchQuizId(store_code, courseId, quizId).then((res) => {
      if (res.data.code !== 401)
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      dispatch({
        type: Types.FETCH_ID_TRAIN_QUIZ,
        data: res.data.data,
      });
    });
  };
};
export const fetchCourseId = (store_code, CourseId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi.fetchCourseId(store_code, CourseId).then((res) => {
      if (res.data.code !== 401)
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      dispatch({
        type: Types.FETCH_ID_TRAIN_COURSE,
        data: res.data.data,
      });
    });
  };
};

export const createCourse = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .createCourse(store_code, data)
      .then((res) => {
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
        history.goBack();
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
  };
};

export const destroyCourse = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .destroyCourse(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        trainApi
          .fetchAllCourse(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_TRAIN_COURSE,
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
  };
};

export const updateCourse = (categoryBId, categoryB, store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .updateCourse(categoryBId, categoryB, store_code)
      .then((res) => {
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
        history.goBack();
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
  };
};

///////////////////Lesson
export const fetchAllQuiz = (store_code, courseId, page = 1, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi.fetchAllQuiz(store_code, page, params, courseId).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_TRAIN_QUIZ,
          data: res.data.data,
        });
    });
  };
};

export const fetchAllLesson = (store_code, courseId, page = 1, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi.fetchAllLesson(store_code, page, params, courseId).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_TRAIN_LESSON,
          data: res.data.data,
        });
    });
  };
};

export const fetchLessonId = (store_code, CourseId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi.fetchLessonId(store_code, CourseId).then((res) => {
      if (res.data.code !== 401)
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      dispatch({
        type: Types.FETCH_ID_TRAIN_LESSON,
        data: res.data.data,
      });
    });
  };
};

export const createLesson = (store_code, courseId, data, _this, resetModal) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .createLesson(store_code, data)
      .then((res) => {
        if (_this && resetModal) {
          resetModal();
          _this.setState({
            txtTitle: "",
            txtSumary: "",
            txtContent: "",
            link_video_youtube: "",
          });
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        trainApi.fetchAllLesson(store_code, 1, null, courseId).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_TRAIN_LESSON,
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
        // history.goBack();
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
  };
};

export const createQuestion = (
  store_code,
  data,
  _this,
  resetModal,
  courseId,
  quizId
) => {
  return async (dispatch) => {
    var res = null;

    if (
      typeof data.image != "undefined" &&
      data.image != "" &&
      data.image != null &&
      data.image
    ) {
      const fd = new FormData();

      fd.append(`image`, data.image);
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
    var image = res != null ? res.data.data : null;
    dispatch({ type: Types.LOADING_CREATE_QUESTION, loadType: Types.NONE });

    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    data.question_image = image;
    delete data.image;
    trainApi
      .createQuestion(store_code, data, courseId, quizId)
      .then((res) => {
        if (_this && resetModal) {
          resetModal();
          _this.setState({
            question: "",
            answer_a: "",
            answer_b: "",
            answer_c: "",
            answer_d: "",
            fileUpload: null,
            right_answer: "A",
            image: "",
            question_image: null,
          });
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        trainApi.fetchQuizId(store_code, courseId, quizId).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
          dispatch({
            type: Types.FETCH_ID_TRAIN_QUIZ,
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
        // history.goBack();
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
  };
};
export const createQuiz = (store_code, data, _this, resetModal, courseId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .createQuiz(store_code, data, courseId)
      .then((res) => {
        if (_this && resetModal) {
          resetModal();
          _this.setState({
            txtTitle: "",
            txtSumary: "",
            txtContent: "",
            txtMinute: "",
            auto_change_order_questions: false,
            auto_change_order_answer: false,
          });
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        trainApi.fetchAllQuiz(store_code, 1, null, courseId).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_TRAIN_QUIZ,
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
        // history.goBack();
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
  };
};

export const createChapter = (store_code, data, _this, resetModal) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .createChapter(store_code, data)
      .then((res) => {
        if (_this && resetModal) {
          resetModal();
          _this.setState({
            txtTitle: "",
            txtSumary: "",
          });
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        trainApi
          .fetchAllLesson(store_code, 1, null, data.train_course_id)
          .then((res) => {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_TRAIN_LESSON,
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
        // history.goBack();
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
  };
};

export const sortChapter = (store_code, data, train_course_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .sortChapter(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        trainApi
          .fetchAllLesson(store_code, 1, null, train_course_id)
          .then((res) => {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_TRAIN_LESSON,
                data: res.data.data,
              });
          });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Sắp xếp thành công ",
            disable: "show",
            content: "Sắp xếp thành công",
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
  };
};

export const sortLesson = (store_code, data, train_course_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .sortLesson(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        trainApi
          .fetchAllLesson(store_code, 1, null, train_course_id)
          .then((res) => {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_TRAIN_LESSON,
                data: res.data.data,
              });
          });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Sắp xếp thành công ",
            disable: "show",
            content: "Sắp xếp thành công",
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
  };
};

export const destroyLesson = (store_code, id, train_course_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .destroyLesson(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        trainApi
          .fetchAllLesson(store_code, 1, null, train_course_id)
          .then((res) => {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_TRAIN_LESSON,
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
  };
};

export const destroyQuestion = (
  store_code,
  id,
  train_course_id,
  quizId,
  onSuccess
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .destroyQuestion(store_code, id, train_course_id, quizId)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (onSuccess) onSuccess();

        trainApi
          .fetchQuizId(store_code, train_course_id, quizId)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.SHOW_LOADING,
                loading: "hide",
              });
            dispatch({
              type: Types.FETCH_ID_TRAIN_QUIZ,
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
  };
};
export const destroyQuiz = (store_code, id, train_course_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .destroyQuiz(store_code, id, train_course_id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        trainApi
          .fetchAllQuiz(store_code, 1, null, train_course_id)
          .then((res) => {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_TRAIN_QUIZ,
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
  };
};

export const destroyChapter = (store_code, id, train_course_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .destroyChapter(store_code, id, train_course_id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        trainApi
          .fetchAllLesson(store_code, 1, null, train_course_id)
          .then((res) => {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_TRAIN_LESSON,
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
  };
};

export const updateLesson = (
  categoryBId,
  categoryB,
  store_code,
  train_course_id,
  _this,
  resetModal
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .updateLesson(categoryBId, categoryB, store_code)
      .then((res) => {
        if (resetModal) {
          resetModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        trainApi
          .fetchAllLesson(store_code, 1, null, train_course_id)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_TRAIN_LESSON,
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
  };
};

export const updateChapter = (id, data, store_code, _this, resetModal) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .updateChapter(id, data, store_code)
      .then((res) => {
        if (resetModal) {
          resetModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        trainApi
          .fetchAllLesson(store_code, 1, null, data.train_course_id)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_TRAIN_LESSON,
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
  };
};

export const updateQuestion = (
  id,
  data,
  store_code,
  _this,
  resetModal,
  courseId,
  quizId
) => {
  return async (dispatch) => {
    var res = null;

    if (
      typeof data.image != "undefined" &&
      data.image != "" &&
      data.image != null &&
      data.image
    ) {
      const fd = new FormData();

      fd.append(`image`, data.image);
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
    var image = res != null ? res.data.data : null;

    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    data.question_image = image;
    delete data.image;
    trainApi
      .updateQuestion(id, data, store_code, courseId, quizId)
      .then((res) => {
        if (resetModal) {
          resetModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        trainApi.fetchQuizId(store_code, courseId, quizId).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
          dispatch({
            type: Types.FETCH_ID_TRAIN_QUIZ,
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
        // history.goBack();
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
  };
};
export const updateQuiz = (
  id,
  data,
  store_code,
  _this,
  resetModal,
  courseId
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .updateQuiz(id, data, store_code, courseId)
      .then((res) => {
        if (resetModal) {
          resetModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        trainApi.fetchAllQuiz(store_code, 1, null, courseId).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_TRAIN_QUIZ,
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
  };
};

//Lịch sử thi của KH
export const getHistoryQuizzes = (store_code, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .getHistoryQuizzes(store_code, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_HISTORY_CUSTOMER_TRAIN_QUIZ,
            data: res.data.data,
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
  };
};

export const getDetailHistoryQuizzesForCustomer = (
  store_code,
  customer_id,
  params
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .getDetailHistoryQuizzesForCustomer(store_code, customer_id, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_DETAIL_HISTORY_CUSTOMER_TRAIN_QUIZ,
            data: res.data.data,
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
  };
};

export const getDetailQuizHistoryForCustomer = (
  store_code,
  customer_id,
  quiz_id,
  params
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    trainApi
      .getDetailQuizHistoryForCustomer(store_code, customer_id, quiz_id, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_HISTORY_CUSTOMER_TRY_TRAIN_QUIZ,
            data: res.data.data,
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
  };
};
