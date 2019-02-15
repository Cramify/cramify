import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EditUser from "./EditUser";
import Swal from "sweetalert2";
import "./Dashboard.scss";

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
      setName: ""
    };
  }

  componentDidMount = async () => {
    const res = await axios.get("/set/user");
    this.setState({
      sets: res.data
    });
  };
  logout = () => {
    axios.post("/auth/logout");
    this.props.history.push("/");
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
        <div key={i}>
          <p>{set.set_name}</p>
          <button onClick={() => this.deleteSet(set.set_id)}>Delete</button>
          <button onClick={() => this.editSet(set.set_id)}>
            Edit Your Set
          </button>
          {/* {this.state.editSet && 
                    <EditSet
                        setName={this.state.setName}
                        setID ={set.set_id}
                     />} */}
        </div>
      );
    });

    return (
      <div className="dashboard">
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
        <div className="game-options">
          <h2 className='play-now'>Play Now!</h2>
          <div className='join-create-btns'>
            <Link to="/join">
              <button className='dash-join-btn'>Join Game Room</button>
            </Link>
            <Link to="/create">
              <button className='dash-create-btn'>Create New Game</button>
            </Link>
          </div>
        </div>
        {this.state.edit && <EditUser toggleFn={this.toggleEdit} />}
        <div className="set-window">
          <h2>My Sets:{sets}</h2>
          <Link to="/newset">
            <button>Create New Question Set</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => store;

export default connect(
  mapStateToProps,
)(DashBoard);
