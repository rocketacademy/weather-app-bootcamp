import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";

const App = () => {
  const OPEN_WEATHER_API_KEY = "eb82eab0c5c82add0e00d8745b510848";

  const [cityName, setCityName] = useState("");
  const [currCity, setCurrCity] = useState("");
  const [currTemp, setCurrTemp] = useState("");
  const [currWeather, setCurrWeather] = useState("");
  const [currWeatherDes, setCurrWeatherDes] = useState("");
  const [currWeatherIcon, setCurrWeatherIcon] = useState("");
  const [checked, setChecked] = useState(false);
  const [dataForecast, setDataForecast] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    setCityName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${OPEN_WEATHER_API_KEY}`,
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
        ),
      )
      .then((response) => {
        const { data: weatherData } = response;
        // console.log(weatherData);
        setCurrCity(weatherData.name);
        setCurrTemp(weatherData.main.temp);
        setCurrWeather(weatherData.weather[0].main);
        setCurrWeatherDes(weatherData.weather[0].description);
        setCurrWeatherIcon(weatherData.weather[0].icon);
      });
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${OPEN_WEATHER_API_KEY}`,
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
        ),
      )
      .then((response) => {
        const { data: forecastData } = response;
        // console.log(forecastData);
        setDataForecast(forecastData);
      });
    setChecked(true);
  };

  let result;

  const forecast = () =>
    (result = dataForecast.list.map((data) => (
      <p>
        <img
          src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          alt="weather-icon"
        />
        <br />
        Weather: {data.weather[0].main}
        <br />
        Date: {data.dt_txt}
        <br />
        <br />
      </p>
    )));

  if (Object.keys(dataForecast).length > 0) {
    forecast();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <label>City: </label>
          <input
            type="text"
            id="city"
            name="name"
            onChange={handleChange}
          ></input>
          <br></br>
          <button type="button" onClick={handleSubmit}>
            Check Weather
          </button>
        </p>
        {!checked && <p>Please enter a city name to get its weather data</p>}
        {checked && (
          <div>
            <img
              src={`http://openweathermap.org/img/w/${currWeatherIcon}.png`}
              alt="weather-icon"
            />
            <p>Current City: {currCity}</p>
            <p>Current Temp: {currTemp} °C</p>
            <p>
              Current Weather: {currWeather}, {currWeatherDes}
            </p>
            <br />
            <br />
            <p>Forecast for the next 5 days</p>
            <div className="container">{result}</div>
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
