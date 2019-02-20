import React, { Component } from "react";
import "./Header.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducer";
import axios from "axios";
import { Link } from 'react-router-dom';

class Header extends Component {
  logout = () => {
    axios.post("/auth/logout");
    this.props.history.push("/");
    this.props.updateUser({});
  };

  render() {
    return (
      <div className="navbar-container">
        <div className="navbar">
            <div className="logo">
          <Link to="/">
              <h1>Cramify</h1>
          </Link>
            </div>
          <div className="buttons">
            <div onClick={() => this.props.history.push("/join")}>
              Join Room
            </div>
            <div onClick={() => this.logout()}>Logout</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { updateUser }
)(withRouter(Header));
