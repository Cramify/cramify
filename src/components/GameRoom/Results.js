import React from "react";
import "./Results.scss";
import Timer from "./Timer";
import {Link} from 'react-router-dom'

export default function Results(props) {
  return (
    <div className="results">
      {props.timerDisplay ? (
        <div className='timer'>
        <Timer timerFn={props.nextQFn} time={1} size={100}/>
        </div>
      ) : (
        <p></p>
      )}
      <div className="question-info">
        <h1 className='results-question-display'>{props.questionData.question}</h1>
        <br/>
        <h2 className='results-answer-display'>{props.questionData.correct_answer}</h2>
      </div>
      
      <h1 className='results-score'>Scores</h1>
      <div className="ranking">
        <h2>
          {props.usersArr.map(user => {
            return (
              <div className='player-scores' key={user.playerID}>
                <p className='results-player-info'>{user.username}</p>
                <p className='results-player-info'>{user.points}</p>
              </div>
            );
          })}
        </h2>
        <br/>
      </div>
      {!props.timerDisplay && (
        // TODO: Add points to db on this button click
        <div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
            <div className='confetti-piece'></div>
          <Link className='dash-link' to="/dashboard">
            <button className='dash-btn'>Back to Dash</button>
          </Link>
        </div>
      )}
    </div>
  );
}
