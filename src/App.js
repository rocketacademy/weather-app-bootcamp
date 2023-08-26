import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const api = {
  key: "fc76fdb0995b5aa504d0607ab074c672",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [iconUrl, setIconUrl] = useState("");
  const [forecast, setForecast] = useState([]);

  const search = async (evt) => {
    if (evt.key === "Enter") {
      try {
        const res = await axios.get(
          `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
        );

        // get the forecast
        const resForecast = await axios.get(
          `${api.base}forecast?q=${query}&units=metric&appid=${api.key}`
        );

        setWeather(res.data);
        const iconCode = res.data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        setIconUrl(iconUrl);
        setQuery("");
        setForecast(resForecast.data.list);
        console.log(res.data);
        console.log(resForecast.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  // Function to transform forecast data for recharts
  const formatForecastData = (forecastData) => {
    return forecastData.map((item) => ({
      name: new Date(item.dt * 1000).toLocaleDateString(),
      temperature: item.main.temp,
    }));
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search City & Press Enter..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="weather-icon">
                <img src={iconUrl} alt="Weather icon" />
              </div>
            </div>
            {forecast.length > 0 && (
              <div className="forecast-box">
                <h2>5-Day Forecast</h2>
                <LineChart
                  width={600}
                  height={300}
                  data={formatForecastData(forecast)}
                >
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#8884d8"
                  />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 40]} />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
