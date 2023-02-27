import React from "react";
import logo from "./logo.png";
import "./App.css";
import WeatherForm from "./Components/Form";
import axios from "axios";

const APIKey = "113f386d2f3e5ae883e2913c7e032cb5";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      error: null,
      weatherRetrieved: false,
      weatherData: {},
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ city: "" });
    this.getCurrentWeather();
  };

  getCurrentWeather = () => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.city}&limit=5&appid=${APIKey}`
      )
      .then((res) => res.data[0])
      .catch((err) => {
        this.setState({
          error: err,
        });
      })
      .then((geoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&units=metric&appid=${APIKey}`
        )
      )
      .then((res) => {
        this.setState({
          weatherRetrieved: true,
          weatherData: res,
        });
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  };

  render() {
    let weatherInfo = "";
    const { error, weatherRetrieved, weatherData } = this.state;
    if (error) {
      weatherInfo = <div>Error: {error.message}</div>;
    } else if (!weatherRetrieved) {
      weatherInfo = <div>Getting weather...</div>;
    } else {
      let location = `${weatherData.data.name} ${weatherData.data.sys.country}`;
      let maxTemp = weatherData.data.main.temp_max;
      let minTemp = weatherData.data.main.temp_min;
      let feelTemp = weatherData.data.main.feels_like;
      let description = weatherData.data.weather[0].description;
      let icon = weatherData.data.weather[0].icon;
      weatherInfo = (
        <div>
          <h4>Current weather in {location}</h4>
          <p>{new Date().toGMTString()}</p>
          <p>
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather-icon"
            />
            {description}
          </p>
          <p>
            {minTemp}°C to {maxTemp}°C, feels like {feelTemp}°C
          </p>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <WeatherForm
            city={this.state.city}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          <div id="current-weather">
            {this.state.weatherRetrieved && weatherInfo}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
