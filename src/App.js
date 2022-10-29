import React from "react";
import axios from "axios";
import logo from "./logo.png";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      error: null,
      value: "", // form input state
      userInput: false,
      city: "",
      weatherType: "",
      weatherDesc: "",
      temperature: 0,
      iconURL: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.value) return; // skip the rest of code if user didn't input
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.value}&limit=1&appid=a696bcddfdec4e5dd92f411d7d4a25d8`
      )
      // City geo data is in response.data[0]
      // Arrow functions with no curly braces return value after arrow
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=a696bcddfdec4e5dd92f411d7d4a25d8&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        this.setState(() => ({
          city: weatherData.name,
          weatherType: weatherData.weather[0].main,
          weatherDesc: weatherData.weather[0].description,
          temperature: weatherData.main.temp,
          iconURL: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
          userInput: true,
          value: "",
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const userInput = this.state.userInput;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <form onSubmit={this.handleSubmit}>
            <label>
              Please enter a city name to get its weather data <br />
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <div>
              <input type="submit" value="Check Weather" />
            </div>
          </form>

          {userInput && (
            <div>
              <img src={this.state.iconURL} alt={this.state.weather} />
              <p>Current City: {this.state.city}</p>
              <p>Current Temperature: {this.state.temperature} °C</p>
              <p>
                Current Weather: {this.state.weatherType},{" "}
                {this.state.weatherDesc}
              </p>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
