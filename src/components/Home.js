import React, { Component, useReducer } from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Home.css";
import Question from "./Question";

class Home extends Component {
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>Answered Questions</Tab>
          <Tab>Unanswered Questions</Tab>
        </TabList>

        <TabPanel>
          <ul className="dashboard-list">
            {this.props.answeredQuestions.map((id) => (
              <li key={id}>
                <Question id={id} isPoll={true} />
              </li>
            ))}
          </ul>
        </TabPanel>
        <TabPanel>
          <ul className="dashboard-list">
            {this.props.unansweredQuestions.map((id) => (
              <li key={id}>
                <Question id={id} isPoll={true} />
              </li>
            ))}
          </ul>
        </TabPanel>
      </Tabs>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  let allQuestions = [];
  for (var question in questions) allQuestions.push(question);

  let answered = users[authedUser].answers;
  let answeredQuestions = [];
  for (var questionId in answered) {
    answeredQuestions.push(questionId);
  }
  let unansweredQuestions = allQuestions.filter(
    (x) => !answeredQuestions.includes(x)
  );

  return {
    questions: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    answeredQuestions,
    unansweredQuestions,
  };
}

export default connect(mapStateToProps)(Home);
