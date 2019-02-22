import React, { Component } from "react";
import Register from "./Register";
import Login from "./Login";
import Leaderboard from "../Leaderboard/Leaderboard";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { updateUser } from "../../ducks/reducer";
import { connect } from "react-redux";
// import {useTransition, animated, useSpring} from 'react-spring';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      register: false,
      login: false,
      leaderboard: [],
      hamburger: false
    };
  }

  componentDidMount = async () => {
    if (!this.props.user.username) {
      try {
        const loginData = await axios.get("/auth/user");
        this.props.updateUser(loginData.data);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  registerToggle = () => {
    if (this.state.hamburger) this.hamburgerToggle()
    this.setState({
      register: !this.state.register
    });
    document.getElementById("register-input").focus();
  };

  loginToggle = () => {
    if (this.state.hamburger) this.hamburgerToggle()
    this.setState({
      login: !this.state.login
    });
    document.getElementById("login-input").focus();
  };

  hamburgerToggle = () => {
    this.setState({ hamburger: !this.state.hamburger });
  };

  logout = () => {
    axios.post("/auth/logout");
    this.props.updateUser({});
    if (this.state.hamburger) this.hamburgerToggle()    
  };

  render() {
    const { register, login } = this.state;
    return (
      <div className="home">
        <div className="triangle-container">
          <div className="big-triangle" />
        </div>
        <div className="header">
          <Link to="/">
            <h1 className="logo">Cramify</h1>
          </Link>
          <div onClick={this.hamburgerToggle} className="hamburger">
            <i className="fas fa-bars fa-2x" />
          </div>
          <div
            className={
              this.state.hamburger ? "show button-group" : "button-group"
            }
          >
            {this.props.user.id ? (
              <>
                <div
                  className="button"
                  onClick={() => this.props.history.push("/dashboard")}
                >
                  Dashboard
                </div>
                <div className="button" onClick={() => this.logout()}>
                  Logout
                </div>
              </>
            ) : (
              <>
                <div className="button" onClick={() => this.registerToggle()}>
                  Register
                </div>
                <div className="button" onClick={() => this.loginToggle()}>
                  Login
                </div>
              </>
            )}
          </div>
        </div>
        <div className="hero">
          <div className="hook">
            <h2>
              Want to study some great coding material? You are at the right
              place my friends. :)
            </h2>
            <div
              className="hero-button"
              onClick={() => this.props.history.push("/join")}
            >
              Play Now!
            </div>
          </div>
          <div
            className={
              register
                ? "modal-container show-modal"
                : "modal-container hide-modal"
            }
          >
            <Register regFn={this.registerToggle} logFn={this.loginToggle} />
          </div>
          <div
            className={
              login
                ? "modal-container show-modal"
                : "modal-container hide-modal"
            }
          >
            <Login logFn={this.loginToggle} regFn={this.registerToggle} />
          </div>
        </div>
        <Leaderboard />
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
)(Home);
