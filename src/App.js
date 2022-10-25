import React from "react";
import logo from "./logo.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { OPEN_WEATHER_API_KEY } from "./constants";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInputValue: "",
      currCity: "",
      currTemp: "",
      weatherType: "",
      weatherDesc: "",
      weatherIconCode: "",
      dataLoaded: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => {
        console.log(response.data[0]);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
          )
          .then((response) => {
            console.log(response.data);
            const { data: weatherData } = response;
            this.setState({
              currCity: weatherData.name,
              currTemp: weatherData.main.temp,
              weatherType: weatherData.weather[0].main,
              weatherDesc: weatherData.weather[0].description,
              weatherIconCode: weatherData.weather[0].icon,
              dataLoaded: true,
            });
          });
        // Write remaining logic once we understand response format
      });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.dataLoaded && (
            <img src={logo} className="App-logo" alt="logo" />
          )}

          {this.state.dataLoaded && (
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${this.state.weatherIconCode}@2x.png`}
                alt="icon"
              ></img>
              <p>Current City: {this.state.currCity}</p>
              <p>Current Temperature: {this.state.currTemp} °C</p>
              <p>
                Current Weather: {this.state.weatherType},{" "}
                {this.state.weatherDesc}
              </p>
            </div>
          )}
          <Form>
            <Form.Group controlId="formBasicCity">
              <Form.Control
                type="text"
                placeholder="Enter name of city"
                name="cityInputValue"
                required
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="success" type="submit" onClick={this.handleSubmit}>
              Check Weather
            </Button>
          </Form>
        </header>
      </div>
    );
  }
}

export default App;
