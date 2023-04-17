import React from "react";
import logo from "./logo.png";
import "./App.css";
import { getWeatherData } from "./utils";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currWeather: null,
      weatherImg: null,
      description: null,
      temp: null,
    };
  }

  handleSubmit = (event) => {
    console.log("City was submitted: " + event.target[0].value);

    const location = new Promise((resolve) => {
      resolve(getWeatherData(event.target[0].value));
    });
    location.then((res) => {
      console.log(res);
      /*
        res =  {
          weather: {
            id: int,
            main: str,
            description: str,
            icon: str
          },
          temp: float
        }
      */
      const temp = res.temp + "°C";
      this.setState({
        currWeather: res.weather.main,
        weatherImg: `https://openweathermap.org/img/wn/${res.weather.icon}@2x.png`,
        description: res.weather.description,
        temp: temp,
      });
    });

    event.preventDefault();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Weather App</h1>
          <div>
            <img src={this.state.weatherImg} />
          </div>
          <div>{this.state.currWeather}</div>
          <p>{this.state.description}</p>
          <p>{this.state.temp}</p>
          <form onSubmit={this.handleSubmit}>
            <div>
              <p>City:</p>
              <input type="text" />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
