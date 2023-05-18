import React, { useState, useEffect } from "react";
import axios from "axios";

function toProperCase(str) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
}

const WeatherData = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (!city) return;

    let OPEN_WEATHER = "0fd25ad9fe1e3a817f64f6efd23b44bd";
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPEN_WEATHER}`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER}&units=metric`
        )
      )
      .then((response) => {
        const { data: weather } = response;
        setWeatherData(weather);
        // console.log(weatherData);
      });
  }, [city]);

  if (!city) {
    return null;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <div>
      <h2>{toProperCase(city)}:</h2>
      <div className="weather-icon">
        <img src={iconUrl} alt="Weather Icon" />
      </div>
      <p>
        It is {weatherData.main.temp.toFixed(0)}°C; feels like{" "}
        {weatherData.main.feels_like.toFixed(0)}°C
      </p>
    </div>
  );
};

export default WeatherData;
