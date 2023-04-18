import React from "react";
/* import logo from "./logo.png"; */
import "./App.css";
import axios from "axios";

const OPEN_WEATHER_API_KEY = "b37000abdf346e890a2054a9b281cf10";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      cityInputValue: "",
      weatherData: "",
      /* data:[] */
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      cityInputValue: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('event')
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => {
        console.log('another', response.data);
        return response.data[0];
      })
      .then((response) => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${response.lat}&lon=${response.lon}&appid=${OPEN_WEATHER_API_KEY}`
          )
          .then((response) => {
            console.log(response.data);
            const weatherData = `${response.data.main.temp}  ${response.data.weather[0].description}`;
            console.log('something', weatherData);
            return new Promise((res, rej) => {
              res(weatherData);
            });
          });
      })
      .then((response) => {
        console.log("testing", response);
        this.setState(
          {
            weatherData: response,
          },
          () => {
            console.log("hello");
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    /* const mydata = this.state.weatherData */

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p> */}
          <form onSubmit={this.handleSubmit}>
            {/* <label>Enter city:</label> */}
            {/* <input
              type="text"

              onChange={this.handleChange}
              value={this.state.cityInputValue}
              placeholder="Enter city name"
            ></input> */}
            {/* <input type="submit"></input> */}
          </form>
          {/*   <p>{mydata}</p> */}
          {/* {this.state.weatherData} */}
        </header>
      </div>
    );
  }
}

export default App;

/* 
(1) Create the <form> first
(2) Put in the 2 functions handleChange and handleSubmit
(3) Go up above render() to define/create these 2 functions, create the handleChange function first
(4) Identify the state that we want to capture : cityInputValue from the API URL
(5) craft out the handleSubmit function
(6) refer to th API's document to see what parameters are required and copy the api and paste into out axios.get()
(7) use console.log to see received data and check through the object data's various objects
(8) decide / choose which object inside is the piece that we want (lines 30 and 33) using console.log(response.data)
(9) code the objects we want into the API itself (depending on each API's documentation) in line 33
(9) create a variable const to hold this piece of data that we want (line 33)
(10) create a code to return this piece of data to the HTML for user

*/
