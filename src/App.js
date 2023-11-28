import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const [cityName, setCityName] = useState("");
  const API_KEY = "7c52b0b346e3515a9d1950f5fd508f09";
  const handleSubmit = (event) => {
    event.preventDefault();
    //call axios
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${API_KEY}`
      )
      .then((response) => response.data[0])
      .then((geoData) => {
        setCityName(geoData.name);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${geoData.lat}&lon=${geoData.lon}&appid=${API_KEY}`
          )
          .then((response) => {
            setData(response.data.list[0].main);

            console.log(response.data.list[0].main);

            //pass this object to app for display
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  return (
    <>
      <div></div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Enter a city name </label>
        <input
          type="search"
          name="search"
          id="search"
          onChange={handleChange}
          value={input}
        />
        <button type="submit">Show Weather</button>
      </form>

      <div className="card">
        {/* Follow the weather app instructions on the gitbook to implement this exercise */}
        <h2>City: {cityName}</h2>
        <p>Temp: {Math.round(data.temp / 10)} °C</p>
        <p>Feels Like: {Math.round(data.feels_like / 10)} °C</p>
        <p>Min: {Math.round(data.temp_min / 10)} °C</p>
        <p>Max: {Math.round(data.temp_max / 10)} °C</p>
        <p>Humidity: {data.humidity}%</p>
      </div>
    </>
  );
}
export default App;
