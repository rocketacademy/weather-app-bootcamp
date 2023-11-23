import React from "react";
import logo from "./logo.png";
import axios from "axios";
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

  //   axios
  //     .get(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=6a3affea0dc3f2287d470f99deb8e2f2`
  //     )

  //     .then((response) => {
  //       console.log(response);
  //       const weatherData = response.data["weather"];
  //       const temperatureData = response.data["main"];
  //       this.setState({
  //         initialRender: false,
  //         temperature: temperatureData["temp"],
  //         icon: weatherData[0]["icon"],
  //       });
  //     });

  //   axios
  //     .get(
  //       `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=metric&appid=6a3affea0dc3f2287d470f99deb8e2f2`
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

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
          {/* <div className="p-2 m-2">
            <form onSubmit={this.handleSubmit}>
              <p className="p-2 mb-1">Search the city you desire</p>
              <input
                className="m-2 px-2 py-1 text-white rounded-lg"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Enter city name"
              />
              <button className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-lg">
                Submit
              </button>
            </form>
          </div>
          <div>
            {this.state.icon !== "" && (
              <img
                src={`https://openweathermap.org/img/wn/${this.state.icon}.png`}
                alt="weathericon"
              />
            )}
            {!this.state.initialRender && <h3>{this.state.temperature}°C</h3>}
          </div> */}
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
