import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { updateRoomID, updateCreator } from "../../ducks/reducer";
import './CreateRoom.scss';

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sets: [],
      roomID: null,
    };
  }

  componentDidMount = async () => {
    // check if logged in, send unlogged in users to landing
    const user = await axios.get('/auth/user')
    if (!user.data) return this.props.history.push('/')

    // get a random room id
    const roomID =
      Math.floor(Math.random() + 10000) + Math.floor(Math.random() * 10000);
    this.setState({ roomID });

    const res = await axios.get('/set/all');
    this.setState({
        sets: res.data,
    })
  };

  createRoom = async (setID, setName) => {
    this.props.updateRoomID(this.state.roomID);
      await axios.post('/game/room/add', {roomID: this.state.roomID, setName})
    this.props.updateCreator();
    this.props.history.push(`/gameroom?${setID}`);
  };

  handleInput = (prop, e) => {
    this.setState({
      [prop]: e.target.value
    });
  };

  render() {
    let sets = this.state.sets.map((set, i) => {
      return (
        <div className='set' key={i}>
          <div className='set-name'>{set.set_name}</div> {/* Seperate sets by admin/user*/}
          <div className='create-button' onClick={() => this.createRoom(set.set_id, set.set_name)}>Create Room</div>
        </div>
      )
    })
    return (
      <div className='create'>
        <div onClick={() => this.props.history.push('/dashboard')} className='back-button'>Back</div>
        <div className='set-container'>
          <h2>Game Sets:</h2>
          <h3>{sets}</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => store;

export default connect(
  mapStateToProps,
  { updateRoomID, updateCreator }
)(CreateRoom);
