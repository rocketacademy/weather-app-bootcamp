import React from "react";
import "./App.css";
import axios from "axios";
import { API_KEY } from "./utilities.js";
import logo from "./logo.png";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      input: "",
    };
  }
  handleFormChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getWeather(this.state.input);
  }

  getWeather(cityInput) {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${API_KEY}`
      )
      .then((response) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric&appid=${API_KEY}`
        )
      )
      .then((response) => {
        console.log(response);
        this.setState({
          currentCity: response.data.name,
          currentTemp: response.data.main.temp,
          currentWeather: response.data.weather[0].description,
          iconURL: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`,
        });
        return axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&units=metric&appid=${API_KEY}`
        );
      })
      .then((response) => {
        console.log(response);
        this.setState({
          dayListArray: response.data.list,
        });
        console.log(response.data.list);
        console.log(this.state.dayListArray);
      });
  }

  render() {
    const listingTableArray = this.state.dayListArray
      ? this.state.dayListArray.map((entry, index) => {
          let date = new Date(entry.dt * 1000).toLocaleDateString("en-US");
          let time = new Date(entry.dt * 1000).toLocaleTimeString("en-US");
          let icon = `http://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`;
          return (
            <TableRow key={index}>
              <TableCell align="left">
                {date}, {time}
              </TableCell>
              <TableCell align="left">
                <img src={icon} alt="weather icon" />
              </TableCell>
              <TableCell align="left">{entry.main.temp}</TableCell>
              <TableCell align="left">{entry.weather[0].description}</TableCell>
            </TableRow>
          );
        })
      : null;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br />
          <form
            onChange={(e) => this.handleFormChange(e)}
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <input name="input" />
            <button type="submit" value="submit">
              Submit
            </button>
          </form>
          {this.state.currentWeather ? (
            <p>
              <img src={this.state.iconURL} alt="weather icon" />
              <br />
              Current City: {this.state.currentCity}
              <br />
              Current Weather: {this.state.currentWeather}
              <br />
              Current Temperature: {this.state.currentTemp}ºC
              <br />
            </p>
          ) : (
            <p>Please key in a city to check the weather there.</p>
          )}
          {this.state.dayListArray ? (
            <div>
              <TableContainer component={Paper} sx={{ margin: "20px" }}>
                <Table sx={{ minWidth: 450 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={12}
                        sx={{ padding: "20px" }}
                      >
                        <h2>5-Day Hourly Weather Forecast</h2>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Date/Time</TableCell>
                      <TableCell align="left">Icon</TableCell>
                      <TableCell align="left">Description</TableCell>
                      <TableCell align="left">Temperature&nbsp;(ºC)</TableCell>
                    </TableRow>
                  </TableHead>
                  {listingTableArray}
                </Table>
              </TableContainer>
            </div>
          ) : null}
        </header>
      </div>
    );
  }
}

export default App;
