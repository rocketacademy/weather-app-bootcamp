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
      tempData: "",
      description: "",
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
    console.log("event");
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => {
        console.log(response.data);//use Chrome's dev tool on console log to check object's data
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
          )
          .then((response2) => {
            console.log(response2.data);
            this.setState({
              tempData: response2.data.main.temp, //we refer to the data we need from chrome's dev tools console.log of the response2.data
              description: response2.data.weather[0].description,
            });
          });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  render() {


    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p> */}
          <form onSubmit={this.handleSubmit}>
            <label>Enter city:</label>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.cityInputValue}
              placeholder="Enter city name"
            ></input>
            <button type="submit">Submit</button>
          </form>

          {this.state.tempData ?
            <div>
              <p>{this.state.cityInputValue}'s temperature is {this.state.tempData} degrees Celsius.</p>

              <p> The weather description is {this.state.description}.
              </p>
            </div>
            : null}
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
(6) refer to the API's document to see what parameters are required and copy the api and paste into out axios.get()
(7) use Chrome's console.log to see received data object and check through each data object (data's) various objects (line 37)
(8) decide / choose which object inside is the piece that we want (lines 37 and 43) using Chrome's console.log of the object (response.data)
(9) code the objects we want into the API itself (depending on each API's documentation) in line 40 & lines 45, 46
(9) update the state to hold the pieces of data that we want (line 45 and 46)
(10) go to the return div to craft out the HTML part using ternerary operator to present data captured in lines 45 and 46

*/
