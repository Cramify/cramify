import React, { Component } from "react";
import Register from "./Register";
import Login from "./Login";
import "./Home.scss";
// import {useTransition, animated, useSpring} from 'react-spring';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      register: false,
      login: false
    };
  }

  registerToggle = () => {
    this.setState({
      register: !this.state.register
    });
  };

  loginToggle = () => {
    this.setState({
      login: !this.state.login
    });
  };

  render() {
    const { register, login } = this.state;
    // const props = useSpring({ opacity: 1, from: { opacity: 0 } })

    return (
      <div className="home">
        <div className='triangle-container'>
          <div className="big-triangle" />
        </div>
        <div className="header">
          <h1>Cramify</h1>
          <div>
            <div onClick={() => this.registerToggle()}>Register</div>
            <div onClick={() => this.loginToggle()}>Login</div>
          </div>
        </div>
        <div className="hero">
          <div className="hook">
            <h2>
              Want to study some great coding material? You are at the right
              place my friends. :)
            </h2>
            <div className="hero-button" onClick={() => this.props.history.push('/join')}>
              Play Now!
            </div>
          </div>
          {register ? (
            <Register regFn={this.registerToggle} logFn={this.loginToggle} />
          ) : null}
          {login ? (
            <Login logFn={this.loginToggle} regFn={this.registerToggle} />
          ) : null}
        </div>
      </div>
    );
  }
}
