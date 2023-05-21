import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CityInput: "",
      City: "",
      Temperature: "",
      Weather: { code: "", description: "", icon: "" },
      Forecast: [],
      date: "",
      temp: "",
    };
  }

  handleChange = (event) => {
    this.setState({ CityInput: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let CityInput = this.state.CityInput;

    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${CityInput}&limit=1&&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        this.setState({
          City: weatherData.name,
          Temperature: weatherData.main.temp,
          Weather: weatherData.weather[0],
          CityInput: "",
        });
      });

    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${CityInput}&limit=1&&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: forecastData } = response;

        const forecastFormatted = forecastData.list.map((data) => ({
          Datetime: data.dt_txt,
          Temp: data.main.temp,
        }));
        this.setState({ Forecast: forecastFormatted });
      });
  };

  render() {
    const forecastItems = this.state.Forecast.map((item) => (
      <tr>
        <td>{item.Datetime}</td>
        <td>{item.Temp}°C</td>
      </tr>
    ));

    const renderLineChart = (
      <LineChart
        width={1000}
        height={400}
        data={this.state.Forecast}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="linear" dataKey="Temp" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="Datetime" tick={{ fontSize: 15 }} tickCount="10" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={56} />
      </LineChart>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br />
          <form onSubmit={this.handleSubmit}>
            <label>
              City:
              <input
                type="text"
                value={this.state.CityInput}
                onChange={this.handleChange}
              />
              <input type="submit" name="submit" value="Check" />
            </label>
          </form>

          {this.state.City === "" ? (
            <div>
              <br />
              Enter a city name to get its weather data
            </div>
          ) : (
            <div>
              <br />
              <h1>Weather</h1>
              <br />
              <img
                src={`https://openweathermap.org/img/wn/${this.state.Weather.icon}@2x.png`}
                //className="App-logo"
                alt="weather icon logo"
              />
              <br />
              Current City: {this.state.City}
              <br />
              <br />
              Current Temp: {this.state.Temperature}°C
              <br />
              <br />
              Current Weather: {this.state.Weather.description}
            </div>
          )}
          <br />

          {this.state.City === "" ? (
            ""
          ) : (
            <div>
              <br />
              <h1>Forecast - 5 day / 3 hour</h1>
              <br />
              {renderLineChart}
              <br />
              <Table
                bordered
                hover
                style={{ color: "White", backgroundColor: "grey" }}
              >
                <thead>
                  <tr>
                    <th>Date_Hour</th>
                    <th>Temperature</th>
                  </tr>
                </thead>
                <tbody>{forecastItems}</tbody>
              </Table>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
