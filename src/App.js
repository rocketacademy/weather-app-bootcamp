import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInput: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      cityInput: event.target.value,
    });
  }
  

  handleSubmit(event) {
    event.preventDefault();





    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInput}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=en`))  
       .then((response) => {      
        const {data : weatherData} = response;    
        this.setState({
          cityInput: "",
          city: weatherData.name,
          currTemp: weatherData.main.temp,
          currWeather: weatherData.weather[0].main,
          weatherDesc: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
          lat: weatherData.coord.lat,
          lon: weatherData.coord.lon
        })
      })
    }

    

    
   
  render() {
    const weatherDisplay = this.state.city ? (
    <div>
      <p>Current City: {this.state.city}</p>
      <p>Current Temperature: {this.state.currTemp} degrees</p>
      <div>
        <img src = {`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt="icon"></img>
         
        <p>Current Weather: {this.state.currWeather}</p>
      
      </div> 
      

    </div>) : "";
    
    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit = {this.handleSubmit}>
            <input
              type="text"
              value={this.state.cityInput}
              onChange={this.handleChange}
            ></input>
            <input type="submit" value="Submit" ></input>
          </form>
          {weatherDisplay}
        </header>
      </div>
    );
  }
}

export default App;
