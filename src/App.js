import React, { Component } from 'react';
import './App.css';
import routes from './routes'

//imported components


class App extends Component {
  render() {
    return (
      <div className="App">
        It's working
        {routes}
      </div>
    );
  }
}

export default App;
