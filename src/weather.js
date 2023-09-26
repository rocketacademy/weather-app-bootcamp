import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState(null);

  const fetchGeo = (cityName) => {
    return axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=dcc39005b83b036266947a70c256ee38`
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
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dcc39005b83b036266947a70c256ee38&units=metric`
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
        </div>
      )}
    </div>
  );
}

export default Weather;
