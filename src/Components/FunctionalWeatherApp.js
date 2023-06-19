import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const APIKey = process.env.REACT_APP_API_KEY;

export default function FunctionalWeatherApp() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [forecast, setForecast] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=${1}&appid=${APIKey}`
      )

      .then((geoData) => {
        const currentWeatherData = axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geoData.data[0].lat}&lon=${geoData.data[0].lon}&units=metric&appid=${APIKey}`
        );
        const forecastWeatherData = axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${geoData.data[0].lat}&lon=${geoData.data[0].lon}&units=metric&appid=${APIKey}`
        );
        return Promise.all([currentWeatherData, forecastWeatherData]);
      })

      .then(([currentWeatherData, forecastWeatherData]) => {
        const { data: currentWeather } = currentWeatherData; // currentWeatherData.data is assigned to currentWeather var using destructring
        console.log(currentWeather);

        setInput("");
        setCity(currentWeather.name);
        setTemperature(currentWeather.main.temp);
        setWeather(currentWeather.weather[0].main);
        setWeatherDescription(currentWeather.weather[0].description);
        setWeatherIcon(currentWeather.weather[0].icon);
        setForecast([...forecastWeatherData.data.list]);
      });
  };

  useEffect(() => {
    console.log(forecast);
  });

  const toggleForecastTable = () => {
    setShowTable((s) => !s);
  };

  const toggleForecastChart = () => {
    setShowChart((c) => !c);
  };

  const forecastTable = (
    <>
      {
        <Table variant="dark">
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature</th>
              <th colSpan={3}>Weather</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((hourlyForecast) => (
              <tr key={hourlyForecast.dt_txt}>
                <td>{hourlyForecast.dt_txt}</td>
                <td>{hourlyForecast.main.temp}°C </td>
                <td>{hourlyForecast.weather[0].main}</td>
                <td>{hourlyForecast.weather[0].description}</td>
                <td>
                  <img
                    src={`https://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}@2x.png`}
                    alt="weather"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      }
    </>
  );

  const forecastChart = (
    <LineChart
      width={1500}
      height={400}
      data={forecast.map((hourlyForecast) => ({
        dt_txt: hourlyForecast.dt_txt,
        temperature: hourlyForecast.main.temp,
      }))}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="dt_txt" />
      <YAxis />
      <Tooltip
        content={({ payload, label, active }) => {
          if (active) {
            return (
              <div className="custom-tooltip">
                <p className="label">{`Timestamp: ${label}`}</p>
                <p className="desc">{`Temperature: ${payload[0].value}°C`}</p>
              </div>
            );
          }
          return null;
        }}
      />
    </LineChart>
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          value={input}
          placeholder="Enter a city name"
          onChange={handleChange}
        />
        <button>Check weather</button>
      </form>

      {weatherIcon !== "" && (
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt="weather"
        />
      )}
      {city !== "" && <h2>City: {city}</h2>}
      {temperature !== "" && <h2>Current Temperature: {temperature}°C</h2>}
      {weather !== "" && weatherDescription !== "" && (
        <h2>
          Current Weather: {weather}, {weatherDescription}
        </h2>
      )}

      <br />
      {forecast && forecast.length > 0 && (
        <>
          <h2>5-day 3-hourly forecast</h2>
          <button onClick={toggleForecastTable} disabled={showChart}>
            Toggle Table
          </button>
          <button onClick={toggleForecastChart} disabled={showTable}>
            Toggle Chart
          </button>
          {showTable && forecastTable}
          {showChart && forecastChart}
        </>
      )}
    </div>
  );
}
