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
      resultsDisplay: false,
      questionDisplay: false,
      pointCount: 0,
      set: [],
      correctAnswer: "",
      users: [],
      currentUser: "Guest",
      setID: null,
      myID: null
    };
    this.socket = io.connect(":4000");
    this.socket.on("display name response", data => this.displayName(data));
    this.socket.on("update users array", data => this.updateUsersArr(data));
    this.socket.on('run begin function', data => this.startGame())
    this.socket.on('kick everyone out', data => this.kick())
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
      console.log('unmounted')
      if (this.props.creator) {
        await this.socket.emit('host has left', {room: this.state.roomID})
        this.props.destroyCreator()
      }
      this.state.users.map((user, i)=> {
        if(user.playerID  === this.state.myID){
          this.state.users.splice(i, 1)
        }
      })
      this.socket.emit('users array changed', {
        room: this.props.roomID,
        users: this.state.users,
        setID: this.state.setID
      })
      console.log(this.state.users)
      console.log('unmounted again')
    }

    displayName = data => {
      const player = {username: data.players[0], playerID: data.playerID, points: 0};
      const newUsersArr = [...this.state.users, player];
      this.setState({
        users: newUsersArr,
        myID: data.playerID
      });
    };

    updateUsersArr = data => {
      this.setState({
        users: data.users,
        setID: data.setID
      });
      console.log(data)
    };

    startGame = async () => {
      if(this.props.creator) {
        this.socket.emit('game start', {room: this.props.roomID})
      }
      let res = await axios.get(`/game/set/${this.state.setID}`)
      this.setState({
        set: res.data,
        questionDisplay: true
      })
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

    render() {
      console.log(this.state.setID)
      return (
        <div>
          <h2>GameRoom</h2>
          <h3>Room ID: {this.props.roomID}</h3>
          {this.state.users.map((user, i) => (
            <h3 key={i}>{user.username}</h3>
          ))}
          {this.props.creator && <button onClick={this.startGame}>Begin!</button>}
          {this.state.questionDisplay && <Question questionData={this.state.set[0]} />}
          {this.state.resultsDisplay && <h1>Results here</h1>}
          <button onClick={()=>{this.setState({questionDisplay: true})}}></button>
          {/* <Results
            question={this.state.set[0]}
            correctAnswer={this.state.set}
            users={this.state.users}
          /> */}
        </div>
      );
    }
  }


  const mapStateToProps = store => store;

  export default connect(
    mapStateToProps,
    { updateUser, destroyCreator }
  )(GameRoom);
