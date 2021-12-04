import React, { Component, Fragment } from "react";
import { Switch } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import Login from "./Login";
import Nav from "./Nav";
import Question from "./Question";
import Home from "./Home";
import NewQuestion from "./NewQuestion";
import Leadboard from "./Leadboard";
import NotFound from "./NotFound";
class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true ? (
              <div>
                <Login></Login>
              </div>
            ) : (
              <div>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/questions/:id" component={Question} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/leaderboard" component={Leadboard} />
                  <Route path="/404" component={NotFound} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
