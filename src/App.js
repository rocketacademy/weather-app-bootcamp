import React from "react";
import logo from "./logo.png";
import "./App.css";
import CallApi from "./components/CallApi";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
            <CallApi />
          </p>
        </header>
      </div>
    );
  }
}

export default App;
