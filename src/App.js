import React from "react";
import "./App.css";
import axios from "axios";
const apiKey = "6551f6311cfd170cad474dd24a9b6e05";

class App extends React.Component {
  constructor() {
    super();
    this.state = { city: "", weather: [] };
  }

  getWeather = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${apiKey}`
      )
      .then((response) =>
        this.setState({
          weather: [...this.state.weather, response.data],
        })
      );
    return true;
  };

  handleChange = (e) => {
    this.setState({ city: `${e.target.value}` });
  };

  handleSubmit = () => {
    this.getWeather(this.state.city);
  };

  render() {
    const weatherDisplay = this.state.weather.map((obj) => (
      <div key={obj.name}>
        <h1>{obj.name}</h1>
        <img
          src={`https://openweathermap.org/img/wn/${obj.weather[0].icon}.png`}
          alt={obj.weather[0].main}
        />
        <p>{obj.weather[0].description}</p>
      </div>
    ));
    return (
      <div className="App">
        <input
          type="text"
          value={this.state.city}
          placeholder="City"
          onChange={(event) => this.handleChange(event)}
        />
        <input type="submit" value="submit" onClick={this.handleSubmit} />
        {this.state.weather && this.state.weather.length > 0
          ? weatherDisplay
          : null}
      </div>
    );
  }
}

export default App;
