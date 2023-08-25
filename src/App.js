import { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiKey = "93626214528fef6f03313bd5924d4776";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      console.log(weatherData);
      console.log(weatherData.main.temp);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
      </form>
      {weatherData && (
        <div>
          <h2>Weather for {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C </p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
