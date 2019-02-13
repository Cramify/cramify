import React, {Component} from "react";
import Register from "./Register";
import Login from "./Login";
import './Home.scss'

export default class Home extends Component {
  state = {
    register: true,
    login: false
  }

  registerToggle = () => {
    console.log('hit')
    this.setState({
      register: !this.state.register
    })
  }

  loginToggle = () => {
    console.log('hit')
    console.log(this.state.login)
    this.setState({
      login: !this.state.login
    })
  }



  render() {
    const {register, login} = this.state;
    return (
      <div className='home'>
        <div className='big-triangle'></div>
        <div className='header'>
            <h1>Cramify</h1>
            <div>
              <div onClick={() => this.registerToggle()}>Register</div>
              <div onClick={() => this.loginToggle()}>Login</div>
            </div>
        </div>
        <div className='hero'>
          <div className='hook'>
            <h2>Want to study some great coding material? You are at the right place my friends. :)</h2>
            <div>Play Now!</div>
          </div>
          {register ? <Register regFn={this.registerToggle}/> : null}
          {login ? <Login logFn={this.loginToggle}/> : null}
        </div>
      </div>
    );
  }
}
