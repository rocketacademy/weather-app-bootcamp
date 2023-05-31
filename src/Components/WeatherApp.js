import React from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
const APIKey = process.env.REACT_APP_API_KEY;

export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      city: "",
      temperature: "",
      weather: "",
      weatherDescription: "",
      weatherIcon: "",
      forecast: [],
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${
          this.state.input
        }&limit=${1}&appid=${APIKey}`
      )

      .then((geoData) => {
        const currentWeatherData = axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geoData.data[0].lat}&lon=${geoData.data[0].lon}&units=metric&appid=${APIKey}`
        );
        const forecastWeatherData = axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${geoData.data[0].lat}&lon=${geoData.data[0].lon}&units=metric&appid=${APIKey}`
        );
        return Promise.all([currentWeatherData, forecastWeatherData]);
      })

      .then(([currentWeatherData, forecastWeatherData]) => {
        const { data: currentWeather } = currentWeatherData; // currentWeatherData.data is assigned to currentWeather var using destructring
        console.log(currentWeather);

        this.setState({
          input: "",
          city: currentWeather.name,
          temperature: currentWeather.main.temp,
          weather: currentWeather.weather[0].main,
          weatherDescription: currentWeather.weather[0].description,
          weatherIcon: currentWeather.weather[0].icon,
          forecast: [...forecastWeatherData.data.list],
        });
      });
  };

  componentDidUpdate() {
    console.log(this.state.forecast);
  }

  render() {
    const {
      input,
      city,
      temperature,
      weather,
      weatherDescription,
      weatherIcon,
      forecast,
    } = this.state;

    const forecastTable = forecast && forecast.length > 0 && (
      <>
        <h2>5-day 3-hourly forecast</h2>
        <Table variant="dark">
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature</th>
              <th colSpan={3}>Weather</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((hourlyForecast) => (
              <tr key={hourlyForecast.dt_txt}>
                <td>{hourlyForecast.dt_txt}</td>
                <td>{hourlyForecast.main.temp}°C </td>
                <td> {hourlyForecast.weather[0].main}</td>
                <td>{hourlyForecast.weather[0].description}</td>
                <td>
                  <img
                    src={`https://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}@2x.png`}
                    alt="weather"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="input"
            value={input}
            placeholder="Enter a input name"
            onChange={this.handleChange}
          />
          <button>Check weather</button>
        </form>

        {weatherIcon !== "" && (
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt="weather"
          />
        )}
        {city !== "" && <h2>City: {city}</h2>}
        {temperature !== "" && <h2>Current Temperature: {temperature}°C</h2>}
        {weather !== "" && weatherDescription !== "" && (
          <h2>
            Current Weather: {weather}, {weatherDescription}
          </h2>
        )}

        <br />
        {forecastTable}
      </div>
    );
  }
}
