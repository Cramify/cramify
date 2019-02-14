import React from "react";
import "./Results.scss";
import Timer from './Timer';

export default function Results(props) {
  return (
    <div className="results">
    {props.timerDisplay ? <Timer timerFn={props.nextQFn} time={1}/> : <p>Timer Gone</p>}
      <div className="question-info">
        <h1>{props.questionData.question}</h1>
        <h2>{props.questionData.correct_answer}</h2>
      </div>
      <div className="ranking">
        ranking goes here
      </div>
    </div>
  );
}
