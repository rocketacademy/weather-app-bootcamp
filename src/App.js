import React from 'react';
import logo from './logo.png';
import axios from 'axios';
import './App.css';
import { OPEN_WEATHER_API_KEY } from './constants.js';
import {
  Button,
  TableContainer,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper
} from '@mui/material';

// const envVariables = process.env;
// const { OPEN_WEATHER_API_KEY } = envVariables;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInputValue: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => response.data[0])
      .then((geoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        this.setState({
          currTemp: response.data.main.temp,
          currFeelsLike: response.data.main.feels_like,
          currWeather: response.data.weather[0].description,
          currWeatherIcon: response.data.weather[0].icon,
          currCity: response.data.name
        });
        // console.log(response);
      });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityInputValue}&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => {
        this.setState({
          dateTime: response.data.list[0].dt,
          forecastTemp: response.data.list[0].main.temp,
          forecastFeelsLike: response.data.list[0].main.feels_like,
          forecastWeather: response.data.list[0].weather[0].description,
          forecastList: response.data.list
        });
        console.log(this.state.forecastList);
      });

    // .then((response) => {
    //   console.log(response.data.list);
    // });
  };

  handleFormChange(e) {
    this.setState({
      cityInputValue: e.target.value.replace(/[^a-z]/gi, '')
    });
  }

  render() {
    // console.log(this.state.forecastList);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <form onSubmit={(e) => this.handleSubmit(e)}>
            {!this.state.currCity && (
              <div>
                <p>Enter the city name:</p>
                <TextField
                  id="outlined-required"
                  label="Country/City Name"
                  type="text"
                  name="name"
                  value={this.state.cityInputValue}
                  onChange={(e) => this.handleFormChange(e)}
                />
                <p></p>
                <Button className="btn" variant="outlined">
                  Enter
                </Button>
              </div>
            )}

            {!this.state.currCity && (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date/Time</TableCell>
                      <TableCell>Temperature</TableCell>
                      <TableCell>Feels Like</TableCell>
                      <TableCell>Weather</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.forecastList.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {data.dt}
                        </TableCell>
                        <TableCell align="right">{data.main.temp}</TableCell>
                        <TableCell align="right">{data.main.feels_like}</TableCell>
                        <TableCell align="right">{data.main.weather[0].description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {this.state.currCity && (
              <div>
                <img
                  className="icon"
                  src={`https://openweathermap.org/img/wn/${this.state.currWeatherIcon}@2x.png`}
                  alt="icon"></img>
                <div>{this.state.currWeather}</div>
                You have searched for {this.state.currCity}'s current weather!
                <div style={{ color: 'red' }}>{this.state.currTemp}°C</div>
                <div style={{ fontSize: 'medium' }}>(feels like {this.state.currFeelsLike}°C)</div>
              </div>
            )}
          </form>
        </header>
      </div>
    );
  }
}

export default App;
