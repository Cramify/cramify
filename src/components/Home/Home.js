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
      leaderboard: []
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
    this.setState({
      register: !this.state.register
    });
    document.getElementById("register-input").focus();
  };

  loginToggle = () => {
    this.setState({
      login: !this.state.login
    });
    document.getElementById("login-input").focus();
  };

  logout = () => {
    axios.post("/auth/logout");
    this.props.updateUser({});
  };

  render() {
    const { register, login } = this.state;
    // const props = useSpring({ opacity: 1, from: { opacity: 0 } })

    return (
      <div className="home">
        <div className="triangle-container">
          <div className="big-triangle" />
        </div>
        <div className="header">
          <Link to="/">
            <h1>Cramify</h1>
          </Link>
          <div>
            {this.props.user.id ? (
              <>
                <div onClick={() => this.props.history.push("/dashboard")}>
                  Dashboard
                </div>
                <div onClick={() => this.logout()}>Logout</div>
              </>
            ) : (
              <>
                <div onClick={() => this.registerToggle()}>Register</div>
                <div onClick={() => this.loginToggle()}>Login</div>
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
