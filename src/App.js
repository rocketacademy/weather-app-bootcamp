import React, { useState } from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ResponseTable } from "./components/ResponseTable";

const apiKey = "316b8e0d7d98bcbfbf34d257a153f17a";

export default function App() {
  const [search, setSearch] = useState(false);
  const [currentCity, setCurrentCity] = useState("");
  const [currentIcon, setCurrentIcon] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [forecastCity, setForecastCity] = useState("");
  const [forecastList, setForecastList] = useState([]);
  const [forecastStatus, setForecastStatus] = useState("");

  let iconURL = "http://openweathermap.org/img/wn/" + currentIcon + ".png";
  let apiWeatherURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    input +
    "&limit=1&appid=" +
    apiKey +
    "&units=metric";
  let apiForecastURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    input +
    "&limit=1&appid=" +
    apiKey +
    "&units=metric";

  const handleChange = (e) => {
    setInput(e.target.value);
    setSearch(false);
    setCurrentStatus("");
    setForecastStatus("");
    setError("");
  };

  const handleClick = () => {
    setSearch(true);
    axios
      .get(apiWeatherURL)
      .then((response) => {
        console.log(response);
        setCurrentStatus(response.status);
        setCurrentCity(response.data.name);
        setCurrentIcon(response.data.weather[0].icon);
        setCurrentDescription(response.data.weather[0].description);
      })
      .catch((error) => {
        console.log(error);
        setError("Country / City not found. Please try again!");
      });

    axios
      .get(apiForecastURL)
      .then((response) => {
        console.log(response);
        setForecastStatus(response.status);
        setForecastCity(response.data.city.name);
        setForecastList(response.data.list);
      })
      .catch((error) => {
        console.log(error);
        setError("Country / City not found. Please try again!");
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Enter the country / city below to check the weather for that city</p>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Country / City Name"
            variant="outlined"
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleClick}>
            Search
          </Button>
        </Box>

        {search && currentStatus === 200 && forecastStatus === 200 ? (
          <ResponseTable
            city={currentCity}
            icon={iconURL}
            description={currentDescription}
            forecastCity={forecastCity}
            forecastList={forecastList}
          />
        ) : (
          <p>{error}</p>
        )}
      </header>
    </div>
  );
}
