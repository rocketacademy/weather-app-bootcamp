import React from "react";
import logo from "./logo.png";
import "./App.css";
import WeatherApp from "./Components/WeatherApp";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <WeatherApp />
        </header>
      </div>
    );
  }
}

export default App;
