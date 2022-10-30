import React from "react";
import "./App.css";
import axios from "axios";
import { API_KEY } from "./utilities.js";
import logo from "./logo.png";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      input: "",
    };
  }
  handleFormChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getWeather(this.state.input);
  }

  getWeather(cityInput) {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${API_KEY}`
      )
      .then((response) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric&appid=${API_KEY}`
        )
      )
      .then((response) => {
        this.setState({
          currentCity: response.data.name,
          currentTemp: response.data.main.temp,
          currentWeather: response.data.weather[0].description,
          iconURL: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`,
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br />
          <form
            onChange={(e) => this.handleFormChange(e)}
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <input name="input" />
            <button type="submit" value="submit">
              Submit
            </button>
          </form>
          {this.state.currentWeather ? (
            <p>
              <img src={this.state.iconURL} alt="weather icon" />
              <br />
              Current City: {this.state.currentCity}
              <br />
              Current Weather: {this.state.currentWeather}
              <br />
              Current Temperature: {this.state.currentTemp}ºC
              <br />
            </p>
          ) : (
            <p>Please key in a city to check the weather there.</p>
          )}
        </header>
      </div>
    );
  }
}

export default App;
