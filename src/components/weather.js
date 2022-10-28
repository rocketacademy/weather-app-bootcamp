import React from "react";
import axios from "axios";

const OPEN_WEATHER_API_KEY = "3540653b10b634e1bdacc26d27f1e270";

export default class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      cityInputValue: "",
      temp: "",
      weatherType: "",
      weatherDescription: "",
      weatherIcon: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      cityInputValue: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`,
      )
      // City geo data is in response.data[0]
      // Arrow functions with no curly braces return value after arrow
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
        ),
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);
        this.setState({
          cityInputValue: "",
          city: weatherData.name,
          temp: weatherData.main.temp,
          weatherType: weatherData.weather[0].main,
          weatherDescription: weatherData.weather[0].description,
          weatherIcon: weatherData.weather[0].icon,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const weatherInfo = this.state.city ? (
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.weatherIcon}@2x.png`}
          alt="weather-icon"
        />
        <p>Current City: {this.state.city}</p>
        <p>Current Temperature: {this.state.temp}°C</p>
        <p>
          Current Weather: {this.state.weatherType},
          {this.state.weatherDescription}
        </p>
      </div>
    ) : (
      <p>Please enter a city name to get its weather data.</p>
    );

    return (
      <div>
        <h1>Weather</h1>

        <form onSubmit={this.handleSubmit}>
          <label>Country:</label>
          <input
            type="text"
            name="cityInputValue"
            value={this.state.cityInputValue}
            onChange={this.handleChange}
          />
          <input type="submit" value="submit" />
        </form>
        {weatherInfo}
      </div>
    );
  }
}
