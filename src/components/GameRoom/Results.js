import React, {Component} from "react";
import "./Results.scss";
import Timer from "./Timer";
import {Link} from 'react-router-dom'
import axios from 'axios';
import {connect} from 'react-redux';
import Swal from 'sweetalert2'

class Results extends Component {

  componentDidMount() {
    if (!this.props.timerDisplay) {
      console.log(this.props.usersArr)
      let leader = await this.props.usersArr.sort(function(a,b){
        console.log(a.points) 
        return a.points - b.points
      })
      let winner = await leader.slice(leader.length - 1)
      console.log(winner)
      
      Swal.fire({
        title: `${winner[0].username} is the winner!`,
        text: `${winner[0].points} points`,
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#00d1ff',
        cancelButtonColor: '#d33',
        confirmButtonText: 'NEATO!'
      })
      const index = this.props.usersArr.findIndex((user) => {
        return this.props.myID === user.playerID;
      })
      axios.put(`./user/points/${this.props.user.id}`, {points: Number(this.props.usersArr[index].points)})
    }
  }

  render() {
    return (
      <div className="results">
        {this.props.timerDisplay ? (
          <div className='timer'>
          <Timer timerFn={this.props.nextQFn} time={10} size={100}/>
          </div>
        ) : (
          <p></p>
        )}
        <div className="question-info">
          <h1 className='results-question-display'>{this.props.questionData.question}</h1>
          <br/>
          <h2 className='results-answer-display'>{this.props.questionData.correct_answer}</h2>
        </div>
        
        <h1 className='results-score'>Scores</h1>
        <div className="ranking">
          <h2>
            {this.props.usersArr.map(user => {
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
      {!this.props.timerDisplay && (
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
}

const mapStateToProps = store => store;

export default connect(mapStateToProps)(Results);
