import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import axios from "axios";
// import Timer from './Timer'
import Question from './Question';


class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsDisplay: false,
      questionDisplay: false,
      pointCount: 0,
      set: [],
      correctAnswer: "",
      users: [],
      currentUser: "Guest",
      setID: null
    };
    this.socket = io.connect(":4000");
    this.socket.on("display name response", data => this.displayName(data));
    this.socket.on("update users array", data => this.updateUsersArr(data));
  }

  componentDidMount = async () => {
    if (this.props.creator) {
      const setID = Number(this.props.location.search.slice(1))
      this.setState({setID})
    }
    // Get user info, if none exists set as guest
    if (this.props.user.username) {
      await this.setState({
        currentUser: this.props.user.username
      });
    }
    
  

    // Join the room
    this.socket.emit("join room", {
      room: this.props.roomID,
      username: this.state.currentUser,
      setID: this.state.setID
    });

    // display names
    this.socket.emit("display name", {
      room: this.props.roomID,
      username: this.state.currentUser,
      setID: this.state.setID
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.users.length < this.state.users.length && this.props.creator) {
      this.socket.emit("users array changed", {
        room: this.props.roomID,
        users: this.state.users,
        setID: this.state.setID
      });
    }
  };

  displayName = data => {
    const newUsersArr = [...this.state.users, data.players];
    this.setState({
      users: newUsersArr
    });
  };

  updateUsersArr = data => {
    this.setState({
      users: data.users,
      setID: data.setID
    });
  };

  startGame = async () => {
    let res = await axios.get(`/game/set/${this.state.setID}`)
    this.setState({
      set: res.data,
      questionDisplay: true
    })
  }

  render() {
    console.log(this.state.setID)
    return (
      <div>
        <h2>GameRoom</h2>
        {this.state.users.map((user, i) => (
          <h3 key={i}>{user}</h3>
        ))}
        {this.props.creator && <button onClick={this.startGame}>Begin!</button>}
        {this.state.questionDisplay && <Question questionData={this.state.set[0]} /> }
        {this.state.resultsDisplay && <h1>Results here</h1>}
      </div>
    );
  }
}

const mapStateToProps = store => store;

export default connect(mapStateToProps)(GameRoom);
