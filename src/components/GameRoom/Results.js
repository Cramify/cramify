import React from "react";
import "./Results.scss";
import Timer from "./Timer";
import {Link} from 'react-router-dom'

export default function Results(props) {
  return (
    <div className="results">
      {props.timerDisplay ? (
        <Timer timerFn={props.nextQFn} time={5} />
      ) : (
        <p>Timer Gone</p>
      )}
      <div className="question-info">
        <h1>{props.questionData.question}</h1>
        <h2>{props.questionData.correct_answer}</h2>
      </div>
      <div className="ranking">
        <h2>
          {props.usersArr.map(user => {
            return (
              <div key={user.playerID}>
                Username: {user.username}
                Points: {user.points}
              </div>
            );
          })}
        </h2>
      </div>
      {!props.timerDisplay && (
        // TODO: Add points to db on this button click
        <Link to="/dashboard">
          <button>Back to Dash</button>
        </Link>
      )}
    </div>
  );
}
