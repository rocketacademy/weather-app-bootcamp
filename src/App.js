import React from "react";
import logo from "./logo.png";
import "./App.css";
import WeatherForm from "./Components/Form";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const APIKey = "113f386d2f3e5ae883e2913c7e032cb5";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      error: null,
      weatherRetrieved: false,
      weatherData: {},
      forecastRetrieved: false,
      forecastData: {},
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ city: "" });
    this.getCurrentWeather();
    this.getForecast();
  };

  getGeoData = () => {
    return axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.city}&limit=5&appid=${APIKey}`
      )
      .then((res) => res.data[0])
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  };

  getCurrentWeather = () => {
    this.getGeoData()
      .then((geoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&units=metric&appid=${APIKey}`
        )
      )
      .then((res) => {
        this.setState({
          weatherRetrieved: true,
          weatherData: res,
        });
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  };

  getForecast = () => {
    this.getGeoData()
      .then((geoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${geoData.lat}&lon=${geoData.lon}&units=metric&appid=${APIKey}`
        )
      )
      .then((res) => {
        this.setState({
          forecastRetrieved: true,
          forecastData: res,
        });
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  };

  render() {
    let weatherDisplay = "";
    let forecastDisplay = [];
    if (this.state.error) {
      weatherDisplay = <div>Error: {this.state.error.message}</div>;
    } else if (this.state.weatherRetrieved) {
      let location = `${this.state.weatherData.data.name} ${this.state.weatherData.data.sys.country}`;
      let maxTemp = this.state.weatherData.data.main.temp_max;
      let minTemp = this.state.weatherData.data.main.temp_min;
      let description = this.state.weatherData.data.weather[0].description;
      let icon = this.state.weatherData.data.weather[0].icon;
      weatherDisplay = (
        <div id="current-weather">
          <h4>{location}</h4>
          <h4>{new Date().toGMTString()}</h4>
          <br />
          <div>
            <h6>Today's weather:</h6>
            <Container>
              <Row>
                <Col className="icon-col">
                  <img
                    className="icon"
                    src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt="weather-icon"
                  />
                </Col>
                <Col className="content-col">{description}</Col>
                <Col className="content-col">
                  {minTemp}°C to {maxTemp}°C
                </Col>
              </Row>
            </Container>
            <br />
          </div>
        </div>
      );
    }
    if (this.state.forecastRetrieved) {
      const forecasts = this.state.forecastData.data.list;
      for (let i = 0; i < forecasts.length; i += 8) {
        let maxTemp = forecasts[i].main.temp_max;
        let minTemp = forecasts[i].main.temp_min;
        let description = forecasts[i].weather[0].description;
        forecastDisplay.push({
          name: description,
          low: minTemp,
          high: maxTemp,
        });
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <WeatherForm
            city={this.state.city}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          {this.state.weatherRetrieved && weatherDisplay}
          {this.state.forecastRetrieved && (
            <div id="forecast">
              <h6>Next five days' weather:</h6>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={forecastDisplay}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="low"
                    stroke="#00bbf0"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="high" stroke="#fdb44b" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
