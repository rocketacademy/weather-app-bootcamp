import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";

const OPEN_WEATHER_API_KEY = "793ee5981e4746abc3c17239f25d747e";

const defaultValues = {
  cityName: "",
  currentCityName: "",
  weatherType: "",
  weatherDescription: "",
  weatherIconCode: "11n",
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultValues;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({
      cityName: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityName}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => {
        console.log(response.data[0]);
        return response.data[0];
      })
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);
        console.log(weatherData.name);
        this.setState({
          cityName: "",
          currentCityName: weatherData.name,
          weatherType: weatherData.weather[0].main,
          weatherDescription: weatherData.weather[0].description,
          weatherIconCode: weatherData.weather[0].icon,
        });
      });
  };

  render() {
    const weatherInfo = this.state.currentCityName ? (
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.weatherIconCode}@2x.png`}
          alt="weather-icon"
        />
        <p>Current City: {this.state.currentCityName}</p>
        <p>
          Current Weather: {this.state.weatherType},{" "}
          {this.state.weatherDescription}
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
              City Name:
              <input
                type="text"
                value={this.state.cityName}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
            <input type="submit" value="Check Weather" />
          </form>
          {weatherInfo}
        </header>
      </div>
    );
  }
}

export default App;
