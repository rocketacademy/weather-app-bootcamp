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
      .then((response) => response.data[0])
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
            <input type="submit" value="Submit" />
          </form>
          <div>
            <h2>
              Location: {this.state.currentCityName}
              <br></br>
              Weather: {this.state.weatherType}, {this.state.weatherDescription}
              <br></br>
              <img
                src={`http://openweathermap.org/img/wn/${this.state.weatherIconCode}@2x.png`}
                alt="Weather Icon"
              />
            </h2>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
