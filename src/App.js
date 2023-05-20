import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cityInputValue: '',
        data:[],
      };
    }

    //1. Function updates input request  
    handleChange = (event) => {
      const { name, value } = event.target;
      // console.log(this.state.data)
      this.setState({ [name]: value });
    }
  
    //2. Function handles submit request  
    handleSubmit = (event) => {
      const OPEN_WEATHER_API_KEY = "063b7ab33522045b16cd86484de0a38b"
      event.preventDefault();
      // axios
      //   .get(
      //     `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      //   )
      //   .then((response) => {
      //     console.log(response);
      //     // Write remaining logic once we understand response format
      //   });
        axios
          .get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
          )
          // City geo data is in response.data[0]
          // Arrow functions with no curly braces return value after arrow
          .then((response) => {
            // console.log(response.data[0]);
            return response.data[0]; //returns data as input then feed into next then
          })
          // .then((cityGeoData) =>
          //   axios.get( //Further sent back to API based on the return data and obtain the specific query
          //     `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
          //   )
          // )
          .then((cityGeoData) =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
          )
          )
          .then((response) => {
            const { data: weatherData } = response;
             //console.log(weatherData.list);
            // console.log(weatherData.list[0]);
            const dictionary = weatherData.list.map((x) => (
              {
                name: x.dt_txt,
                temp: x.main.temp,
              }
              ));
            // console.log([dictionary]);
            // console.log(Array.isArray([dictionary]));
          <img src={logo} className="App-logo" alt="logo" />
            this.setState({ data: dictionary });
          });
      };

      //3. Function to handle processing of the inputs into dictionaries
      

  
    render() {
      const formatter = (value) => `${value}°C`;
      return (
        <div className="App">
          
        <header className="App-header">

        <div className="reGraph">
        <h3>Weather Grapher</h3>
        {this.state.data.length > 0 ? (
          <LineChart width={800} height={400} data={this.state.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name"  tick={{fontSize: 5}} />
            <YAxis tickFormatter={formatter}/>
            <Tooltip contentStyle={{ fontSize: 10 }} />
            <Legend wrapperStyle={{fontSize:12, width:'100%'}}/>
            <Line type="monotone" dataKey="temp" stroke="#8884d8" />
            {console.log(this.state.data)}
          </LineChart>
        ) : (
          <p className="loadingPage">Key in a location to begin...</p>
        )}
        </div>

          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <form className="formInput" onSubmit={this.handleSubmit}>
          <label className="App-label">
            City:
            <input type="text" name="cityInputValue" onChange={this.handleChange} />
          </label>
          <button type="submit">Check Weather</button>
        </form>
        </header>
        <footer>
        <p>&copy; 2023 Weather Grapher. All rights reserved.</p>
        <p>Designed by Dexter Chew</p>
        </footer>
        
        </div>
      );
    }
  }
  
  export default App;
  