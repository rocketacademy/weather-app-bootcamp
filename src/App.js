import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";

let OPEN_WEATHER_API_KEY = '';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      weather_description: "",
      temperature:"",
      feels_like:"",
      city_name:""
    };
  }

  handleChange = (event) => {
    this.setState({
    input: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
      )
      .then((response) => {
        const {data: weatherData } = response;
        this.setState({
          city_name: weatherData.name,
          feels_like: weatherData.main.feels_like,
          temperature: weatherData.main.temp,
          weather_description: weatherData.weather[0].description
        })
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.input}
              onChange={this.handleChange}
              />
            <button type="submit">Submit</button>
          </form>
          {this.state.city_name ?
          <div> 
            <p>
              Currently the weather in {this.state.input} can be described as {this.state.weather_description} with a temperature of {this.state.temperature} degrees celsius but feels like {this.state.feels_like} degrees celsius
            </p>
            <h4>Enjoy your day!</h4>
          </div> 
          : <h4>Which city's weather would you like to learn more about?</h4>
          }
          
          
        </header>
      </div>
    );
  }
}

export default App;
