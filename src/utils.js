import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

export const getWeather = (cityInput) => {
  return (
    axios
      // retrieve lat and lon using city name
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
        // console.log(response);
        // to assign variables from objects
        const { data: weatherInfo } = response;
        console.log(weatherInfo);
        return weatherInfo;
      })
  );
};
