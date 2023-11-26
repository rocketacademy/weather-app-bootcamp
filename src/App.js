import React from "react";
import logo from "./logo.png";
import "./App.css";
import WeatherInput from "./components/WeatherInput";
import WeatherAPI from "./weatherAPI";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      initialRender: true,
      city: "",
      temperature: 0,
      icon: "",
    };
  }

  handleSubmit = (city) => {
    this.setState({
      city: city,
      initialRender: false,
    });
  };

  handleUpdate = (temperatureData, weatherData) => {
    this.setState({
      initialRender: false,
      temperature: temperatureData["temp"],
      icon: weatherData[0]["icon"],
    });
  };

  handleChange = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  render() {
    console.log(this.state.city);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo rounded-xl" alt="logo" />
          <WeatherInput
            handleSubmit={this.handleSubmit}
            icon={this.state.icon}
            temperature={this.state.temperature}
            initialRender={this.state.initialRender}
          />
          {!this.state.initialRender && (
            <WeatherAPI
              handleUpdate={this.handleUpdate}
              city={this.state.city}
            />
          )}
        </header>
      </div>
    );
  }
}

export default App;
