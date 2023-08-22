import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState(null);
  const [temp, setTemp] = useState(null);
  const [weatherMain, setWeatherMain] = useState(null);
  const [weatherDesc, setWeatherDesc] = useState(null);

  const [icon, setIcon] = useState(null);
  const [numGridDivs, setNumGridDivs] = useState(0);

  const handleInputChange = (event) => {
    setInputCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
      )
      .then((response) => response.data[0])
      .then((cityData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;

        setCity(weatherData.name);
        setTemp(weatherData.main.temp);
        setWeatherMain(weatherData.weather[0].main);
        setWeatherDesc(weatherData.weather[0].description);
        setIcon(weatherData.weather[0].icon);
      });
  };

  const iconUrl = icon
    ? `https://openweathermap.org/img/wn/${icon}@2x.png`
    : null;

  const gridSize = 100;

  const updateGridDivs = () => {
    const divsWidth = Math.ceil(window.innerWidth / gridSize);
    const divsHeight = Math.ceil(window.innerHeight / gridSize);
    const totalDivs = divsWidth * divsHeight;

    setNumGridDivs(totalDivs);
  };

  const getGridCellsPerRow = () => {
    return Math.floor(window.innerWidth / gridSize);
  };

  const applyDiagonalPattern = useCallback(() => {
    const gridItems = document.querySelectorAll(".grid-item");
    const cellsPerRow = getGridCellsPerRow();

    gridItems.forEach((item, index) => {
      const columnIndex = index % cellsPerRow;

      if (columnIndex % 2 === 1) {
        item.style.transform = "translateY(calc(50% + 8px))";
      } else {
        item.style.transform = "translateY(0)";
      }
    });
  }, []);

  useEffect(() => {
    updateGridDivs();
    applyDiagonalPattern();
  });

  useEffect(() => {
    const handleResize = () => {
      updateGridDivs();
      applyDiagonalPattern();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [applyDiagonalPattern]);

  return (
    <div className="App">
      <div className="grid">
        {Array.from({ length: numGridDivs }).map((_, i) => (
          <div
            key={i}
            className="grid-item"
            style={{
              backgroundImage: `url(${iconUrl})`,
            }}
          ></div>
        ))}
      </div>
      <header className="App-header">
        <div id="App-container">
          <form onSubmit={handleSubmit}>
            <label>
              Enter city name:
              <br />
              <input
                type="text"
                value={inputCity}
                onChange={handleInputChange}
                placeholder="City name"
              />
            </label>
            <br />
            <button type="submit">Check Weather</button>
          </form>

          {city && (
            <>
              <p>
                Weather in {city}: {weatherMain}
              </p>
              <p>Details: {weatherDesc}</p>
              <p>Temperature: {temp} &deg;C</p>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
