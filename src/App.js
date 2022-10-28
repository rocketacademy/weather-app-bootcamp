import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInputValue: "",
      city: "",
      weather: {},
      weatherIcon: "",
      coordinates: { lat: "", lon: "" },
      forecastWeather: [],
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
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=b19b32221939a66675b01f5452af913c`
      )
      // City geo data is in response.data[0]
      // Arrow functions with no curly braces return value after arrow
      .then((response) => {
        this.setState({
          coordinates: { lat: response.data[0].lat, lon: response.data[0].lon },
        });
        return response.data[0];
      })
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=b19b32221939a66675b01f5452af913c&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(this.state.coordinates);
        this.setState({
          city: this.state.cityInputValue,
          weather: weatherData.main,
          weatherIcon: weatherData.weather[0],
          cityInputValue: "",
        });
      })
      .then(() =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.coordinates.lat}&lon=${this.state.coordinates.lon}&appid=b19b32221939a66675b01f5452af913c&units=metric`
        )
      )
      .then((response) => {
        console.log(response.data.list);
        this.setState({ forecastWeather: response.data.list });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(this.state.forecastWeather);
    const forecastedWeather = this.state.forecastWeather;
    const weatherInfo = (
      <div>
        <div>
          <h4>{this.state.city}</h4>
          <img
            src={`http://openweathermap.org/img/wn/${this.state.weatherIcon.icon}@2x.png`}
            alt={`${this.state.weatherIcon.main}`}
          />
          <p>Today's Weather: {this.state.weatherIcon.main}</p>
          <p>Current Temperature: {this.state.weather.temp}</p>
          <p>Feels Like: {this.state.weather.feels_like}</p>
          <p>Low: {this.state.weather.temp_min}</p>
          <p>High: {this.state.weather.temp_max}</p>
          <p>Humidity: {this.state.weather.humidity}</p>
        </div>
        <h4>5 Day Forecast</h4>
        {forecastedWeather.map((forecasts) => (
          <table>
            <tr>
              <th>Date</th>
              <th>Temp_Min</th>
              <th>Temp_Max</th>
              <th>Weather</th>
            </tr>
            <tr>
              <td>{forecasts.dt_txt}</td>
              <td>{forecasts.main.temp_min}</td>
              <td>{forecasts.main.temp_max}</td>
              <td>{forecasts.weather[0].description}</td>
            </tr>
          </table>
        ))}
      </div>
    );

    let showWeather;
    if (this.state.city === "") {
      showWeather = <div>Enter city name to see weather data.</div>;
    } else {
      showWeather = <div>{weatherInfo}</div>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <form onSubmit={this.handleSubmit}>
              <label>City:</label>
              <input
                type="text"
                value={this.state.cityInputValue}
                onChange={this.handleChange}
              />
              <input type="submit" value="Submit" />
            </form>
          </p>
          {showWeather}
        </header>
      </div>
    );
  }
}

export default App;
