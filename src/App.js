import React from "react";
import axios from "axios";
import "./App.css";

const OPEN_WEATHER_API_KEY = "58b6f653523bf7394917009e6410008c";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formInput: "",
      city: "",
      weatherInfo: "",
      weatherDesc: "",
      temperature: "",
      hourlyForecast: [],
      forecastTiming: [],
    };
  }

  handleChange = (event) => {
    this.setState({ formInput: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let rawData = [];
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.formInput}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => {
        rawData = response.data[0];
        console.log(rawData);
        return rawData;
      })

      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        this.setState({
          city: this.state.formInput,
          weatherInfo: response.data.weather[0].main,
          weatherDesc: response.data.weather[0].description,
          temperature: response.data.main.temp,
          formInput: "",
        });
        return rawData;
      })
      .then((cityForecastData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${cityForecastData.lat}&lon=${cityForecastData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const forecast3Timings = response.data.list.slice(0, 3);

        const temp = forecast3Timings.map((item) => item.main.temp);
        const timing = forecast3Timings.map((item) => item.dt_txt);
        this.setState({
          hourlyForecast: temp,
          forecastTiming: timing,
        });
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.formInput}
              onChange={this.handleChange}
            />
            <input type="submit" value="Check" />
          </form>
          {this.state.city !== "" && <p>City: {this.state.city}</p>}
          {this.state.temperature !== "" && (
            <p>Temperature: {this.state.temperature} °C</p>
          )}
          <p>
            {this.state.weatherInfo}-{this.state.weatherDesc}
          </p>
          <table>
            <thead>
              <tr className="timing">
                {this.state.forecastTiming.map((timing, index) => (
                  <th key={index}>{timing}</th>
                ))}
              </tr>
              <tr className="temp">
                {this.state.hourlyForecast.map((temp, index) => (
                  <th key={index}>{temp}°C</th>
                ))}
              </tr>
            </thead>
          </table>
        </header>
      </div>
    );
  }
}

export default App;
