import React, { useState } from "react";
import "./App.css";
import { getWeather, getForecast } from "./utils";
import { Weather } from "./components/Weather";
import { Forecast } from "./components/Forecast";

const App = () => {
  const [cityName, setCityName] = useState("");
  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);

  const [weather, setWeather] = useState({
    city: "",
    weatherInfo: "",
    temp: "",
    maxTemp: "",
    minTemp: "",
    humidity: "",
    lat: "",
    lon: "",
  });
  const [forecastedWeather, setForecastedWeather] = useState([]);

  const handleSubmit = (e) => {
    if (cityName === "") return;
    e.preventDefault();
    getWeather(cityName).then((weatherData) => {
      setWeather({
        city: weatherData.name,
        weatherInfo: weatherData.weather[0],
        temp: weatherData.main.temp,
        maxTemp: weatherData.main.temp_max,
        minTemp: weatherData.main.temp_min,
        humidity: weatherData.main.humidity,
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon,
      });
    });
    setCityName("");
    setIsWeatherDataLoaded(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    getForecast(weather.lat, weather.lon).then((forecastedData) => {
      setForecastedWeather(forecastedData);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit} name="weather-form">
          <input
            type="text"
            placeholder="Enter a city"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
          />
          <button type="submit">Get Weather</button>
        </form>
        {isWeatherDataLoaded && (
          <>
            <Weather weatherResult={weather} />
            <button onClick={handleClick}>Get Forecast</button>
          </>
        )}

        {forecastedWeather && <Forecast forecastedResult={forecastedWeather} />}
      </header>
    </div>
  );
};

export default App;
