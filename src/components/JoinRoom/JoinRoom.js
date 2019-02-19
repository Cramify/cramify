import React, { Component } from "react";
import { connect } from "react-redux";
import { updateRoomID, updateUser, nameGuest } from "../../ducks/reducer";
import axios from 'axios';
import './JoinRoom.scss';

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: '',
      guestName: ''
    };
  }

  componentDidMount = async () => {
    if (!this.props.user.username) {
      try {
        const loginData = await axios.get("/auth/user");
        this.props.updateUser(loginData.data);
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  handleInput = (prop, e) => {
    this.setState({
      [prop]: e.target.value
    });
  };

  joinRoom = () => {
    this.props.updateRoomID(this.state.roomID);
    if (this.state.guestName) this.props.nameGuest(this.state.guestName)
    this.props.history.push("/gameroom");
  };

  render() {
    return (
      <div className='join-room'>
        <div onClick={() => this.props.history.goBack()} className='back-button'>Back</div>
        <h2>Join Room</h2>
      {!this.props.user.id ? (
        <input
        className='guest-name-input'
        value={this.state.guestName}
        placeholder="Enter Your Name"
        onChange={e => this.handleInput("guestName", e)}
        type="text"
      />
      ) : (
        null
      )}
        <input
          value={this.state.roomID}
          placeholder="Enter Room Code"
          onChange={e => this.handleInput("roomID", e)}
          type="text"
        />
        <div className='join-button' onClick={this.joinRoom}>Join!</div>
      </div>
    );
  }
}

const mapStateToProps = store => store;

export default connect(
  mapStateToProps,
  { updateRoomID, updateUser, nameGuest }
)(JoinRoom);
