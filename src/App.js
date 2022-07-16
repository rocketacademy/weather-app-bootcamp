import axios from "axios";
import React from "react";
import logo from "./logo.png";
import "./App.css";

class App extends React.Component {
  // constructor to define current state
  constructor(props) {
    super(props);
    this.state = {
      nameOfCityInput: "",
      nameOfCity: "",
      temperature: "",
      weatherDesc: "",
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.weatherInfo = this.weatherInfo.bind(this);
  }

  //handleChange (which will listen for name of city)
  handleChange = (event) => {
    this.setState({ nameOfCityInput: event.target.value });
  };

  // handleSubmit (which wil make the API call for the long/lat and then therefore the weather data)
  handleSubmit = (event) => {
    event.prevenDefault();
    axios
      .get(
        //why do you use the template literals here
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.nameOfCityInput}&limit=5&appid=35daf72ff0bf5c098bc4ac9bb7f66ac5`
      )
      .then((res) => res.data[0]) // why do you need this step if there's only one object returned
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=35daf72ff0bf5c098bc4ac9bb7f66ac5`
        )
      )
      .then((res) => {
        const { data: weatherData } = res; // need to look up 'data' notation
        this.setState({
          // Reset input value after submit
          nameOfCityInput: "",
          nameOfCity: weatherData.name,
          temperature: weatherData.main.temp,
          // weatherType: weatherData.weather[0].main,
          weatherDesc: weatherData.weather[0].description,
          // weatherIconCode: weatherData.weather[0].icon,
        });
      });
  };

  // weatherInfo (why does this need to be in the render)
  // const weatherInfo = [nameofCity] ? [condition if they typed the right thing] : [condition if they typed a non-city name]

  render() {
    const weatherInfo = this.state.nameOfCity ? (
      <div>
        <p>Current city: {this.state.nameOfCity} </p>
        <p>Current temperature: {this.state.temperature} </p>
        <p>Current weather: {this.state.weatherDesc}</p>
      </div>
    ) : (
      <p> Please enter the name of a city. </p>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.nameOfCityInput}
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
          </form>
          {weatherInfo}
        </header>
      </div>
    );
  }
}

export default App;
