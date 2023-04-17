import React from "react";
import "./App.css";
import axios from "axios";
const WEATHER_API_KEY = "7063e3113949ccad123272fe31f86859";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      temp: 0,
      humidity: 0,
      feels_like: 0,
      weather: "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = this.state.search;
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&appid=${WEATHER_API_KEY}`
      )
      .then((response) => response.data[0])

      .then((data) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${WEATHER_API_KEY}&units=metric`
        )
      )

      .then((response) => {
        const weatherData = response.data;
        this.setState({
          temp: weatherData.main.temp,
          humidity: weatherData.main.humidity,
          feels_like: weatherData.main.feels_like,
          weather: weatherData.weather[0].description,
        });
      });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              type="text"
              name="search"
              placeholder="Enter search here"
              value={this.state.search}
            />
            <input type="submit" value="Submit"></input>
          </form>
          <br />
          <h1> {this.state.search ? this.state.search : null}</h1>

          <div>
            {" "}
            Temperature:
            {this.state.temp ? <p>{this.state.temp.toFixed()}°C</p> : null}
          </div>

          <div>
            {" "}
            Humidity:
            {this.state.humidity ? <p>{this.state.humidity}%</p> : null}
          </div>

          <div>
            {" "}
            Feels like:
            {this.state.feels_like ? <p>{this.state.feels_like}°C</p> : null}
          </div>

          <div>
            {" "}
            Weather:
            {this.state.weather ? <p>{this.state.weather}</p> : null}
          </div>
        </header>
      </div>
    );
  }
}
export default App;
