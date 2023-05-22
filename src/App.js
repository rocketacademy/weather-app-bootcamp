import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      cityInputValue: "",
      City: "",
      weatherFeelsLike: null,
      weatherHumidity: null,
      weatherType: "",
      weatherDesc: "",
      weatherIconCode: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ cityInputValue: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
      )
      // City geo data is in response.data[0]
      // Arrow functions with no curly braces return value after arrow
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        this.setState({
          // Reset input value after submit
          cityInputValue: "",
          City: weatherData.name,
          weatherFeelsLike: weatherData.main.feels_like,
          weatherHumidity: weatherData.main.humidity,
          weatherType: weatherData.weather[0].main,
          weatherDesc: weatherData.weather[0].description,
          weatherIconCode: weatherData.weather[0].icon,
        });
      });
  };

  render() {
    const weatherInfo = this.state.City ? (
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.weatherIconCode}@2x.png`}
          alt="weather-icon"
        />
        <p>City: {this.state.City}</p>
        <p>Temperature Feels Like: {this.state.weatherFeelsLike}°C</p>
        <p>Humidity: {this.state.weatherHumidity}%</p>
        <p>
          Weather: {this.state.weatherType}, {this.state.weatherDesc}
        </p>
      </div>
    ) : (
      <p></p>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <form onSubmit={this.handleSubmit}>
              <label>
                City:&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  value={this.state.cityInputValue}
                  onChange={this.handleChange}
                />
              </label>

              <input type="submit" value="Submit" />
            </form>
          </p>
          {weatherInfo}
        </header>
      </div>
    );
  }
}

export default App;
