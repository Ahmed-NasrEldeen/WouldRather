import React, { Component } from "react";
import "./Login.css";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";

class Login extends Component {
  hanleSelectValue(id) {
    console.log(id);
    this.props.dispatch(handleInitialData(id));
  }
  render() {
    return (
      <div
        style={{
          maxWidth: "600px",
          alignContent: "right",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h2>Login Form</h2>

        <div>
          <img
            src="https://www.seekpng.com/png/detail/138-1388103_user-login-icon-login.png"
            alt="Avatar"
          />
        </div>

        <div className="container">
          <div className="dropdown">
            <button className="dropbtn">Sign In</button>

            <div className="dropdown-content">
              <a
                href="#"
                value="sarahedo"
                onClick={(e) => this.hanleSelectValue("sarahedo")}
              >
                <img src="https://tylermcginnis.com/would-you-rather/sarah.jpg" />{" "}
                sarah edo
              </a>

              <a
                href="#"
                value="tylermcginnis"
                onClick={(e) => this.hanleSelectValue("tylermcginnis")}
              >
                <img src="https://tylermcginnis.com/would-you-rather/tyler.jpg" />{" "}
                Tyler McGinnis
              </a>
              <a
                href="#"
                value="johndoe"
                onClick={(e) => this.hanleSelectValue("johndoe")}
              >
                <img src="https://tylermcginnis.com/would-you-rather/dan.jpg" />{" "}
                John Doe
              </a>
            </div>
          </div>
          <label></label>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}
export default connect(mapStateToProps)(Login);
