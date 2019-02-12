import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";

class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointCount: 0,
      questions: [],
      correctAnswer: "",
      users: [],
      creator: false,
      currentUser: 'Guest'
    };
    this.socket = io.connect(":4000");
    this.socket.on("display name", data => this.displayName(data));
  }

  componentDidMount() {
    // Get user info, if none exists set as guest
    if (this.props.user.username) {
      this.setState({
        currentUser: this.props.user.username
      })
    }

    // Join the room
    this.socket.emit("join room", {
      room: this.props.roomID,
      username: this.state.currentUser
    });
  }

  displayName(data) {
    this.setState({
      users: this.state.users.push(data.username)
    });
    console.log(this.state.users);
  }

  render() {
    return <div>GameRoom</div>;
  }
}

const mapStateToProps = store => store;

export default connect(mapStateToProps)(GameRoom);
