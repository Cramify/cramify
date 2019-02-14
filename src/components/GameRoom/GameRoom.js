import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import axios from "axios";
// import Timer from './Timer'


class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointCount: 0,
      set: [],
      correctAnswer: "",
      users: [],
      currentUser: "Guest",
    };
    this.socket = io.connect(":4000");
    this.socket.on("display name response", data => this.displayName(data));
    this.socket.on("update users array", data => this.updateUsersArr(data));
  }

  componentDidMount = async () => {
    const {setID} = this.props.match.params
    // Get user info, if none exists set as guest
    if (this.props.user.username) {
      await this.setState({
        currentUser: this.props.user.username
      });

      let res = await axios.get(`/game/set/${setID}`)
      console.log(res.data)
      this.setState({
        set: res.data
      })
      console.log(this.state.set)
    }

    // Join the room
    this.socket.emit("join room", {
      room: this.props.roomID,
      username: this.state.currentUser
    });

    // display names
    this.socket.emit("display name", {
      room: this.props.roomID,
      username: this.state.currentUser
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.users.length < this.state.users.length && this.props.creator) {
      this.socket.emit("users array changed", {
        room: this.props.roomID,
        users: this.state.users,
      });
    }
  };

  displayName = data => {
    const newUsersArr = [...this.state.users, data];
    this.setState({
      users: newUsersArr
    });
  };

  updateUsersArr = data => {
    this.setState({
      users: data
    });
  };

  render() {
    return (
      <div>
        <h2>GameRoom</h2>
        {/* <Timer /> */}
        {this.state.users.map((user, i) => (
          <h3 key={i}>{user}</h3>
        ))}
        {this.props.creator && <button>Begin!</button>}
      </div>
    );
  }
}

const mapStateToProps = store => store;

export default connect(mapStateToProps)(GameRoom);
