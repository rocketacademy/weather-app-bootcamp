import React, { useState } from "react";
import logo from "./logo.png";
import "./App.css";
import "./App.css";
import axios from "axios";

const OPEN_WEATHER_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const App = () => {
  const [cityInputValue, setCityInputValue] = useState("");
  const [currCity, setCurrCity] = useState("");
  const [currTemp, setCurrTemp] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [weatherIconCode, setWeatherIconCode] = useState("");
  const handleChange = (event) => {
    setCityInputValue(event.target.value);
    console.log(cityInputValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityInputValue}&limit=1&appid=${OPEN_WEATHER_KEY}`
      )
      // City geo data is in response.data[0]
      // Arrow functions with no curly braces return value after arrow
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);
        console.log(weatherData.data);
        setCurrCity(weatherData.name);
        setCurrTemp(weatherData.main.temp);
        setWeatherType(weatherData.weather[0].main);
        setWeatherDesc(weatherData.weather[0].description);
        setWeatherIconCode(weatherData.weather[0].icon);
        setCityInputValue("");
      });
  };
  //useEffect(() => {}, [cityInputValue]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <div>
            <p>Current City: {currCity}</p>
            <p>Current Temperature: {currTemp}</p>
            <p>
              Current Weather: {weatherType}, {weatherDesc}
            </p>
          </div>
          <div>
            <span>Enter a city</span>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={cityInputValue}
                onChange={handleChange}
              />
              <button type="submit" value="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};
export default App;
