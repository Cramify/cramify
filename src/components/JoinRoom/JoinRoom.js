import React, { Component } from "react";
import { connect } from "react-redux";
import { updateRoomID } from "../../ducks/reducer";

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: null
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
      <div>
        <h2>Join Room</h2>
        <input
          value={this.state.roomID}
          placeholder="Enter Room ID"
          onChange={e => this.handleInput("roomID", e)}
          type="text"
        />
        <button onClick={this.joinRoom}>Join</button>
      </div>
    );
  }
}

const mapStateToProps = store => store;

export default connect(
  mapStateToProps,
  { updateRoomID }
)(JoinRoom);
