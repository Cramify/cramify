import React from "react";
import "./Results.scss";

export default function Results(props) {
  return (
    <div className="results">
      <div className="question-info">
        <h1>{props.question.question}</h1>
        <h2>{props.question.correct_answer}</h2>
      </div>
      <div className="ranking">
        ranking goes here
      </div>
    </div>
  );
}
