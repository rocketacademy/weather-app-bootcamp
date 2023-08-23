import React, { useState } from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("");
  const [currCity, setCurrCity] = useState("");
  const [currTemp, setCurrTemp] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [weatherIconCode, setWeatherIconCode] = useState("");
  const [weatherForecast, setWeatherForecast] = useState([]);

  // async: This keyword is used to indicate that the function will contain asynchronous operations. Asynchronous operations are tasks that might take some time to complete, such as fetching data from an API. By using async, you can use the await keyword inside the function to pause the execution of the function until a promise is resolved, without blocking the whole application. This is helpful for tasks like fetching data from an API without freezing the user interface.
  // By including (e) in the parameter list, you're indicating that the function expects an event object to be passed to it when it's called.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // The code inside this block is what will be executed when everything goes well.
    try {
      // axios.get(): This is a function that makes an HTTP GET request to a specified URL. In this case, it's fetching data from the OpenWeatherMap API to retrieve geographic information based on the provided city name.
      //await: This keyword is used to pause the execution of the code until the promise returned by the axios.get() function is resolved. A promise represents an asynchronous operation, and by using await, you're telling the JavaScript engine to wait for the promise to be resolved before continuing with the execution of the next line of code.
      //when the line with await is encountered, the code will pause and wait for the response from the API to be received. Once the response is received, the data will be stored in the geoResponse variable, and then the execution will continue with the rest of the code.
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      //data is array, which is data : [{name: 'Singapore', local_names: {…}, lat: 1.2899175, lon: 103.8519072, country: 'SG'}]
      // geoResponse is the response received from the API call you made using axios.get() to retrieve geographic data.
      const cityGeoData = geoResponse.data[0];
      // This line of code is making another API call to retrieve weather data based on the latitude and longitude coordinates obtained from cityGeoData.
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${API_KEY}&units=metric`
      );

      //in response, the data is in object. {coord: {…}, weather: Array(1), base: 'stations', main: {temp:2.71,....}, visibility: 10000, …}
      //For example, weather: [{id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n'}]
      const weatherData = weatherResponse.data;
      setCity("");
      setCurrCity(weatherData.name);
      setCurrTemp(weatherData.main.temp);
      setWeatherType(weatherData.weather[0].main);
      setWeatherDesc(weatherData.weather[0].description);
      setWeatherIconCode(weatherData.weather[0].icon);

      // Make additional API call for weather forecast
      //forecastResponse: {data: {…}, status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…}, …}
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${API_KEY}&units=metric`
      );
      const forecastData = forecastResponse.data;
      //forecastData.list is array
      //purpose of forecastData.list is to get Date and Time, Temperature, Weather & Sky condition (icon)
      setWeatherForecast(forecastData.list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Please enter a city name to get its weather data.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="item">City: </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              id="item"
            />
            <button type="submit">Check Weather</button>
          </form>
          {/* if currCity has value (condition is true), it will execute the statement. */}
          {currCity && (
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`}
                alt="weather-icon"
              />
              <p>Current City: {currCity}</p>
              <p>Current Temperature: {currTemp}°C</p>
              <p>
                Current Weather: {weatherType}, description:{weatherDesc}
              </p>
            </div>
          )}
          {weatherForecast.length > 0 && (
            <div>
              <h2>Weather Forecast for the Next 5 Days</h2>
              {/* <thead>: This is the table header section, containing the header row of the table. */}
              {/* <th>: This is a table header cell. It defines the column headings for each column in the table. */}
              <table>
                <thead>
                  <tr>
                    <th>Date and Time</th>
                    <th>Temperature (°C)</th>
                    <th>Weather</th>
                    <th>Sky condition</th>
                  </tr>
                </thead>
                {/* <tbody>: This is the table body section, containing the data rows of the table. */}
                {/* {weatherForecast.map((forecast) => (...))}: This is JavaScript code inside JSX. It maps through each item in the weatherForecast array and generates a table row for each forecast data. */}
                <tbody>
                  {weatherForecast.map((forecast) => (
                    <tr key={forecast.dt}>
                      <td>{forecast.dt_txt}</td>
                      <td>{forecast.main.temp}</td>
                      <td>{forecast.weather[0].main}</td>
                      <td>
                        <img
                          src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                          alt="weather-icon"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </header>
      </div>
    </>
  );
}
/*
  function handleSubmit(e) {
    e.preventDefault();
    //make API call to get coordinates, which are lat and lon by insert the name of city
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=`
      )
      //To chain multiple asynchronous function calls with .then, we can return the promises of the subsequent function calls in their .then callbacks
      //data is array, which is data : [{name: 'Singapore', local_names: {…}, lat: 1.2899175, lon: 103.8519072, country: 'SG'}]
      .then((response) => response.data[0])
      // City geo data is in response.data[0], which are lat & lon
      // make API call to get weatherData, which are currTemp, Current Weather, description, weather icon, etc
      //specify `metric` units for the `units` parameter of the API. This will return all temperature values in Celsius instead of Kelvin.
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=&units=metric`
        )
      )
      //in response, the data is in object. {coord: {…}, weather: Array(1), base: 'stations', main: {temp:2.71,....}, visibility: 10000, …}
      //For example, weather: [{id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n'}]
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);
        setCity("");
        setCurrCity(weatherData.name);
        setCurrTemp(weatherData.main.temp);
        setWeatherType(weatherData.weather[0].main);
        setWeatherDesc(weatherData.weather[0].description);
        setWeatherIconCode(weatherData.weather[0].icon);

        // Make additional API call for weather forecast
        return axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=&units=metric`
        );
      })
      .then((response) => {
        const { data: forecastData } = response;
        console.log(forecastData);
        setWeatherForecast(forecastData.list);
      });
  }
//*/
