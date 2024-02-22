const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  }

  // TOPIC ENDPOINTS
export const topicEndpoints = {
    GET_ALL_TOPICS_API: BASE_URL + "/topic/getAllTopics",
    GET_TOPIC_QUESTIONS_API: BASE_URL + "/topic/getTopicQuestions",
    ADD_TOPIC_API: BASE_URL + "/topic/addTopic",
    GET_QUESTIONS_API: BASE_URL + "/topic/getTopicQuestions",
    DELETE_TOPIC_API: BASE_URL + "/topic/deleteTopic"
  }

    // QUESTION ENDPOINTS
export const questionEndpoints = {
  ADD_QUESTION_API: BASE_URL + "/question/addQuestion",
  DELETE_QUESTION_API : BASE_URL + "/question/removeQuestion"
}

    // PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_ALL_DONE_API: BASE_URL + "/done/getAllDone",
  GET_DONE_TOPIC_QUESTIONS_API: BASE_URL + "/done/getDoneTopicQuestions",
  SET_QUESTION_DONE_API: BASE_URL + "/done/setDone",
  ERASE_QUESTION_DONE_API: BASE_URL + "/done/eraseDone",
  GET_DONE_QUESTIONS_API: BASE_URL + "/done/getDoneTopicQuestions"
}