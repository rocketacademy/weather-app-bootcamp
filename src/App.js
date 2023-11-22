import React from "react";
import "./App.css";
import axios from "axios";
import WeatherData from "./WeatherData";
import Forecast from "./Forecast";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "", weatherData: [], forecastData: {} };
  }

  handleClose = () => {
    this.setState({ forecastData: {} });
  };

  handleShowForecast = (i) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.weatherData[i].lat}&lon=${this.state.weatherData[i].lon}&units=metric&appid=ff74b95fa5c1b30eacf349b5b558101a`
      )
      .then((response) => response.data)
      .then((data) => this.setState({ forecastData: data }));
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.input}&appid=ff74b95fa5c1b30eacf349b5b558101a`
      )
      .then((response) => response.data[0])
      .then((data) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&units=metric&appid=ff74b95fa5c1b30eacf349b5b558101a`
        )
      )
      .then((response) => response.data)
      .then((data) =>
        this.setState({
          input: "",
          weatherData: [
            ...this.state.weatherData,
            {
              city: this.state.input,
              weather: data.weather[0],
              temp: data.main.temp,
              lat: data.coord.lat,
              lon: data.coord.lon,
            },
          ],
        })
      );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Forecast
            forecastData={this.state.forecastData}
            handleClose={this.handleClose}
          />
          <form onSubmit={this.handleSubmit}>
            <input
              type="input"
              value={this.state.input}
              onChange={this.handleChange}
              placeholder="Please type city name."
            />
            <input type="submit" value="Weather" />
          </form>
          <WeatherData
            weatherData={this.state.weatherData}
            handleShowForecast={this.handleShowForecast}
          />
        </header>
      </div>
    );
  }
}

export default App;
