import React, { Component } from "react";

export default function Results(props) {
  return (
    <div>
      <h1>{props.question}</h1>
      <h2>{props.correctAnswer}</h2>
      
    </div>
  );
}
