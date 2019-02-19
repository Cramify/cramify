import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EditUser from "./EditUser";
import Swal from "sweetalert2";
import "./Dashboard.scss";
import { updateUser } from "../../ducks/reducer";


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
      ranking: null
    };
  }

  componentDidMount = async () => {
    const res = await axios.get("/set/user");
    const userRank = await axios.get(`/user/rankings/${this.props.user.id}`)
    await this.setState({
      sets: res.data,
      ranking: userRank.data
    });
  };

  logout = () => {
    axios.post("/auth/logout");
    this.props.history.push("/");
    // this.props.updateUser('')
  };

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  deleteSet = async set_id => {
    const res = await axios.delete(`/set/user/delete/${set_id}`);
    await this.setState({
      sets: res.data
    });
    this.componentDidMount();
  };

  editSet = async setID => {
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

  render() {
    let sets = this.state.sets.map((set, i) => {
      return (
        <div className='user-created-sets' key={i}>
          <p className='user-set-name'>{set.set_name}</p>
          <p className='set-btns'>
            <button className='edit-set-btn' onClick={() => this.editSet(set.set_id)}>
              Edit
            </button>
          <button className='delete-set-btn' onClick={() => this.deleteSet(set.set_id)}>Delete</button>
          </p>
        </div>
      );
    });

    return (
      <div className="dashboard">
        <div className='main'>
          <div className="user-info">
            <div className="profile-pic">
              <img src="" alt="" />
            </div>
            <i className="fas fa-pen" onClick={this.toggleEdit} />
            <h4 className='dash-username'>{this.props.user.username}</h4>
            <div className='logout-delete-btns'>
              <button className='logout-btn' onClick={this.logout}>Logout</button>
              <button className='delete-btn' onClick={this.deleteAccount}>Delete User</button>
            </div>
          </div>
          <div className='dash-rank-holder'>
            <h1 className='dash-rank'>Rank</h1>
            <p className='user-rank'>{this.state.ranking}</p>
          </div>
          <div className="set-window">
            <h2 className='dash-sets'>My Sets</h2>
            <Link className='link' to="/newset">
              <button className='create-set-btn'>Create Question Set</button>
            </Link>{sets}
          </div>
        </div>
        <div className="game-options">
          <h2 className='play-now'>Play Now!</h2>
          <div className='join-create-btns'>
            <Link className='link' to="/join">
              <button className='dash-join-btn'>Join Game Room</button>
            </Link>
            <Link className='link' to="/create">
              <button className='dash-create-btn'>Create New Game</button>
            </Link>
          </div>
        </div>
        {this.state.edit && <EditUser toggleFn={this.toggleEdit} />}
      </div>
    );
  }
}

const mapStateToProps = store => store;

export default connect(
  mapStateToProps, {updateUser}
)(DashBoard);
