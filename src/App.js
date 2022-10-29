import React from "react";
import logo from "./logo.png";
import "./App.css";
import Weather from "./components/weather";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Weather />
        </header>
      </div>
    );
  }
}

export default App;
