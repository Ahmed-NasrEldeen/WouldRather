import { NavLink } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
class Nav extends Component {
  handleclick() {
    this.props.dispatch(setAuthedUser(null));
  }
  render() {
    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leader board
            </NavLink>
          </li>
          <li>
            {this.props.authedUser ? (
              <strong>
                Hello <br></br>
                {this.props.authedUser}{" "}
              </strong>
            ) : null}
          </li>

          <li style={{ display: "flex" }}>
            {this.props.authedUser ? (
              <NavLink
                to="/"
                activeClassName="active"
                onClick={this.handleclick}
                style={{ color: "green" }}
              >
                Logout
              </NavLink>
            ) : null}
          </li>
        </ul>
      </nav>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(Nav);
