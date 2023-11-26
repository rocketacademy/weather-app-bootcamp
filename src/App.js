import React, { useState } from "react";
import "./App.css";
import { getWeather } from "./utils";
import { Weather } from "./components/Weather";

const App = () => {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({
    city: "",
    weatherInfo: "",
    temp: "",
    feelsLike: "",
    humidity: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(cityName).then((weatherData) => {
      setWeather({
        city: weatherData.name,
        weatherInfo: weatherData.weather[0],
        temp: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
      });
    });
  };
  console.log(weather);

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a city"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
          />
          <button type="submit">Get weather</button>
        </form>
        <Weather weatherResult={weather} />
      </header>
    </div>
  );
};

export default App;
