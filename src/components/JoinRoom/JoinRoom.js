import React, { Component } from "react";
import { connect } from "react-redux";
import { updateRoomID, updateUser, nameGuest } from "../../ducks/reducer";
import axios from 'axios';
import './JoinRoom.scss';
import OpenRooms from './OpenRooms';


class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: '',
      guestName: '',
      openRooms: []
    };

  }

  //add a get to the room table and then use that to compare. Keep on state and then compare in the openRoomJoin fucntion. 

  componentDidMount = async () => {
    const res = await axios.get('/game/rooms');
    this.setState({
      openRooms: res.data
    })

    if (!this.props.user.id) {
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

  handleKeyDown = evt => {
    if (evt.keyCode === 13) {
      this.joinRoom();
    }
  } 

  openRoomJoin = async (gameCode) => {
      await this.setState({
        roomID: gameCode
      })
      await this.joinRoom()
  }

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
          onKeyDown={e => this.handleKeyDown(e)}
          type="text"
        />
        <div className='join-button' onClick={this.joinRoom}>Join!</div>
        <OpenRooms 
          // joinRoom={this.joinRoom}
          openRoomJoin={this.openRoomJoin}
        />
      </div>
    );
  }
}

const mapStateToProps = store => store;

export default connect(
  mapStateToProps,
  { updateRoomID, updateUser, nameGuest }
)(JoinRoom);
