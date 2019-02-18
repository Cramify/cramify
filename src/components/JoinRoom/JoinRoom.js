import React, { Component } from "react";
import { connect } from "react-redux";
import { updateRoomID } from "../../ducks/reducer";
import './JoinRoom.scss';

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: ''
    };
  }

  handleInput = (prop, e) => {
    this.setState({
      [prop]: e.target.value
    });
  };

  joinRoom = () => {
    this.props.updateRoomID(this.state.roomID);
    this.props.history.push("/gameroom");
  };

  render() {
    return (
      <div className='join-room'>
        <div onClick={() => this.props.history.push('/dashboard')} className='back-button'>Back</div>
        <h2>Join Room</h2>
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
  { updateRoomID }
)(JoinRoom);
