import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EditUser from "./EditUser";
import Leaderboard from '../Leaderboard/Leaderboard'
import Swal from "sweetalert2";
import "./Dashboard.scss";
import Header from "../Header/Header";
import { updateUser, updateRoomID, updateCreator } from "../../ducks/reducer";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      imgURL: "",
      score: 0,
      edit: false,
      editSet: false,
      sets: [],
      setName: "",
      ranking: null,
      roomID: null
    };
  }

  componentDidMount = async () => {
    // check if user is logged in, else move to landing
    const user = await axios.get('/auth/user')
    console.log(user.data)
    this.setState({
      imgURL: user.data.imgURL
    })
    if (!user.data) return this.props.history.push('/')
    
    // get a random room id
    const roomID =
    Math.floor(Math.random() + 10000) + Math.floor(Math.random() * 10000);
    this.setState({ roomID });
    
    // get user sets
    const userSets = await axios.get("/set/user");
    // check ranking
    const userRank = await axios.get(`/user/rankings/${this.props.user.id}`);
    await this.setState({
      sets: userSets.data,
      ranking: userRank.data
    });
  };

  logout = () => {
    axios.post("/auth/logout");
    this.props.history.push("/");
    this.props.updateUser({})
  };

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
    document.getElementById('edit-user-input').focus();
  };

  deleteSet = async (set_id, event) => {
    event.stopPropagation();
    const res = await axios.delete(`/set/user/delete/${set_id}`);
    await this.setState({
      sets: res.data
    });
    this.componentDidMount();
  };

  editSet = async (setID, event) => {
    event.stopPropagation();
    this.props.history.push(`/editset/${setID}`);
  };

  deleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete your acccount?",
      type: "warning",
      confirmButtonText: "DELETE",
      showCancelButton: true,
      cancelButtonText: "CANCEL"
    }).then(res => {
      if (res.value) {
        Swal.fire({
          title: `Account Deleted.`,
          text: `We're sad to see you go!`,
          type: `success`
        });
        axios.delete("/auth/user/delete");
        this.props.history.push("/");
      }
    });
  };

  createRoom = setID => {
    this.props.updateRoomID(this.state.roomID);
    this.props.updateCreator();
    this.props.history.push(`/gameroom?${setID}`);
  };

  render() {
    let sets = this.state.sets.map((set, i) => {
      return (
        <div
          onClick={() => this.createRoom(set.set_id)}
          className="set-card"
          key={i}
        >
          <h3>{set.set_name}</h3>
          <div className="set-buttons">
            <i
              className="far fa-times-circle"
              onClick={e => this.deleteSet(set.set_id, e)}
            />
            <i
              className="fas fa-pen"
              onClick={e => this.editSet(set.set_id, e)}
            />
          </div>
        </div>
      );
    });

    return (
      <div className="dashboard-page">
        <Header  logoutFn={this.logout}/>

        <div className="dashboard">
          <div className="left-container">
            <div className="user-info">
              <div className="profile-pic">
                <img className="user-img" src={this.state.imgURL} alt="" />
              </div>
              <h1>{this.props.user.username}</h1>
              <h2>Rank: {this.state.ranking}</h2>
              <h4 onClick={this.logout}>Logout</h4>
              <h4 onClick={this.toggleEdit}>Edit Account</h4>
            </div>

            <div className="game-buttons">
              <Link className="link" to="/join">
                <button>Join Room</button>
              </Link>
              <Link className="link" to="/create">
                <button>Create Room</button>
              </Link>
            </div>
            <div className="leaderboard-container"><Leaderboard/></div>
          </div>
          <div className="right-container">
            <div className="my-sets">
              <h1>My Sets</h1>
              {sets}
              <Link to="/newset">
                <h5 className="create-set-btn">Create Question Set</h5>
              </Link>
            </div>
          </div>
          <div
            className={
              this.state.edit
                ? "modal-container show-modal"
                : "modal-container hide-modal"
            }
          >
            <EditUser toggleFn={this.toggleEdit} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => store;

export default connect(
  mapStateToProps,
  { updateUser, updateRoomID, updateCreator }
)(DashBoard);
