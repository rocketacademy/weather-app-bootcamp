import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      userInput: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    this.setState({userInput: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.userInput}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Weather App</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                type="text"
                value={this.state.userInput}
                onChange={this.handleChange}
              />
            </label>
            <input type='submit' value='CLICK ME'/>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
