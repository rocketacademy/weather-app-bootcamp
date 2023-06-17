import React from "react";
import logo from "./logo.png";
import "./App.css";
// import WeatherApp from "./Components/WeatherApp";
import FunctionalWeatherApp from "./Components/FunctionalWeatherApp";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <WeatherApp /> */}
          <FunctionalWeatherApp />
        </header>
      </div>
    );
  }
}

export default App;
