import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cityInputValue: '',
      };
    }

    //1. Function updates input request  
    handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }
  
    //2. Function handles submit request  
    handleSubmit = (event) => {
      const OPEN_WEATHER_API_KEY = "063b7ab33522045b16cd86484de0a38b"
      event.preventDefault();
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
        )
        .then((response) => {
          console.log(response);
          // Write remaining logic once we understand response format
        });
    };
  
    render() {
  
      return (
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.handleSubmit}>
          <label>
            City:
            <input type="text" name="cityInputValue" onChange={this.handleChange} />
          </label>
          <button type="submit">Check Weather</button>
        </form>
        </header>
        
        </div>
      );
    }
  }
  
  export default App;
  