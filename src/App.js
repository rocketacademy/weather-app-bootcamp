import React from "react";
import "./App.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
const OPEN_WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      temp: "",
      feels_like: "",
      weatherType: "",
      weatherDesc: "",
      weatherIconCode: "",
      forecast: [],
    };
  }

  handleChange = (e) => {
    this.setState({ city: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    // Make parallel API requests for weather and forecast
    const weatherRequest = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    );
    const forecastRequest = axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    );

    // Use Promise.all to wait for both requests to complete
    Promise.all([weatherRequest, forecastRequest])
      .then((responses) => {
        const weatherData = responses[0].data;
        const forecastData = responses[1].data;

        // Update the state with weather and forecast data
        this.setState({
          city: weatherData.name,
          temp: weatherData.main.temp,
          weatherType: weatherData.weather[0].main,
          weatherDesc: weatherData.weather[0].description,
          weatherIconCode: weatherData.weather[0].icon,
          feels_like: weatherData.main.feels_like,
          forecast: forecastData.list.slice(0, 5),
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    const { forecast } = this.state;
    const weatherReport = this.state.city ? (
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.weatherIconCode}@2x.png`}
          alt="weather-icon"
          class="weather-logo"
        />
        <h2>Weather Information</h2>
        <p>
          The temperature now is {this.state.temp}°C but it feels like{" "}
          {this.state.feels_like}°C
        </p>
        <p>
          {" "}
          It's: {this.state.weatherType}, {this.state.weatherDesc}
        </p>
      </div>
    ) : (
      <p> Please enter a city to view the weather!</p>
    );

    const dateTimeOptions = {
      weekday: "narrow",
      month: "short",
      day: "numeric",
      hour12: true,
    };

    const forecastTable = this.state.forecast ? (
      <div>
        <Table style={{ color: "White", backgroundColor: "black" }}>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Temperature (°C)</th>
              <th scope="col"> Feels like (°C)</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((data) => (
              <tr key={data.dt}>
                <td>
                  {new Date(data.dt_txt).toLocaleTimeString(
                    "en-GB",
                    dateTimeOptions
                  )}
                </td>
                <td>{data.main.temp}</td>
                <td> {data.main.feels_like}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    ) : (
      ""
    );

    return (
      <div className="App">
        <header className="App-header">
          {weatherReport}
          {forecastTable}
          <form onSubmit={this.handleFormSubmit}>
            <label>Enter city name: </label>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.city}
            />
            <button type="submit"> Get weather </button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
