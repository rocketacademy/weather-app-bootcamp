import { React, useState, useEffect } from "react";
import axios from "axios";

export default function API(props) {
  let API_KEY = "f172ea019d836bfc52d8c59bfb32fa77";
  let submitted_city = props.submitted_city;
  const [city_temperature, setCityTemperature] = useState(0);
  const [city_weather, setCityWeather] = useState([]);
  const [weatherimage, setWeatherImage] = useState("");
  const [valid_city_entered, setValidCityEntered] = useState(false);

  console.log("AAAAAAAAA prop passed down auccessfully", submitted_city);

  const handleResponse = (response) => {
    console.log("response received");
  };

  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${submitted_city}&APPID=${API_KEY}`
    )

    .then((response) => {
      console.log(response.data);
      setCityTemperature(response.data.main.temp);
      setCityWeather(
        response.data.weather[0].main +
          ", " +
          response.data.weather[0].description
      );
      setWeatherImage(response.data.weather[0].icon);
      setValidCityEntered(true);
    })

    .catch((error) => {
      setValidCityEntered(false);
      console.log(error);
    });

  return valid_city_entered ? (
    <>
      <img
        src={"https://openweathermap.org/img/wn/" + weatherimage + "@2x.png"}
        alt="Icon of the weather"
      />
      <p>Current City: {submitted_city}</p>
      <p>
        Current Temperature: {(city_temperature - 273.15).toFixed(2) + "°C"}
      </p>
      <p>Current Weather: {city_weather}</p>
    </>
  ) : (
    console.log("You put in an invalid city, dumbass.")
  );
}
