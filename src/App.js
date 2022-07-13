import React from "react";
import weatherforecast from "./weatherforecast.jpg";
import "./App.css";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import BasicTable from "./table.js";
import LinearProgress from "@mui/material/LinearProgress";

const OPEN_WEATHER_API_KEY = "dd19f46b6b6c293ec31ab58c2e86f5c5";

const App = () => {
  const initialState = {
    cityName: "",
    loading: <LinearProgress />,
    currCity: "",
    currTemp: "",
    weatherType: "",
    weatherDesc: "",
    weatherIcon: "",
  };
  const [cityData, setCityData] = React.useState(initialState);

  const handleChange = () => (event) => {
    setCityData({ ...cityData, cityName: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityData.cityName}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      // City geo data is in response.data[0]
      // Arrow functions with no curly braces return value after arrow
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);
        setCityData({ ...initialState, loading: "", currCity:cityData.cityName, currTemp: weatherData.main.temp, weatherType: weatherData.weather[0].main, weatherDesc: weatherData.weather[0].description, weatherIcon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`});
        console.log(cityData.currTemp);
      });
    
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={weatherforecast} className="App-logo" alt="logo" />

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
            <InputLabel>City</InputLabel>
            <FilledInput
              value={cityData.cityName}
              onChange={handleChange("cityName")}
            />
            <FormHelperText>
              Enter a city name to know the current weather condition of the
              city
            </FormHelperText>
          </FormControl>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
        <Box>
          <BasicTable cityData={cityData} />
        </Box>
      </header>
    </div>
  );
};

export default App;
