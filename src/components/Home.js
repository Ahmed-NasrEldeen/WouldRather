import React, { Component } from "react";
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
          <Tab>Unanswered Questions</Tab>
          <Tab>Answered Questions</Tab>
        </TabList>

        <TabPanel>
          <ul className="dashboard-list">
            {this.props.unansweredQuestions.map((question) => (
              <li key={question.id}>
                <Question id={question.id} isPoll={true} />
              </li>
            ))}
          </ul>
        </TabPanel>
        <TabPanel>
          <ul className="dashboard-list">
            {this.props.answeredQuestions.map((question) => (
              <li key={question.id}>
                <Question id={question.id} isPoll={true} />
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
  let answeredQuestionsIds = [];
  for (var questionId in answered) {
    answeredQuestionsIds.push(questionId);
  }
  let unansweredQuestionsIds = allQuestions.filter(
    (x) => !answeredQuestionsIds.includes(x)
  );
  const answeredQuestions = [];
  const unansweredQuestions = [];
  answeredQuestionsIds.forEach((id) => {
    answeredQuestions.push(questions[id]);
  });
  unansweredQuestionsIds.forEach((id) => {
    unansweredQuestions.push(questions[id]);
  });
  function custom_sort(a, b) {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  }
  answeredQuestions.sort(custom_sort);
  unansweredQuestions.sort(custom_sort);

  return {
    questions: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    answeredQuestions,
    unansweredQuestions,
  };
}

export default connect(mapStateToProps)(Home);
