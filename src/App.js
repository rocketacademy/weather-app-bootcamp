import React from "react";
import "./App.css";
import axios from "axios";
import WeatherData from "./WeatherData";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "", weatherData: [] };
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.input}&appid=ff74b95fa5c1b30eacf349b5b558101a`
      )
      .then((response) => response.data[0])
      .then((data) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather??lat=${data.lat}&lon=${data.lon}&units=metric&appid=ff74b95fa5c1b30eacf349b5b558101a`
        )
      )
      .then((response) => response.data)
      .then((data) =>
        this.setState({
          weatherData: [
            ...this.state.weatherData,
            {
              city: this.state.input,
              weather: data.weather[0],
              temp: data.main.temp,
            },
          ],
        })
      );
  };

  render() {
    console.log(this.state.weatherData);
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <input
              type="input"
              value={this.state.input}
              onChange={this.handleChange}
              placeholder="Please type city name."
            />
            <input type="submit" />
          </form>
          <WeatherData weatherData={this.state.weatherData} />
        </header>
      </div>
    );
  }
}

export default App;
