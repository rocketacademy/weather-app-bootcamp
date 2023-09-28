import React from "react";
import axios from "axios";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInputValue: "",
      currCity: "",
      currCountry: "",
      currTemp: "",
      weatherType: "",
      weatherDesc: "",
    };
  }

  componentDidMount = () => {
    this.handleSubmit();
  };

  handleChange = (e) => {
    this.setState({ cityInputValue: e.target.value });
  };

  handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    const city = this.state.cityInputValue
      ? this.state.cityInputValue
      : "Singapore";

    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      )
      // City geo data is in response.data[0]
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${API_KEY}&units=metric`
        )
      )
      .then((response) => {
        console.log(response);
        const { data: weatherData } = response;
        this.setState({
          // Reset input value after submit
          cityInputValue: "",
          currCity: weatherData.name,
          currCountry: weatherData.sys.country,
          currTemp: weatherData.main.temp,
          weatherType: weatherData.weather[0].main,
          weatherDesc: weatherData.weather[0].description,
          weatherIconCode: weatherData.weather[0].icon,
        });
      });
  };

  render() {
    const weatherInfo = (
      <div className="border-2 border-white rounded-xl p-3 m-3 flex items-center justify-center flex-col bg-slate-600">
        <img
          src={`https://openweathermap.org/img/wn/${this.state.weatherIconCode}@2x.png`}
          alt="weather-icon"
          className="h-20 w-20"
        />
        <p>
          City: {this.state.currCity}, {this.state.currCountry}
        </p>
        <p>Current Temperature: {this.state.currTemp}°C</p>
        <p>
          Current Weather: {this.state.weatherType}, {this.state.weatherDesc}
        </p>
      </div>
    );

    return (
      <div className="App">
        <header className="App-header bg-sky-300">
          <div className="bg-slate-700 p-4 rounded-xl">
            <p className="pb-2">Enter a city name below</p>
            <form onSubmit={this.handleSubmit}>
              <label>
                {"City: "}
                <input
                  className="text-black"
                  type="text"
                  value={this.state.cityInputValue}
                  onChange={this.handleChange}
                />
              </label>
              <br />
            </form>
          </div>
          {weatherInfo}
        </header>
      </div>
    );
  }
}

export default App;
