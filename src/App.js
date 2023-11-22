import React from "react";
import logo from "./logo.png";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=6a3affea0dc3f2287d470f99deb8e2f2`
      )

      .then((response) => {
        const weatherData = response.data["weather"];
        console.log(weatherData);
      });
  };

  handleChange = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo rounded-xl" alt="logo" />
          <div className="p-2 m-2">
            <form onSubmit={this.handleSubmit}>
              <p className="p-2 mb-1">Search the city you desire</p>
              <input
                className="m-2 px-2 py-1 text-black rounded-lg"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Enter city name"
              />
              <button className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-lg">
                Submit
              </button>
            </form>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
