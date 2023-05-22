import React from "react";
import "./App.css";
import axios from "axios";

const OPEN_WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      temp: "",
      feels_like: "",
      weatherType: "",
      weatherDesc: "",
      weatherIconCode: "",
      humidity: "",
      forecast: [],
    };
  }

  handleChange = (e) => {
    this.setState({ city: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.city}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        this.setState({
          city: weatherData.name,
          temp: weatherData.main.temp,
          weatherType: weatherData.weather[0].main,
          weatherDesc: weatherData.weather[0].description,
          weatherIconCode: weatherData.weather[0].icon,
          feels_like: weatherData.main.feels_like,
          humidity: weatherData.main.humidity,
        });
        console.log(weatherData);
      });
  };

  render() {
    const weatherReport = this.state.city ? (
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.weatherIconCode}@2x.png`}
          alt="weather-icon"
          class="weather-logo"
        />
        <h2>Weather Information</h2>
        <p>
          The temperature now is {this.state.temp}°C but it feels like{" "}
          {this.state.feels_like}°C
        </p>
        <p>The humidity now is {this.state.humidity}%</p>
        <p>
          {" "}
          You're experiencing: {this.state.weatherType},{" "}
          {this.state.weatherDesc}
        </p>
      </div>
    ) : (
      <p> Please enter a city to view the weather!</p>
    );

    return (
      <div className="App">
        <header className="App-header">
          {weatherReport}
          <form onSubmit={this.handleFormSubmit}>
            <label>Enter city name: </label>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.city}
            />
            <button type="submit"> Get weather </button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
