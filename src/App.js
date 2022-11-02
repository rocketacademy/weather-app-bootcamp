import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import Graph from "./Graph"

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userInput: "",
      currCity: "",
      currTemp: "",
      weatherType: "",
      weatherDesc: "",
      weatherIconCode: "",
      forecast: false,
      forecastData: [],
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleChange = (e) => {
    this.setState({userInput: e.target.value})
  }

  handleCheck = () => {
    this.setState({forecast: !this.state.forecast})
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
        this.setState({
          userInput: "",
          currCity: weatherData.name,
          currTemp: weatherData.main.temp,
          weatherType: weatherData.weather[0].main,
          weatherIconCode: weatherData.weather[0].icon,
          weatherDesc: weatherData.weather[0].description,
        });
        if (this.state.forecast) {
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
            )
            .then((response) => {
              const {data: forecastData} = response;
              console.log(forecastData)
              this.setState({
                forecast: false,
                forecastData: forecastData.list
              })
            });
        }
      });
  }

  render() {
    const weatherInfo = (
      <div className="weatherInfo center-div">
        <img
          src={`http://openweathermap.org/img/wn/${this.state.weatherIconCode}@2x.png`}
          alt="weatherIcon"
        />
        <label>Current City : {this.state.currCity}</label>
        <label>Current Temperature : {this.state.currTemp}</label>
        <label>Current Weather : {this.state.weatherType}, {this.state.weatherDesc}</label>
      </div>
    );
    const forecast = (
      <div className="center-div">
        <h3>24Hrs Forecast</h3>
        <div className="grid center-div">
          {this.state.forecastData.map((x, i) => (
            <div className="center-div pod" style={{fontSize: "12px"}}>
              <h5>{`${Math.floor((i*3 + 3)/24)}days and ${(i*3 + 3)%24} hrs Later`}</h5>
              <img
                src={`http://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`}
                alt="weatherIcon"
              />
              <label> Temperature : {x.main.temp}</label>
              <label>
                Weather : {x.weather[0].main},{" "}
                {x.weather[0].description}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Weather App</p>
          <form
            onSubmit={this.handleSubmit}
            className="center-div"
          >
            <label>
              City:
              <input type="text"
                value={this.state.userInput}
                onChange={this.handleChange}
                style={{ margin: "6px" }}/>
                <input type="checkbox" checked={this.state.forecast} onChange={this.handleCheck}/>
                Forecast?
            </label>
            <input type="submit" value="CLICK ME" style={{ margin: "6px" }} />
          </form>
          {this.state.currCity && weatherInfo}
          {this.state.currCity && forecast}
          {this.state.currCity && <Graph data={this.state.forecastData}/>}
        </header>
      </div>
    );
  }
}

export default App;
