import React, { Component } from "react";
import "./Results.scss";
import Confetti from './Confetti';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer';
import Swal from 'sweetalert2'


class Results extends Component {
  async componentDidMount() {
    if (!this.props.timerDisplay) {
      let leader = await this.props.usersArr.sort(function(a, b) {
        return a.points - b.points;
      });
      let winner = await leader.slice(leader.length - 1);

      Swal.fire({
        title: `${winner[0].username} is the winner!`,
        text: `${winner[0].points} points`,
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "#00d1ff",
        cancelButtonColor: "#d33",
        confirmButtonText: "Congrats!"
      });
      const index = this.props.usersArr.findIndex(user => {
        return this.props.myID === user.playerID;
      });
      if (this.props.user !== {}) {
        const updatedUserPoints = await axios.put(`./user/points/${this.props.user.id}`, {
          points: Number(this.props.usersArr[index].points)
        });
        this.props.updateUser(updatedUserPoints.data)
      }
    } else {
      Swal.fire({
        title: this.props.questionGrade === 'correct' ? `Won ${this.props.pointsWon} points!` : `Aw, man!`,
        text: this.props.questionGrade === 'correct' ? `Nice!` : `You'll get the next one!`,
        type: this.props.questionGrade === 'correct' ? `success` : `error`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1400
      });
    }
  }

  render() {
    console.log(this.props.user)
    return (
      <div className={this.props.questionGrade === 'correct' ? "results correct-answer" : "results incorrect-answer"}>
        <div className="question-info">
          <h1 className="results-question-display">
            {this.props.questionData.question}
          </h1>
          <br />
          <h2 className="results-answer-display">
            {this.props.questionData.correct_answer}
          </h2>
        </div>
        <div className='score-holder'>
          <h1 className="results-score">Scores</h1>
          {/* <div className="ranking"> */}
            {/* <h2> */}
              {this.props.usersArr.sort((a,b) => b.points - a.points).map(user => {
                return (
                  <div className="player-scores" key={` user: ${user.playerID}`}>
                    <p className="results-player-info">{user.username}</p>
                    <p className="results-player-info">{user.points}</p>
                  </div>
                );
              })}
          {/* </div> */}
          {/* </h2> */}
          <br />
        </div>
      {!this.props.timerDisplay && (
        <div>
          <Confetti />
          {this.props.user.id ? (
              <Link className="dash-link" to="/dashboard">
                <button className="dash-btn">Back to Dash</button>
              </Link>
            ) : (
              <Link className="dash-link" to="/join">
                <button className="dash-btn">Back to Join</button>
              </Link>
            )}
        </div>
      )}
    </div>
  );
  }
}

const mapStateToProps = store => store;

export default connect(mapStateToProps, {updateUser})(Results);