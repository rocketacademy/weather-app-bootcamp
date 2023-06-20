import React from "react";
import axios from "axios";
import WeatherGraph from "./WeatherGraph";

const OPEN_WEATHER_API_KEY = "378737ce9be4f903a413cb5bc0ee9740";

export default class CallApi extends React.Component {
  constructor() {
    super();
    this.state = {
      cityInputValue: "",
      weatherData: null,
      hourlyForecast: null,
      dailyForecast: null,
    };
  }

  handleChange = (event) => {
    this.setState({ cityInputValue: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      );
      const cityGeoData = geoResponse.data[0];
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
      );

      const weatherData = weatherResponse.data;
      // updating the state with the newly fetched data
      this.setState({ weatherData });
      console.log(weatherData);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
      );
      const forecastData = forecastResponse.data;
      console.log(forecastData);
      // extract the first 8 items from the array, representing the hourly forecast for the upcoming hours.
      const hourlyForecast = forecastData.list.slice(0, 8);
      // extract the first 5 items from the list array, representing the daily forecast for the upcoming days.
      const dailyForecast = forecastData.list.filter(
        (item, index) => index % 8 === 0
      );
      // updating the state with the newly fetched data
      this.setState({ hourlyForecast, dailyForecast });
    } catch (error) {
      // if there's an error fetching the data, set state variables to null
      console.log(error);
      this.setState({
        weatherData: null,
        hourlyForecast: null,
        dailyForecast: null,
      });
    }
  };

  render() {
    // removes the need to use this.state so many times
    const { weatherData, hourlyForecast, dailyForecast } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.cityInputValue}
            placeholder="City"
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>

        {weatherData ? (
          <div>
            <h2>Current Weather</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Description: {weatherData.weather[0].description}</p>
            {/* Render other weather data properties as needed */}
          </div>
        ) : (
          <p>No weather data available</p>
        )}

        {/* if hourly forecast is non-null, render table */}
        {hourlyForecast && (
          <div>
            <h2>3hr Forecast</h2>

            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Weather</th>
                  <th>Temperature</th>
                </tr>
              </thead>
              <tbody>
                {hourlyForecast.map((forecast) => (
                  <tr key={forecast.dt}>
                    <td>{forecast.dt_txt}</td>
                    <td>{forecast.weather[0].description}</td>
                    <td>{forecast.main.temp}°C</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {dailyForecast && (
          <div>
            {console.log(dailyForecast)}
            <h2>24hr Forecast</h2>

            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Weather</th>
                  <th>Temperature</th>
                </tr>
              </thead>
              <tbody>
                {dailyForecast.map((forecast) => (
                  <tr key={forecast.dt}>
                    <td>{forecast.dt_txt}</td>
                    <td>{forecast.weather[0].description}</td>
                    <td>{forecast.main.temp}°C</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {hourlyForecast && dailyForecast ? (
              <div>
                <WeatherGraph
                  hourlyForecast={hourlyForecast}
                  dailyForecast={dailyForecast}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}
