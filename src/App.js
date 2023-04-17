import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import moment from "moment";

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
      currIcon: "",
      currMaxTemp: "",
      currMinTemp: "",
      currDate: "",
      day2Date: "",
      day2MaxTemp: "",
      day2MinTemp: "",
      day2Icon: "",
      day3Date: "",
      day3MaxTemp: "",
      day3MinTemp: "",
      day3Icon: "",
    };
  }

  // Use Geocoding API to get lat & lon of city
  getGeoCoords = () => {
    return axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInput}&limit=1&appid=${API_KEY}`
      )
      .then((response) => response.data[0]);
  };

  // Get today's weather
  getWeatherData = () => {
    this.getGeoCoords()
      .then((geoCoords) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geoCoords.lat}&lon=${geoCoords.lon}&appid=${API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);
        this.setState({
          currCity: weatherData.name,
          currTemp: weatherData.main.temp,
          currFeelsLikeTemp: weatherData.main.feels_like,
          currWeatherDescription: weatherData.weather[0].description,
          currIcon: weatherData.weather[0].icon,
        });
      });
  };

  // Get forecast for next 3 days
  getWeatherForecast = () => {
    this.getGeoCoords()
      .then((geoCoords) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${geoCoords.lat}&lon=${geoCoords.lon}&appid=${API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherForecast } = response;
        console.log(weatherForecast);
        this.setState({
          currDate: weatherForecast.list[0].dt_txt,
          currIcon: weatherForecast.list[0].weather[0].icon,
          currMaxTemp: weatherForecast.list[0].main.temp_max,
          currMinTemp: weatherForecast.list[0].main.temp_min,
          day2Date: weatherForecast.list[3].dt_txt,
          day2Icon: weatherForecast.list[3].weather[0].icon,
          day2MaxTemp: weatherForecast.list[6].main.temp_max,
          day2MinTemp: weatherForecast.list[10].main.temp_min,
          day3Date: weatherForecast.list[11].dt_txt,
          day3Icon: weatherForecast.list[14].weather[0].icon,
          day3MaxTemp: weatherForecast.list[13].main.temp_max,
          day3MinTemp: weatherForecast.list[11].main.temp_min,
        });
      });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      cityInput: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      cityInput: "",
    });
    this.getWeatherData();
    this.getWeatherForecast();
  };

  render() {
    let day2Day = moment(this.state.day2Date).format("dddd").toUpperCase();

    let day3Day = moment(this.state.day3Date).format("dddd").toUpperCase();

    const weatherOutput = this.state.currCity ? (
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.currIcon}@2x.png`}
          alt="Current weather icon"
        />
        <p>City: {this.state.currCity}</p>
        <p>Current Temperature: {this.state.currTemp}°C</p>
        <p>Feels Like: {this.state.currFeelsLikeTemp}°C</p>
        <p>
          Current Weather: {this.state.currWeather},{" "}
          {this.state.currWeatherDescription}.
        </p>
      </div>
    ) : (
      <p>Enter a city name to check its weather.</p>
    );

    const forecastOutput = this.state.currCity ? (
      <div>
        <div>
          <p>TODAY</p>
          <img
            src={`https://openweathermap.org/img/wn/${this.state.currIcon}@2x.png`}
            alt="Today's weather icon"
          />
          <p>
            {this.state.currMinTemp}°C/{this.state.currMaxTemp}°C
          </p>
        </div>
        <div>
          <p>{day2Day}</p>
          <img
            src={`https://openweathermap.org/img/wn/${this.state.day2Icon}@2x.png`}
            alt="Tomorrow's weather icon"
          />
          <p>
            {this.state.day2MinTemp}°C/{this.state.day2MaxTemp}°C
          </p>
        </div>
        <div>
          <p>{day3Day}</p>
          <img
            src={`https://openweathermap.org/img/wn/${this.state.day3Icon}@2x.png`}
            alt="Day after tomorrow's weather icon"
          />
          <p>
            {this.state.day3MinTemp}°C/{this.state.day3MaxTemp}°C
          </p>
        </div>
      </div>
    ) : null;
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.cityInput}
              placeholder="Enter a city to check the weather. E.g. Singapore"
              onChange={this.handleChange}
              required
            />
            <input type="submit" value="Get Forecast" />
          </form>
          <div>{weatherOutput}</div>
          <div>{forecastOutput}</div>
        </header>
      </div>
    );
  }
}

export default App;
