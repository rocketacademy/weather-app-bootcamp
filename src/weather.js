import React, { useState } from "react";
import axios from "axios";
import {
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
} from "react-vis";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecastInfo, setForecastInfo] = useState(null);

  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchGeo = (cityName) => {
    return axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
      )
      .then((response) => {
        console.log(response.data); // logging for debugging
        if (response.data && response.data.length > 0) {
          return response.data[0];
        } else {
          setError("City not found.");
          return null;
        }
      })
      .catch((err) => {
        setError("Failed to fetch city data.");
        return null;
      });
  };

  const fetchWeather = (lat, lon) => {
    return axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        console.log(response.data); // logging for debugging

        return response.data;
      })
      .catch((err) => {
        setError("Failed to fetch weather data.");
        return null;
      });
  };

  const fetchForecast = (lat, lon) => {
    return axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        console.log(response.data); // logging for debugging
        return response.data;
      })
      .catch((err) => {
        setError("Failed to fetch forecast data.");
        return null;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchGeo(city).then((geoData) => {
      if (geoData) {
        fetchWeather(geoData.lat, geoData.lon).then((weatherData) => {
          if (weatherData) {
            setWeatherInfo({
              temperature: weatherData.main.temp,
              condition: weatherData.weather[0].main,
              city: weatherData.name,
              lat: weatherData.coord.lat,
              lon: weatherData.coord.lon,
            });
          }
        });

        fetchForecast(geoData.lat, geoData.lon).then((forecastData) => {
          if (forecastData) {
            setForecastInfo(forecastData.list); // Set the entire list to forecastInfo
          }
        });
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Check Weather</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherInfo && (
        <div>
          <p>Temperature: {weatherInfo.temperature}°C</p>
          <p>Condition: {weatherInfo.condition}</p>
          <p>City: {weatherInfo.city}</p>
          <p>
            Coordinates - Lat: {weatherInfo.lat} Lon: {weatherInfo.lon}
          </p>
          {forecastInfo && (
            <>
              <div style={{ marginTop: "20px" }}>
                <h3>Temperature Forecast</h3>
                <XYPlot xType="time" width={600} height={300}>
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis title="Time" />
                  <YAxis title="Temperature (°C)" />
                  <LineSeries
                    data={forecastInfo.map((item) => ({
                      x: item.dt * 1000,
                      y: item.main.temp,
                    }))}
                  />
                </XYPlot>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Temperature (°C)</th>
                    <th>Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {forecastInfo.map((forecast, index) => (
                    <tr key={index}>
                      <td>{new Date(forecast.dt * 1000).toLocaleString()}</td>
                      <td>{forecast.main.temp}</td>
                      <td>{forecast.weather[0].main}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Weather;
