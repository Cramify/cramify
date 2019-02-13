import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditUser from "./EditUser";
import CreateSet from "./CreateSet";
import Swal from "sweetalert2";
import "./Dashboard.scss";

export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      imgURL: "",
      score: 0,
      edit: false,
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
    //     await axios.get('/set/user');
    //    await this.setState({
    //         sets: res.data
    //     })
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
      console.log(set.set_id);
      return (
        <div key={i}>
          <p>{set.set_name}</p>
          <button onClick={() => this.deleteSet(set.set_id)}>Delete</button>
        </div>
      );
    });

    return (
      <div className="dashboard">
        <div className="user-info">
          <div className="profile-pic">
            <img src="" alt="profile picture" />
          </div>
          <i className="fas fa-pen" onClick={this.toggleEdit} />
          <button onClick={this.logout}>Logout</button>
          <button onClick={this.deleteAccount}>Delete User</button>
        </div>
        <div className="game-options">
          <h2>Play Now!</h2>
          <Link to="/join">
            <button>Join Game Room</button>
          </Link>
          <Link to="/create">
            <button>Create New Game</button>
          </Link>
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
