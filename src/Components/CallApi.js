import React from "react";
import axios from 'axios';


class CallApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInputValue: "",
      currCity: "",
      currTemp: "",
      weatherType: "",
      weatherDesc: "",
      weatherIconCode: "",
    };
  }
  // componentDidMount() {
  //   axios.get().then((data) => {
  //     console.log(data);
  //   })
  // }
  // componentDidUpdate() {

  // }
  handleChange = (event) => {
    this.setState({ cityInputValue: event.target.value});
  }

  handleSubmit = (event) => {
    console.log(process.env.REACT_APP_OPEN_WEATHER_API_KEY)
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
      )
      // City geo data is in response.data[0]
      // Arrow functions with no curly braces return value after arrow
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);
        this.setState({
          cityInputValue: "",
          currCity: weatherData.name,
          currTemp: weatherData.main.temp,
          weatherType: weatherData.weather[0].main,
          weatherDesc: weatherData.weather[0].description,
          weatherIconCode: weatherData.weather[0].icon,
        });
      });
  };
  render() {
    const weatherInfo = this.state.currCity ? (
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.weatherIconCode}@2x.png`}
          alt="weather-icon"
        />
        <p>Current City: {this.state.currCity}</p>
        <p>Current Temperature: {this.state.currTemp}°C</p>
        <p>
          Current Weather: {this.state.weatherType}, {this.state.weatherDesc}
        </p>
      </div>
    ) : (
      <p>Please enter a city name to get its weather data.</p>
    );

    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <label>
              {"City: "}
              <input
                type="text"
                value={this.state.cityInputValue}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <input type="submit" value="Check Weather" />
          </form>
          {weatherInfo}
        </header>
      </div>
    );
  }
}
export default CallApi;