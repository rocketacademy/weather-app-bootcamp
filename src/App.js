import axios from "axios";
import React from "react";
import logo from "./logo.png";
import "./App.css";

// Hard-coding API keys in code is insecure behaviour and we are only doing this for teaching purposes.
// After we learn backend, we should store all API keys in server-side environment variables.
const OPEN_WEATHER_API_KEY = "d5d8056d01da637f36b63d437684d527";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInputValue: "",
      currCity: "",
      currTemp: "",
      weatherType: "",
      weatherDesc: "",
      weatherIconCode: "",
    };
  }

  handleChange = (event) => {
    this.setState({ cityInputValue: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      // City geo data is in response.data[0]
      // Arrow functions with no curly braces return value after arrow
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        this.setState({
          // Reset input value after submit
          cityInputValue: "",
          currCity: weatherData.name,
          currTemp: weatherData.main.temp,
          weatherType: weatherData.weather[0].main,
          weatherDesc: weatherData.weather[0].description,
          weatherIconCode: weatherData.weather[0].icon,
        });
      });
  };

  render() {
    const weatherInfo = this.state.currCity ? (
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.weatherIconCode}@2x.png`}
          alt="Weather-Icon"
        />
        <p>Current City: {this.state.currCity}</p>
        <p>Current Temperature: {this.state.currTemp}°C</p>
        <p>
          Current Weather: {this.state.weatherType}, {this.state.weatherDesc}
        </p>
      </div>
    ) : (
      <p>Please enter a city name to get its weather data.</p>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.handleSubmit}>
            <label>
              {"City: "}
              <input
                type="text"
                value={this.state.cityInputValue}
                onChange={this.handleChange}
              />
              <br />
              <input type="submit" value="Check Weather" />
            </label>
          </form>
          {weatherInfo}
        </header>
      </div>
    );
  }
}

export default App;
