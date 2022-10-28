import React from "react";
import logo from "./logo.png";
import "./App.css";
import { TextField, Button, Grid, Typography } from "@mui/material";
import axios from "axios";

export default function App() {
  const [city, setCity] = React.useState("");
  const [weatherData, setWeatherData] = React.useState({
    temperature: "",
    weatherIcon: "",
  });

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.React_App_weather_api}`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${process.env.React_App_weather_api}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);
        setWeatherData((prevWeatherData) => {
          return {
            ...prevWeatherData,
            temperature: weatherData.main.temp,
            weatherIcon: weatherData.weather[0].icon,
          };
        });
      });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <img src={logo} className="App-logo" alt="logo" />
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <form sx={{ mt: 2 }} noValidate autoComplete="off">
          <TextField
            label="City"
            variant="outlined"
            onChange={handleChange}
            value={city}
          />
        </form>
      </Grid>
      <Button
        sx={{ color: "black", border: "black" }}
        onClick={handleSubmit}
        variant="outlined"
      >
        Check Weather
      </Button>
      {weatherData.temperature && (
        <Grid item xs={6} sx={{ mt: 2 }}>
          <img
            src={
              "https://openweathermap.org/img/w/" +
              weatherData.weatherIcon +
              ".png"
            }
            alt="weather pic"
          />
          <Typography variant="h6">
            {weatherData.temperature} &#8451;
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
