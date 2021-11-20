export const RECEIVE_USERS = "RECEIVE_USERS";
export const SET_ANSWERED_USER = "SET_ANSWERED_USER";
export const SET_QUESTION_USER = "SET_QUESTION_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}
export function setAnswerUser(user) {
  return {
    type: SET_ANSWERED_USER,
    user,
  };
}
export function setQuestionUser(question) {
  return {
    type: SET_QUESTION_USER,
    question,
  };
}
