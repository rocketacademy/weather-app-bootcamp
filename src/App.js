import React from "react";
import "./App.css";
import axios from "axios";
// import { Data } from "./Components/Data";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      showResults: false,
      name: "",
      temp: 0,
      humidity: 0,
      feels_like: 0,
      weather: "",
      icon: "",
      forecast: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = this.state.search;
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => response.data[0])
      .then((data) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const weatherData = response.data;
        this.setState({
          search: "",
          name: weatherData.name,
          showResults: true,
          temp: weatherData.main.temp,
          humidity: weatherData.main.humidity,
          feels_like: weatherData.main.feels_like,
          weather: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
        });
        return axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );
      })
      .then((response) => {
        this.setState({
          forecast: response.data,
        });
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      showResults: false,
    });
  };

  render() {
    const { showResults, temp, humidity, feels_like, weather, name } =
      this.state;

    let result;
    if (showResults) {
      result = (
        <div className="data">
          <h1>{temp.toFixed(1)}°C</h1>
          <div className="data-secondary">
            <p>{name}</p>
            <p>Humidity: {humidity}%</p>
            <p>Real Feel: {feels_like.toFixed(1)}°C</p>
            <p>Weather: {weather}</p>
          </div>
        </div>
      );
    } else {
      result = (
        <div className="input-field">
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              type="text"
              name="search"
              placeholder="input place here"
              autoComplete="off"
              value={this.state.search}
            />
          </form>
        </div>
      );
    }
    return (
      <div className="App">
        <h1 className="title-top">Weather</h1>
        <div className="header">
          {result}
          {showResults && (
            <button name="reset" onClick={this.handleClick}>
              Back
            </button>
          )}
        </div>
        <h1 className="title-bottom">Nowcast</h1>
      </div>
    );
  }
}

export default App;
