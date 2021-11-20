import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";
import { setAnswerUser, setQuestionUser } from "./users";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_ANSWER = "SAVE_ANSWER";
export const TOGGLE_TWEET = "TOGGLE_TWEET";
export const ADD_TWEET = "ADD_TWEET";
export const ADD_QUESTION = "ADD_QUESTION";
export const SAVE_QUESTION = "SAVE_QUESTION";

function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet,
  };
}
function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}
function addNewQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    console.log("=>>>>>>", optionTwoText, optionTwoText, author);
    return saveQuestion({ optionOneText, optionTwoText, author })
      .then((question) => {
        dispatch(addNewQuestion(question));
        dispatch(setQuestionUser(question));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function handleQuestionAnswer(authedUser, qid, answer) {
  return (dispatch, getState) => {
    console.log("inaction", authedUser, qid, answer);
    dispatch(showLoading());

    return saveQuestionAnswer(authedUser, qid, answer)
      .then(() => {
        dispatch(addQuestion(authedUser, qid, answer));
      })
      .then(() => {
        dispatch(setAnswerUser(authedUser, qid, answer));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
