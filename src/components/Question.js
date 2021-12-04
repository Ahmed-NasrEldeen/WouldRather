import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { Redirect } from "react-router-dom";

import { handleQuestionAnswer } from "../actions/questions";
import { Link, withRouter } from "react-router-dom";
import "./Question.css";

class Question extends Component {
  handleanswer = (e, question) => {
    e.preventDefault();

    const { dispatch, authedUser } = this.props;
    dispatch(
      handleQuestionAnswer({
        authedUser,
        qid: question.id,
        answer: "optionOne",
      })
    );
  };

  render() {
    let { question } = this.props;
    const { users } = this.props;
    const { isPoll } = this.props;
    let { answered } = this.props;
    const { authedUser } = this.props;

    if (!question) {
      question = this.props.questions[this.props.match.params.id];
      if (question && users[authedUser].answers[question.id]) {
        answered = true;
      }
    }

    if (!question) {
      return (
        <div>
          <p>This question doesn't exist</p>
          <Redirect to="/404" />
        </div>
      );
    }
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;

    return (
      <div>
        <div
          style={{
            padding: "10px",
            width: "100%",
            maxwidth: "590px",
            display: "flex",
            margin: "0 auto",
            border: "1px solid #dad7d7",
            cursor: "pointer",
            borderRadius: "3px",
            maxWidth: "590px",
            textAlign: "center",
            backgroundColor: "#E5E4E2",
          }}
        >
          <img
            src={users[question.author].avatarURL}
            alt={`Avatar of ${question.author}`}
            style={{
              width: "10%",
              borderRadius: "50%",
            }}
          />
          <h3 style={{ paddingLeft: "20px" }}>{question.author + " asks"} </h3>
        </div>
        <div
          style={{
            width: "100%",
            maxwidth: "590px",
            padding: "10px",
            margin: "0 auto",
            border: "1px solid #dad7d7",
            cursor: "pointer",
            borderRadius: "3px",
            maxWidth: "590px",
            textAlign: "center",
          }}
        >
          <div>
            <h2>Would You Rather ...</h2>

            {/* {poll ? "viewpoll" : answered ? "result" : "answer"} */}
            {isPoll ? (
              <div>
                <p>
                  {question.optionOne.text}
                  <br
                    style={{
                      color: "green",
                    }}
                  />{" "}
                  OR
                  <br />
                  {question.optionTwo.text}
                </p>
                <Link to={`/questions/${question.id}`} className="">
                  <button> View Poll</button>
                </Link>
              </div>
            ) : answered ? (
              <div>
                <h3>
                  {question.optionOne.text +
                    `${
                      question.optionOne.votes.includes(authedUser)
                        ? "your vote"
                        : ""
                    }`}
                </h3>
                <p>{(optionOneVotes / totalVotes) * 100 + "%"}</p>
                <progress
                  id="file"
                  value={`${(optionOneVotes / totalVotes) * 100}`}
                  max="100"
                  style={{
                    height: "50px",
                    width: "50%",
                    backgroundColor: "green",
                  }}
                ></progress>
                <p>{optionOneVotes + " out of " + totalVotes}</p>
                <h3>
                  {question.optionTwo.text +
                    `${
                      question.optionTwo.votes.includes(authedUser)
                        ? " (your vote) "
                        : ""
                    }`}
                </h3>
                <p>{(optionTwoVotes / totalVotes) * 100 + "%"}</p>
                <progress
                  id="file"
                  value={`${(optionTwoVotes / totalVotes) * 100}`}
                  max="100"
                  style={{
                    height: "50px",
                    width: "50%",
                    backgroundColor: "green",
                  }}
                ></progress>
                <p>{optionTwoVotes + " out of " + totalVotes}</p>
              </div>
            ) : (
              <div>
                <label class="chcontainer">
                  {question.optionOne.text}
                  <input type="radio" checked="checked" name="radio" />
                  <span class="checkmark"></span>
                </label>
                <label class="chcontainer">
                  {question.optionTwo.text}
                  <input type="radio" name="radio" />
                  <span class="checkmark"></span>
                </label>
                <button onClick={(e) => this.handleanswer(e, question)}>
                  submit
                </button>
              </div>
            )}
          </div>
          <div>{formatDate(question.timestamp)}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  return {
    authedUser,
    question,
    users,
    questions: question ? null : questions,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
