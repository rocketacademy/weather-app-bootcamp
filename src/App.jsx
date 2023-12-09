import React from "react";
import logo from "./logo.png";
import "./App.css";
import API from "./WeatherAPI";

//The following is an example of class based implementation of React.
//For more information, see: https://legacy.reactjs.org/docs/state-and-lifecycle.html#:~:text=It%20will%20use%20this.setState()%20to%20schedule%20updates%20to%20the%20component%20local%20state%3A
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: "",
      city: "",
      cityInput: "",
      formSubmitted: false,
    };
  }

  updateWeather = (newWeatherData) => {
    this.setState({ weather: newWeatherData });
  };

  handleCitySubmit = (e) => {
    e.preventDefault();
    this.setState({ city: this.state.cityInput });
    this.setState({ formSubmitted: true });
    console.log("city: this.cityInput: ", { city: this.state.cityInput });
  };

  handleCityInput = (e) => {
    if (this.state.formSubmitted === true) {
      this.setState({ formSubmitted: false });
    }
    this.setState({ cityInput: e.target.value });
    console.log("cityInput: e.target.value: ", { cityInput: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <form onSubmit={this.handleCitySubmit}>
            <label>
              Input a city:
              <br />
              <input type="text" onChange={this.handleCityInput} />
              <button type="submit">Get Weather</button>
            </label>
          </form>
          <p>
            {this.state.formSubmitted && (
              <API submitted_city={this.state.city} />
            )}
            {/*Only render the API component if the this.state.formSubmitted returned truthy.*/}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
