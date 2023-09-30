import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from 'axios';
import {WeatherReport} from "./Components/WeatherReport";
import {Forecast} from './Components/Forecast';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName:'',
      apiKey: process.env.REACT_APP_API_KEY, 
      weatherData:null,
      forecast:null,
    }
  }

  handleCityChange(event) {
    this.setState({cityName: event.target.value});
   }
  handleSubmit = (event) => {
    event.preventDefault();
    //get weather data for city directly
    //axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&appid=8ed6e9e102813aa79f7bb0c12371a6d7`).then((response)=> {
    //console.log(response);
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityName}&limit=1&appid=${this.state.apiKey}`
    )
      .then((response) => {
        console.log(response);
        const { lat, lon } = response.data[0]
        return [lat, lon]
      }) // return is automatically picked up by .then; is necessary when using {} within .then
      .then(([lat, lon]) =>{
        return Promise.all([axios.get(
                  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.state.apiKey}&units=metric`
                ),
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.state.apiKey}&units=metric`),
      ])}// In addition to the current weather, display a daily forecast, represented by hourly data to the user in tables. 
      )
      .then((results) => {
        const [currentWeather, forecast] = results;
        const { data: weatherData } = currentWeather; // takes all the stuff inside data and assigns it to weatherdata; how does this work
        console.log(forecast);
        this.setState({weatherData:weatherData, forecast:forecast});
      });
  };
//still need to display weather and icon
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form id='input-city-form' onSubmit={this.handleSubmit}>
          <label>Enter a city to check weather:</label>
          <input 
          type='text'
          name='city'
          value={this.state.cityName}
          onChange={(e) => {this.handleCityChange(e)}}
          />
          <br/>
          <input type='submit' value='Submit'/>
          </form>
        <WeatherReport weatherData = {this.state.weatherData}/>
        <Forecast forecast = {this.state.forecast}/>
        </header>
      </div>
    );
  }
}

export default App;

