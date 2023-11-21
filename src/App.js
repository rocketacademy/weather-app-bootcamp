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
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid="6a3affea0dc3f2287d470f99deb8e2f2"`
      )

      .then((response) => {
        console.log(response);
      });
  };

  handleChange = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  render() {
    console.log(this.state.city);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <form onSubmit={this.handleSubmit}>
            <label>
              City
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Enter city name"
              />
              <input type="submit" value="Submit" />
            </label>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
