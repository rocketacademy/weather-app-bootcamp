import axios from "axios";

const APIKEY = "0ef8f50d14aee0ab81ad9bef14aa0d56";
const resultLimit = 3;

export const getLatLon = (cityName) => {
    return new Promise((res, rej) => {
        res(
            axios
                .get(
                    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${3}&appid=${APIKEY}`
                )
                .then((res) => {
                    if (res.data.length === 0)
                        throw new Error("Couldn't find results");

                    return {
                        lat: res.data[0].lat,
                        lon: res.data[0].lon,
                        name: `${res.data[0].name}, ${res.data[0].country}`,
                    };
                })
                .catch((err) => {
                    if (err) throw new Error("Error in getLatLon");
                })
        );
    });
};

export const getWeatherData = ({ lat, lon }) => {
    return new Promise((res, rej) => {
        res(
            axios
                .get(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=0ef8f50d14aee0ab81ad9bef14aa0d56&units=metric`
                )
                .then((response) => {
                    console.log(response);
                    return {
                        current: response.data.current, // obj
                        daily: response.data.daily, //array
                        hourly: response.data.hourly, // array
                    };
                })
                .catch((err) => {
                    if (err) throw new Error("Error in getWeatherData");
                })
        );
    });
};
