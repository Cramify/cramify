import React from "react";
import "./Header.scss";

export default function Header(props) {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="logo">
          <h1>Cramify</h1>
        </div>
        <div className="buttons">
          <div onClick={() => this.props.history.push("/join")}>Join Room</div>
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
}
