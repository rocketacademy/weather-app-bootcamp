import React from "react";
import axios from "axios";
import { OPEN_WEATHER_API_KEY } from "./weather_API";

export default class CallApi extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      cityName: "",
      weatherIcon: "",
      weather: "",
      temperature: "",
    };
  }

  handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    this.setState({ input: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.input}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
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
          input: "",
          cityName: weatherData.name,
          weatherIcon: weatherData.weather[0].icon,
          weather: weatherData.weather[0].main,
          temperature: weatherData.main.temp,
        });
      });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.input}
          placeholder="Enter Country"
          onChange={(e) => this.handleChange(e)}
        />
        <input
          type="submit"
          value="submit"
          onClick={(e) => this.handleSubmit(e)}
        />
        {this.state.cityName !== "" ? (
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${this.state.weatherIcon}@2x.png`}
              alt="weather-icon"
            />
            <h1>City: {this.state.cityName}</h1>
            <h2>Weather: {this.state.weather}</h2>
            <h2>Temperature: {this.state.temperature}</h2>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
