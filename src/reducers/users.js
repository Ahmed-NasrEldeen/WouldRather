import {
  RECEIVE_USERS,
  SET_ANSWERED_USER,
  SET_QUESTION_USER,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SET_QUESTION_USER:
      return {
        ...state,
        ...action.question,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([
            action.question.id,
          ]),
        },
      };
    case SET_ANSWERED_USER:
      return {
        ...state,
        [action.user.authedUser]: {
          ...state[action.user.authedUser],
          answers: {
            ...state[action.user.authedUser].answers,
            [action.user.qid]: action.user.answer,
          },
        },
      };
    default:
      return state;
  }
}
