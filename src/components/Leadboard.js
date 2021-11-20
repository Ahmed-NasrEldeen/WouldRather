import React, { Component, useReducer } from "react";
import { connect } from "react-redux";

class leaderboard extends Component {
  render() {
    const { sortedUsers } = this.props;
    return (
      <div>
        <h1> leaderboard</h1>
        {sortedUsers.map((user) => {
          return (
            <div style={{ paddingBottom: "20px" }}>
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
                  src={user.avatarURL}
                  alt={`Avatar of ${user.id}`}
                  style={{
                    width: "10%",
                    borderRadius: "50%",
                  }}
                />
                <h3 style={{ paddingLeft: "20px" }}>{user.name} </h3>
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
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <div>
                  <h3>
                    Answered Questions : {Object.keys(user.answers).length}
                  </h3>
                  <h3>Asked Questions : {user.questions.length}</h3>
                </div>
                <div
                  style={{
                    paddingLeft: "50px",
                    textAlign: "center",
                    color: "yellowgreen",
                  }}
                >
                  {" "}
                  <strong
                    style={{
                      fontSize: "25px",
                    }}
                  >
                    score <br />
                    {user.score}
                  </strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  Object.keys(users).forEach((userId) => {
    users[userId].score =
      users[userId].questions.length +
      Object.keys(users[userId].answers).length;
  });
  const unsortedUsers = Object.values(users);
  const sortedUsers = unsortedUsers.sort((a, b) => {
    return b.score - a.score;
  });

  return {
    users,
    authedUser,
    questions,
    sortedUsers,
  };
}

export default connect(mapStateToProps)(leaderboard);
