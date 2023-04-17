import axios from "axios";

const APIKEY = process.env.REACT_APP_API_KEY;
const resultLimit = 5;

export const getLatLon = (cityName) => {
    return new Promise((res, rej) => {
        res(
            axios
                .get(
                    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${resultLimit}&appid=${APIKEY}`
                )
                .then((res) => {
                    if (res.data.length === 0)
                        throw new Error("Couldn't find results");

                    console.log(res);

                    let resultList = res.data.map((item, index) => {
                        let combinedName;
                        if (res.data[index].state == null) {
                            combinedName = `${res.data[index].name}, ${res.data[index].country}`;
                        } else {
                            combinedName = `${res.data[index].name}, ${res.data[index].state}, ${res.data[index].country}`;
                        }

                        return {
                            lat: res.data[index].lat,
                            lon: res.data[index].lon,
                            name: combinedName,
                        };
                    });

                    return resultList;

                    // return {
                    //     lat: res.data[0].lat,
                    //     lon: res.data[0].lon,
                    //     name: `${res.data[0].name}, ${res.data[0].country}`,
                    // };
                })
        );
    });
};

export const getWeatherData = ({ lat, lon }) => {
    return new Promise((res, rej) => {
        res(
            axios
                .get(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`
                )
                .then((response) => {
                    console.log(response);
                    return {
                        current: response.data.current, // obj
                        daily: response.data.daily, //array
                        hourly: response.data.hourly, // array
                    };
                })
        );
    });
};
