import React from "react";
import axios from "axios";
const APIKey = "4f9a82ac7e88dfa268609326f66cc2f7";

export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      city: "",
      temperature: "",
      weather: "",
      weatherDescription: "",
      weatherIcon: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${
          this.state.input
        }&limit=${1}&appid=${APIKey}`
      )

      .then((data) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data.data[0].lat}&lon=${data.data[0].lon}&units=metric&appid=${APIKey}`
        )
      )

      .then((data) => {
        const { data: weatherData } = data; // data.data is assigned to weatherData var using destructring
        console.log(weatherData);

        this.setState({
          input: "",
          city: weatherData.name,
          temperature: weatherData.main.temp,
          weather: weatherData.weather[0].main,
          weatherDescription: weatherData.weather[0].description,
          weatherIcon: weatherData.weather[0].icon,
        });
      });
  };

  render() {
    const {
      input,
      city,
      temperature,
      weather,
      weatherDescription,
      weatherIcon,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="input"
            value={input}
            placeholder="Enter a input name"
            onChange={this.handleChange}
          />
          <button>Check weather</button>
          <br />
          {weatherIcon !== "" && (
            <img
              src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt="weather"
            />
          )}
          {city !== "" && <h2>City: {city}</h2>}
          {temperature !== "" && <h2>Temperature: {temperature}°C</h2>}
          {weather !== "" && weatherDescription !== "" && (
            <h2>
              Weather: {weather}, {weatherDescription}
            </h2>
          )}
        </form>
      </div>
    );
  }
}
