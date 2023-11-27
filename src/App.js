import React from "react";
import axios from "axios";
import "./App.css";

const OPEN_WEATHER_API_KEY = "58b6f653523bf7394917009e6410008c";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formInput: "",
      city: "",
      weatherInfo: "",
      weatherDesc: "",
      temperature: "",
    };
  }

  handleChange = (event) => {
    this.setState({ formInput: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.formInput}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        this.setState({
          city: this.state.formInput,
          weatherInfo: response.data.weather[0].main,
          weatherDesc: response.data.weather[0].description,
          temperature: response.data.main.temp,
          formInput: "",
        });
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.formInput}
              onChange={this.handleChange}
            />
            <input type="submit" value="Check" />
          </form>
          {this.state.city !== "" && <p>City: {this.state.city}</p>}
          {this.state.temperature !== "" && (
            <p>Temperature: {this.state.temperature} celcius</p>
          )}
          <p>{this.state.weatherInfo}</p>
          <p>{this.state.weatherDesc}</p>
        </header>
      </div>
    );
  }
}

export default App;
