import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducer";
import "../../modal.scss";

class EditUser extends Component {
  state = {
    username: "",
    email: "",
    imgURL: "",
    password: "",
    passwordCheck: "",
    oldPassword: ""
  };

  componentDidMount() {
    axios.get("/auth/user").then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email,
        imgURL: res.data.imgURL
      });
      this.props.updateUser(res.data);
    });
  }

  handleInput = (prop, e) => {
    this.setState({
      [prop]: e.target.value
    });
  };

  saveChanges = () => {
    const {
      username,
      email,
      imgURL,
      password,
      passwordCheck,
      oldPassword
    } = this.state;
    if (password === passwordCheck) {
      const body = {
        username,
        email,
        img_url: imgURL,
        newPassword: password,
        oldPassword
      };
      axios.put(`/auth/edit/${this.props.user.id}`, body).then(res => {
        alert("edited");
      });
    }
    this.props.toggleFn();
  };

  render() {
    console.log();
    return (
      <div className="modal">
        <div className="content">
          <i
            onClick={() => this.props.toggleFn()}
            className="fas fa-times fa-2x"
          />
          <h2>Edit Account</h2>
          <div className="user-input">
            <input
              value={this.state.username}
              placeholder="Username"
              onChange={e => this.handleInput("username", e)}
              type="text"
            />
            <input
              value={this.state.email}
              placeholder="Email"
              onChange={e => this.handleInput("email", e)}
              type="text"
            />
            <input
              value={this.state.imgURL}
              placeholder="Profile Picture"
              onChange={e => this.handleInput("imgURL", e)}
              type="text"
            />
            <input
              placeholder="Current Password"
              onChange={e => this.handleInput("oldPassword", e)}
              type="password"
            />
            <input
              placeholder="New Password"
              onChange={e => this.handleInput("password", e)}
              type="password"
            />
            <input
              placeholder="Confirm New Password"
              onChange={e => this.handleInput("passwordCheck", e)}
              type="password"
            />
            <button className='button' style={{marginTop: '1rem'}} onClick={this.saveChanges}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return { ...store };
};

export default connect(
  mapStateToProps,
  { updateUser }
)(EditUser);
