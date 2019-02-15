import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { updateUser, destroyCreator } from "../../ducks/reducer";
import Results from "./Results";
import axios from "axios";
import Question from './Question'
import Swal from 'sweetalert2'

class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      questionDisplay: false,
      pointCount: 0,
      set: [],
      correctAnswer: "",
      users: [],
      userPointsArr: [],
      currentUser: "Guest",
      setID: null,
      myID: null,
      currentQuestion: 0,
      showTimer: true
    };
    this.socket = io.connect(":4000");
    this.socket.on("display name response", data => this.displayName(data));
    this.socket.on("update users array", data => this.updateUsersArr(data));
    this.socket.on('run begin function', data => this.startGame());
    this.socket.on('kick everyone out', data => this.kick());
    this.socket.on('display points', data => this.displayPoints(data));
    this.socket.on('set myid on state', data => this.updateMyID(data))
  }

  componentDidMount = async () => {
    if (this.props.creator) {
      const setID = Number(this.props.location.search.slice(1))
      this.setState({ setID })
      if (!this.props.user.username) {
        try {
          const loginData = await axios.get("/auth/user");
          this.props.updateUser(loginData);
        } catch (e) {
          console.log(e);
        }
      }
    }
    // Get user info, if none exists set as guest
    if (this.props.user.username) {
      await this.setState({
        currentUser: this.props.user.username
      });
    }
    // Join the room
    await this.socket.emit("join room", {
      room: this.props.roomID,
      username: this.state.currentUser,
      setID: this.state.setID
    });

    // display names
    await this.socket.emit("display name", {
      room: this.props.roomID,
      username: this.state.currentUser,
      setID: this.state.setID
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.users.length !== this.state.users.length &&
      this.props.creator
    ) {
      this.socket.emit("users array changed", {
        room: this.props.roomID,
        users: this.state.users,
        setID: this.state.setID
      });
    }
  };

  componentWillUnmount = async () => {
    if (this.props.creator) {
      await this.socket.emit('host has left', { room: this.state.roomID })
      this.props.destroyCreator()
    }
    // eslint-disable-next-line
    this.state.users.map((user, i) => { 
      if (user.playerID === this.state.myID) {
         return this.state.users.splice(i, 1)
      }
    })
    this.socket.emit('users array changed', {
      room: this.props.roomID,
      users: this.state.users,
      setID: this.state.setID
    })
  }

  displayName = data => {
    const player = { username: data.players[0], playerID: data.playerID, points: 0 };
    const updatedUsers = [...this.state.users, player];
    this.setState({
      users: updatedUsers
    });
    if (this.state.myID === null) this.socket.emit('update my id', {myID: player.playerID})
  };
  
  updateMyID = data => {
    this.setState({
      myID: data.myID
    })
    console.log(this.state.myID)
  }

  updateUsersArr = data => {
    console.log(data.users)
    this.setState({
      users: data.users,
      setID: data.setID
    });
  };

  startGame = async () => {
    if (this.props.creator) {
      this.socket.emit('game start', { room: this.props.roomID })
    }
    let res = await axios.get(`/game/set/${this.state.setID}`)
    this.setState({
      set: res.data,
      gameStarted: true,
      questionDisplay: true
    })
  }

  toResults = () => {
    this.setState({ questionDisplay: !this.state.questionDisplay })
  }

  nextQuestion = () => {
    this.setState({ currentQuestion: this.state.currentQuestion + 1, questionDisplay: !this.state.questionDisplay })
    if (this.state.currentQuestion + 2 > this.state.set.length) {
      //get rid of the timer
      return this.setState({ showTimer: false, questionDisplay: true })
    }
  }

  kick = () => {
    console.log('kick')
    Swal.fire({
      title: 'Host has left',
      message: 'Leaving room',
      timer: 1500,
      type: 'error'
    }).then(() => {
      this.props.history.push('/')
    })
  }

  displayPoints = data => {
    console.log(data.user)
    const updatedUsers = [...this.state.users]
    updatedUsers[data.userIndex] = data.user
    this.setState({
      users: updatedUsers
    });
  };


  updatePoints = (playerID, pts) => {
    console.log('playerid', playerID)
    console.log('users arr', this.state.users)
    const index = this.state.users.findIndex((user, i) => {
      return user.playerID === playerID
    })
    let usersArrCopy = [...this.state.users]
    let userObj = usersArrCopy.splice(index, 1);
    console.log(userObj)
    userObj[0].points += pts;

    // send userObj to everyone
    this.socket.emit('update points', {
      room: this.props.roomID,
      user: {...userObj[0]},
      userIndex: index
    })
  }

  render() {
    const { users, questionDisplay, gameStarted, currentQuestion, set, showTimer } = this.state;
    return (
      <div>
        <h2>GameRoom</h2>
        <h3>Room ID: {this.props.roomID}</h3>
        {users.map((user, i) => (
          <h3 key={i}>{user.username}</h3>
        ))}
        {this.props.creator && <button onClick={this.startGame}>Begin!</button>}
        {questionDisplay && 
        <Question 
          toResFn={this.toResults} 
          questionData={set[currentQuestion]} 
          updatePts={this.updatePoints} 
          playerID={this.state.myID}
        />}
        {gameStarted && !questionDisplay ? 
        <Results 
          nextQFn={this.nextQuestion} 
          questionData={set[currentQuestion]} 
          timerDisplay={showTimer} 
          usersArr={this.state.users}
        /> 
          : null}
      </div>
    );
  }
}


const mapStateToProps = store => store;

export default connect(
  mapStateToProps,
  { updateUser, destroyCreator }
)(GameRoom);
