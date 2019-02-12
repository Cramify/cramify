import React, { Component } from "react";
import { connect } from "react-redux";
import { updateRoomID, updateCreator } from "../../ducks/reducer";

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: "",
      sets: [],
      roomID: null
    };
  }

  componentDidMount = () => {
    // get a random room id
    const roomID =
      Math.floor(Math.random() + 10000) + Math.floor(Math.random() * 10000);
    this.setState({ roomID });
  };

  createRoom = () => {
    this.props.updateRoomID(this.state.roomID);
    this.props.updateCreator();
    this.props.history.push(`/gameroom`);
  };

  handleInput = (prop, e) => {
    this.setState({
      [prop]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <h2>Room ID: {this.state.roomID}</h2>
        {/* <input
          placeholder="Room Name"
          value={this.state.roomName}
          onChange={e => this.handleInput("roomName", e)}
          type="text"
        /> */}
        <button onClick={() => this.createRoom()}>Create Room</button>
      </div>
    );
  }
}

const mapStateToProps = store => store;

export default connect(
  mapStateToProps,
  { updateRoomID, updateCreator }
)(CreateRoom);
