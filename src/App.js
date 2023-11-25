import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      weather_description: "",
      temperature: "",
      humidity: "",
      error: "", // Add error state
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const APIKey = process.env.REACT_APP_API_KEY;
    this.setState({
      city: this.state.city,
      error: "", // Reset error state
    });
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.city}&limit=1&appid=${APIKey}`
      )
      .then((response) => {
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${APIKey}&units=metric`
          )
          .then((response) => {
            console.log(response);
            this.setState({
              weather_description: response.data.weather[0].description,
              temperature: response.data.main.temp,
              humidity: response.data.main.humidity,
              error: "", // Reset error state
            });
          });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          this.setState({
            error: "City not found", // Set error state
          });
        } else {
          this.setState({
            error: "We encountered an error - please try again.", // Set error state
          });
        }
      });
  };

  render() {
    const { city, weather_description, temperature, humidity, error } =
      this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Weather Forecast</h2>
          {error !== "" ? error : ""} <br />
          {/* Display error message */}
          Description: {weather_description} <br />
          Temperature: {temperature === "" ? "" : temperature + " Celsius"}{" "}
          <br />
          Humidity: {humidity === "" ? "" : humidity + "%"}
          <br />
          <input
            type="text"
            placeholder="City Name"
            value={city}
            onChange={(e) => this.setState({ city: e.target.value })}
          ></input>
          <button onClick={(event) => this.handleSubmit(event)}>
            {" "}
            Submit{" "}
          </button>
        </header>
      </div>
    );
  }
}

export default App;
