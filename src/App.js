import React from "react";
import "./App.css";
import Axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      city: "",
      weather: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    Axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.value}&limit=5&appid=646cb548a97d514f3a52c5e93d83fe41`
    )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=646cb548a97d514f3a52c5e93d83fe41`
        )
      )
      .then((response) => {
        this.setState({
          weather: response.data.weather[0].description,
        });
      })
      .catch((error) => {
        console.error(error);
        // Return the user a graceful error message
      });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          City:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
        Weather: {this.state.weather}
      </div>
    );
  }
}

export default App;
