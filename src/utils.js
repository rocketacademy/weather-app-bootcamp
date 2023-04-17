import axios from "axios";
const API_KEY = "e7c3a9e229130c477fb422e589371c9f";

const getWeatherData = (cityName) => {
  console.log("getWeatherData is being called");
  return axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    )
    .then((response) => response.data[0])
    .then((cityGeoData) => {
      console.log("Waiting for response...");
      return axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${API_KEY}&units=metric`
      );
    })
    .then((response) => {
      console.log("Response received.");
      return {
        weather: response.data.weather[0],
        temp: response.data.main.temp,
      };
    });
};

export { getWeatherData };
