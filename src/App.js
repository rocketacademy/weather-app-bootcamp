import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: " ",
      weatherData: [],
    };
  }

  handleChange = (e) => {
    const inputValue = e.target.value;
    this.setState({ input: inputValue });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.input}&limit=1&appid=eef9de0fc5fbc3bc3b3a376f4414d5f3`
      )
      // City geo data is in response.data[0]
      // Arrow functions with no curly braces return value after arrow
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=eef9de0fc5fbc3bc3b3a376f4414d5f3&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        this.setState({
          weatherData: [...this.state.weatherData, weatherData],
        });
      });
  };

  render() {
    return (
      <div className="App">
        <h1>Welcome to my weather app 🤠</h1>
        <p>
          Please type in any city's name into the input field below and click
          "submit" to get the weather info 😉
        </p>

        <form>
          <input
            className="input-field"
            type="text"
            placeholder="enter the city name"
            value={this.state.input}
            onChange={this.handleChange}
          ></input>
          <input
            className="button"
            type="submit"
            value="submit"
            onClick={this.handleSubmit}
          ></input>
        </form>

        {this.state.weatherData &&
          this.state.weatherData.length > 0 &&
          this.state.weatherData.map((location) => (
            <div key={location.name}>
              <h2>Current weather in {location.name}:</h2>
              <img
                src={`https://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`}
                alt="icon"
              />
              <p>{location.weather[0].description}</p>

              <p>Temperature: {Math.floor(location.main.temp)} °C</p>
              <p>Feels like: {Math.floor(location.main.feels_like)} °C</p>
              <p>Wind speed: {Math.floor(location.wind.speed)} m/sec</p>
            </div>
          ))}
      </div>
    );
  }
}

export default App;
