import React from "react";
import "./App.css";
import axios from "axios";
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

class App extends React.Component {
  constructor() {
    super();
    this.state = { city: "", weather: [], forecast: [] };
  }

  getWeather = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${apiKey}`
      )
      .then((response) =>
        this.setState({
          weather: [...this.state.weather, response.data],
        })
      );
    return true;
  };

  getForecast = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${apiKey}`
      )
      .then((response) =>
        this.setState({
          forecast: [...this.state.forecast, response.data],
        })
      );
    return true;
  };

  handleChange = (e) => {
    this.setState({ city: `${e.target.value}` });
  };

  handleSubmitWeather = () => {
    this.getWeather(this.state.city);
  };

  handleSubmitForecast = () => {
    this.getForecast(this.state.city);
  };

  render() {
    const weatherDisplay = this.state.weather.map((obj) => (
      <div key={obj.name}>
        <h1>{obj.name}</h1>
        <img
          src={`https://openweathermap.org/img/wn/${obj.weather[0].icon}.png`}
          alt={obj.weather[0].main}
        />
        <p>{obj.weather[0].description}</p>
      </div>
    ));
    return (
      <div className="App">
        <input
          type="text"
          value={this.state.city}
          placeholder="City"
          onChange={(event) => this.handleChange(event)}
        />
        <input
          type="submit"
          value="Current Weather"
          onClick={this.handleSubmitWeather}
        />
        <input
          type="submit"
          value="Forecast"
          onClick={this.handleSubmitForecast}
        />
        {this.state.weather && this.state.weather.length > 0
          ? weatherDisplay
          : null}
      </div>
    );
  }
}

export default App;
