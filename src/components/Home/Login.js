import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducer";
import Swal from 'sweetalert2'
import "../../modal.scss";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleInput = (prop, e) => {
    this.setState({
      [prop]: e.target.value
    });
  };

  handleKeyDown = evt => {
    if (evt.keyCode === 13) {
      this.login();
    }
    if (evt.keyCode === 27) {
      this.removeLogin();
    }
  };

  removeLogin = () => {
    this.setState({
      email: "",
      password: ""
    });
    this.props.logFn();
  };

  login = async () => {
    const { email, password } = this.state;
    try {
      const res = await axios.post("/auth/login", { email, password });
      console.log(res.data)
      if (!res.data.loggedIn) return alert(res.data.message)
      this.props.history.push("/dashboard");
      this.props.updateUser(res.data.userData);
    } catch (e) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: `Username or password wasn't found.`,
        showConfirmButton: false,
        timer: 1500
      })
      this.setState({email: '', password: ''})
    }
  };

  render() {
    return (
      <div className="modal">
        <div className="content">
          <i
            onClick={() => this.removeLogin()}
            className="fas fa-times fa-2x"
          />
          <h2>Login</h2>
          <div className="user-input">
            <input
              value={this.state.email}
              id="login-input"
              placeholder="Email"
              onChange={e => this.handleInput("email", e)}
              onKeyDown={e => this.handleKeyDown(e)}
              type="text"
            />
            <input
              value={this.state.password}
              placeholder="Password"
              onChange={e => this.handleInput("password", e)}
              onKeyDown={e => this.handleKeyDown(e)}
              type="password"
            />
          </div>
          <button className="button" onClick={this.login}>
            Login
          </button>
          <div className="switch-modal">
            <h4>Need an account?</h4>
            <button
              onClick={() => {
                this.props.logFn();
                this.props.regFn();
              }}
              className="button"
            >
              Register
            </button>
            <div />
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
)(withRouter(Login));
