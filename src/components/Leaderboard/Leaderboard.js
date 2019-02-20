import React, { Component } from "react";
import axios from 'axios'
import './Leaderboard.scss'
import {withRouter} from 'react-router-dom'

class Leaderboard extends Component {
  state = {
    leaderboard: []
  };

  componentDidMount = async () => {
    try {
      const leaderboard = await axios.get("/leaderboard");
      this.setState({
        leaderboard: leaderboard.data
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  render() {
    return (
      <div className={this.props.match.path === '/dashboard' ? "leaderboard-dashboard" : "leaderboard"}>
        <h1>Leaderboard</h1>
        {this.state.leaderboard.map((leader, i) => (
          <div key={i}>
            <h2>
              {i + 1}. {leader.username}
            </h2>
            <div className="leading-dots" />
            <h2>{leader.score}</h2>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(Leaderboard)