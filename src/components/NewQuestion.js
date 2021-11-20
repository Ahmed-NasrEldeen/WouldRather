import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";
import { Link, withRouter } from "react-router-dom";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false,
  };
  handleChange1 = (e) => {
    const optionOne = e.target.value;

    this.setState(() => ({
      optionOne,
    }));
  };
  handleChange2 = (e) => {
    const optionTwo = e.target.value;

    this.setState(() => ({
      optionTwo,
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOne } = this.state;
    const { optionTwo } = this.state;
    const { authedUser } = this.props;
    const { dispatch, id } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo, authedUser));

    this.setState(() => ({
      optionOne: "",
      optionOne: "",
      toHome: id ? false : true,
    }));
  };
  render() {
    const { optionOne, optionTwo, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h3 className="center">Would You Rather</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Option One"
            value={optionOne}
            onChange={this.handleChange1}
            className="textarea"
            maxLength={280}
          />
          <h4>OR</h4>
          <textarea
            placeholder="Option One"
            value={optionTwo}
            onChange={this.handleChange2}
            className="textarea"
            maxLength={280}
          />

          <button type="submit" disabled={optionOne === ""}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
function mapStateToProps({ authedUser }, { id }) {
  return {
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(NewQuestion));
