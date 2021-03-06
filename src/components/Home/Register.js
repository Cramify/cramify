import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducer";
import "../../modal.scss";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      checkPassword: "",
      username: ""
    };
  }
    register = async () =>{
        const {email, username, password, checkPassword} = this.state;
        if(email === ''){
            return alert('Please provide email')
        } else if(username === ''){
            return alert('Please choose a username')
        }else if(password === ''){
            return alert('Please create a password')
        }else 
        if(password !== checkPassword){
            return alert("Passwords don't match")
        }
        const res = await axios.post('/auth/register', {email, username, password})
        if (res.data.loggedIn) this.props.history.push('/dashboard')
        if (!res.data.loggedIn) return alert(res.data.message)
        this.props.updateUser(res.data.userData)
    }

  handleInput = (prop, e) => {
    this.setState({
      [prop]: e.target.value
    });
  };

  handleKeyDown = evt => {
    if (evt.keyCode === 13) {
      this.register();
    }
    if (evt.keyCode === 27) {
      this.removeRegister();
    }
  }

  removeRegister = () => {
    this.setState({
      email: "",
      password: "",
      checkPassword: "",
      username: ""
    })
    this.props.regFn()
  }

  render() {
    return (
      <div className="modal">
        <div className="content">
          <i
            onClick={() => this.removeRegister()}
            className="fas fa-times fa-2x"
          />
          <h2>Register</h2>
          <div className="user-input">
            <input
              value={this.state.email}
              id='register-input'
              onKeyDown={e => this.handleKeyDown(e)}
              onChange={e => this.handleInput("email", e)}
              type="text"
              placeholder="email"
            />
            <input
            value={this.state.username}
                onKeyDown={e => this.handleKeyDown(e)}
              onChange={e => this.handleInput("username", e)}
              type="text"
              placeholder="username"
            />
            <input
            value={this.state.password}
            onKeyDown={e => this.handleKeyDown(e)}
              onChange={e => this.handleInput("password", e)}
              type="password"
              placeholder="password"
            />
            <input
            value={this.state.checkPassword}
            onKeyDown={e => this.handleKeyDown(e)}
              onChange={e => this.handleInput("checkPassword", e)}
              type="password"
              placeholder="confirm password"
            />
          </div>
          <button className="button" onClick={this.register}>
            Register
          </button>
          <div className="switch-modal">
            <h4>Already Have an Account?</h4>
            <button
              onClick={() => {
                this.props.regFn();
                this.props.logFn();
              }}
              className="button"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return { store };
};

export default connect(
  mapStateToProps,
  { updateUser }
)(withRouter(Register));
