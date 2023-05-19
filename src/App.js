import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "", cityName: "", country: "", weather: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { inputValue } = this.state;
    // let latitude = 0;
    // let longtitude = 0;
    if (
      inputValue === "" ||
      inputValue.toUpperCase() === inputValue.toLowerCase()
    ) {
      alert("Please enter a proper city name first.");
    } else {
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid={API key}`
        )

        .then((response) => response.data[0])
        .then((cityGeoData) =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid={API key}&units=metric`
          )
        )
        .then((response) => {
          const { data: weatherData } = response;
          console.log(weatherData.weather[0].main);
          const cityName = weatherData.name;
          const country = weatherData.sys.country;
          const weather = weatherData.weather[0].main;
          this.setState({
            cityName,
            country,
            weather,
          });
        });
    }
  }

  render() {
    const { cityName, country,weather } = this.state;
    const date = new Date();
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
          <div>
            The weather at {cityName}, {country} on{" "}
            {date.toLocaleDateString("en-GB")} is {weather}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
