import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";

const API_KEY = "0955921db7b8d66f9807f2b386985455";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInput: "",
      currCity: "",
      currTemp: "",
      currFeelsLikeTemp: "",
      currWeather: "",
      currWeatherDescription: "",
      currIconCode: "",
    };
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      cityInput: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      // Use Geocoding API to get lat and long coordinates of city
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInput}&limit=1&appid=${API_KEY}`
      )
      .then((response) => response.data[0])
      // Get current weather data
      .then((geoCoords) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geoCoords.lat}&lon=${geoCoords.lon}&appid=${API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);
        this.setState({
          cityInput: "",
          currCity: weatherData.name,
          currTemp: weatherData.main.temp,
          currFeelsLikeTemp: weatherData.main.feels_like,
          currWeather: weatherData.weather[0].main,
          currWeatherDescription: weatherData.weather[0].description,
          currIconCode: weatherData.weather[0].icon,
        });
      });
  };

  render() {
    const weatherOutput = this.state.currCity ? (
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.currIconCode}@2x.png`}
          alt="Current weather icon"
        />
        <p>City: {this.state.currCity}</p>
        <p>Current Temperature: {this.state.currTemp}</p>
        <p>Feels Like: {this.state.currFeelsLikeTemp}</p>
        <p>
          Current Weather: {this.state.currWeather},{" "}
          {this.state.currWeatherDescription}.
        </p>
      </div>
    ) : (
      <p>Enter a city name to check its weather.</p>
    );
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {weatherOutput}
          <form onSubmit={this.handleSubmit}>
            <label>
              City:
              <input
                type="text"
                value={this.state.cityInput}
                placeholder="E.g. Singapore"
                onChange={this.handleChange}
                required
              />
            </label>
            <input type="submit" value="Check Weather" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
