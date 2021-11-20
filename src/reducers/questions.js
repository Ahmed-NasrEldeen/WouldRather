import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  SAVE_QUESTION,
} from "../actions/questions";

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.qid]: {
          ...state[action.question.qid],
          [action.question.answer]: {
            ...state[action.question.qid][action.question.answer],
            votes: state[action.question.qid][
              action.question.answer
            ].votes.concat([action.question.authedUser]),
          },
        },
      };

    default:
      return state;
  }
}
