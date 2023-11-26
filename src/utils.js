import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

export const getWeather = (cityInput) => {
  return axios

    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${apiKey}`
    )
    .then((res) => res.data[0])
    .then((geoData) =>
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&appid=${apiKey}&units=metric`
      )
    )
    .then((response) => {
      const { data: weatherInfo } = response; // to assign variables from objects
      return weatherInfo;
    });
};

export const getForecast = (lat, lon) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${apiKey}&units=metric`
    )
    .then((response) => {
      const {
        data: { list: forecastedInfo }, // to assign variables from objects
      } = response;
      return forecastedInfo;
    });
};
