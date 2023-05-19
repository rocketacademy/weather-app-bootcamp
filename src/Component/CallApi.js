import React from "react";
import axios from "axios";

export default class CallApi extends React.Component {
  constructor() {
    super();
    this.state = {
      inputCountry: "",
      name: "",
      temp: "",
      feelsLike: "",
      description: "",
      isCalled: false,
    };
  }

  handleChange = (e) => {
    this.setState({ inputCountry: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(process.env.OPEN_WEATHER_API_KEY);
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.inputCountry}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        // const { data: weather } = response; //assign data from response to weatherData
        const weatherData = response.data;
        console.log(weatherData);
        this.setState({
          name: weatherData.name,
          temp: weatherData.main.temp,
          feelsLike: weatherData.main.feels_like,
          description: weatherData.weather[0].description,
          isCalled: true,
        });
      });
  };

  handleRestart = (e) => {
    e.preventDefault();
    this.setState({
      inputCountry: "",
      name: "",
      temp: "",
      feelsLike: "",
      description: "",
      isCalled: false,
    });
  };

  render() {
    const { name, temp, feelsLike, description, isCalled } = this.state;

    let toShow;
    if (isCalled) {
      toShow = (
        <div>
          <h2>Country: {name}</h2>
          <p>temp: {temp}°C</p>
          <p>feels like: {feelsLike}°C</p>
          <p>description: {description}</p>
        </div>
      );
    } else {
      toShow = (
        <div className="weather-form">
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                name="inputCountry"
                type="text"
                value={this.state.inputCountry}
                onChange={this.handleChange}
                onFocus={() => this.setState({ inputCountry: "" })}
                placeholder="input a country here"
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
    return (
      <div>
        <h1 className="weather-header">WEATHER</h1>
        <div className="weather-body">
          {toShow}
          {isCalled && (
            <button onClick={this.handleRestart}>Input another country</button>
          )}
        </div>
        <div className="weather-footer">
          This page was built by{" "}
          <a
            href="https://github.com/Khloeli"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chloe Li
          </a>
        </div>
      </div>
    );
  }
}
