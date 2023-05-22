import React from "react";
import axios from "axios";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      cityName: "",
      country: "",
      date: [],

      weather: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { inputValue } = this.state;

    if (
      inputValue === "" ||
      inputValue.toUpperCase() === inputValue.toLowerCase()
    ) {
      alert("Please enter a proper city name first.");
    } else {
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=${API_KEY}`
        )

        .then((response) => response.data[0])
        .then((cityGeoData) =>
          axios.get(
            // `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${API_KEY}&units=metric`
            `https://api.openweathermap.org/data/2.5/forecast?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${API_KEY}`
          )
        )
        .then((response) => {
          const { data: weatherData } = response;
          console.log(weatherData);
          console.log(weatherData.list[2].weather[0].main);
          const cityName = weatherData.city.name;
          const country = weatherData.city.country;
          let date = [];
          let weather = [];
          date.push(weatherData.list[0].dt_txt);
          date.push(weatherData.list[1].dt_txt);
          date.push(weatherData.list[2].dt_txt);
          date.push(weatherData.list[8].dt_txt);
          date.push(weatherData.list[16].dt_txt);
          weather.push(weatherData.list[0].weather[0].main);
          weather.push(weatherData.list[1].weather[0].main);
          weather.push(weatherData.list[2].weather[0].main);
          weather.push(weatherData.list[8].weather[0].main);
          weather.push(weatherData.list[16].weather[0].main);

          this.setState({
            cityName,
            country,
            date,
            weather,
          });
        });
    }
  }

  render() {
    const { cityName, country, date, weather } = this.state;
    // const date = new Date();
    return (
      <div className="App">
        <header className="App-header">
          <p>Please enter a city name to check its weather:</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                type="text"
                name="inputValue"
                value={this.state.inputValue}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          {cityName ? (
            <div>
              <div>
                The weather at {cityName}, {country} at:
              </div>
              <ul>
                <li>
                  {date[0]} is: {weather[0]}
                </li>
                <li>
                  {date[1]} is: {weather[1]}
                </li>
                <li>
                  {date[2]} is: {weather[2]}
                </li>
                <li>
                  {date[3]} is: {weather[3]}
                </li>
                <li>
                  {date[4]} is: {weather[4]}
                </li>
              </ul>
            </div>
          ) : (
            <div></div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
