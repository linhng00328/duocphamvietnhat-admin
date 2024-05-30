import callApi from "../../ultis/apiCaller";

export const fetchAllLesson = (store_code, page, params, courseId) => {
  // return callApi(`/store/${store_code}/posts?page=${page}`, "get", null);

  return params
    ? callApi(
        `/store/${store_code}/train_chapter_lessons/${courseId}?page=${page}${params}`,
        "get",
        null
      )
    : callApi(
        `/store/${store_code}/train_chapter_lessons/${courseId}?page=${page}`,
        "get",
        null
      );
};
export const fetchAllQuiz = (store_code, page, params, courseId) => {
  // return callApi(`/store/${store_code}/posts?page=${page}`, "get", null);

  return params
    ? callApi(
        `/store/${store_code}/train_courses/${courseId}/quiz`,
        "get",
        null
      )
    : callApi(
        `/store/${store_code}/train_courses/${courseId}/quiz`,
        "get",
        null
      );
};

export const fetchLessonId = (store_code, LessonId) => {
  return callApi(
    `/store/${store_code}/train_chapters/${LessonId}`,
    "get",
    null
  );
};

export const createLesson = (store_code, data) => {
  return callApi(`/store/${store_code}/train_lessons`, "post", data);
};
export const createChapter = (store_code, data) => {
  return callApi(`/store/${store_code}/train_chapters`, "post", data);
};

export const createQuiz = (store_code, data, courseId) => {
  return callApi(
    `/store/${store_code}/train_courses/${courseId}/quiz`,
    "post",
    data
  );
};

export const createQuestion = (store_code, data, courseId, quizId) => {
  return callApi(
    `/store/${store_code}/train_courses/${courseId}/quiz/${quizId}/questions`,
    "post",
    data
  );
};

export const updateLesson = (categoryBId, categoryB, store_code) => {
  return callApi(
    `/store/${store_code}/train_lessons/${categoryBId}`,
    "put",
    categoryB
  );
};
export const updateChapter = (categoryBId, categoryB, store_code) => {
  return callApi(
    `/store/${store_code}/train_chapters/${categoryBId}`,
    "put",
    categoryB
  );
};

export const updateQuiz = (categoryBId, categoryB, store_code, courseId) => {
  return callApi(
    `/store/${store_code}/train_courses/${courseId}/quiz/${categoryBId}`,
    "put",
    categoryB
  );
};
export const updateQuestion = (
  categoryBId,
  categoryB,
  store_code,
  courseId,
  quizId
) => {
  return callApi(
    `/store/${store_code}/train_courses/${courseId}/quiz/${quizId}/questions/${categoryBId}`,
    "put",
    categoryB
  );
};

export const destroyLesson = (store_code, storeAid) => {
  return callApi(
    `/store/${store_code}/train_lessons/${storeAid}`,
    "delete",
    null
  );
};

export const destroyChapter = (store_code, storeAid, train_course_id) => {
  return callApi(
    `/store/${store_code}/train_courses/${train_course_id}/quiz/${storeAid}`,
    "delete",
    null
  );
};

export const destroyQuiz = (store_code, storeAid, courseId) => {
  return callApi(
    `/store/${store_code}/train_courses/${courseId}/quiz/${storeAid}`,
    "delete",
    null
  );
};
export const destroyQuestion = (store_code, storeAid, courseId, quizId) => {
  return callApi(
    `/store/${store_code}/train_courses/${courseId}/quiz/${quizId}/questions/${storeAid}`,
    "delete",
    null
  );
};

export const sortChapter = (store_code, data) => {
  return callApi(`/store/${store_code}/train_chapters_sort`, "put", data);
};

export const sortLesson = (store_code, data) => {
  return callApi(`/store/${store_code}/train_lessons_sort`, "put", data);
};

export const fetchQuizId = (store_code, courseId, quizId) => {
  return callApi(
    `/store/${store_code}/train_courses/${courseId}/quiz/${quizId}`,
    "get",
    null
  );
};

export const fetchAllCourse = (store_code, page, params) => {
  return params
    ? callApi(
        `/store/${store_code}/train_courses?page=${page}${params}`,
        "get",
        null
      )
    : callApi(`/store/${store_code}/train_courses?page=${page}`, "get", null);
};
export const fetchCourseId = (store_code, courseId) => {
  return callApi(`/store/${store_code}/train_courses/${courseId}`, "get", null);
};

export const createCourse = (store_code, data) => {
  return callApi(`/store/${store_code}/train_courses`, "post", data);
};
export const updateCourse = (categoryBId, categoryB, store_code) => {
  return callApi(
    `/store/${store_code}/train_courses/${categoryBId}`,
    "put",
    categoryB
  );
};
export const destroyCourse = (store_code, storeAid) => {
  return callApi(
    `/store/${store_code}/train_courses/${storeAid}`,
    "delete",
    null
  );
};

//Lịch sử  DS khách hàng làm bài thi
export const getHistoryQuizzes = (store_code, params) => {
  return callApi(
    `/store/${store_code}/customers/quizzes/histories${
      params ? `?${params}` : ""
    }`,
    "get",
    null
  );
};

export const fetchAllCourseForFilter = (store_code) => {
  return callApi(`/store/${store_code}/train_courses_all`, "get", null);
};

//Lịch sử chi tiết của một khách hàng làm bài thi
export const getDetailHistoryQuizzesForCustomer = (
  store_code,
  customer_id,
  params
) => {
  return callApi(
    `/store/${store_code}/customers/${customer_id}/quizzes/histories${
      params ? `?${params}` : ""
    }`,
    "get",
    null
  );
};

//Lịch sử chi tiết những lần làm bài thi của khách hàng
export const getDetailQuizHistoryForCustomer = (
  store_code,
  customer_id,
  quiz_id,
  params
) => {
  return callApi(
    `/store/${store_code}/customers/${customer_id}/quizzes/${quiz_id}/histories${
      params ? `?${params}` : ""
    }`,
    "get",
    null
  );
};
