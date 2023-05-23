import React from "react";
import "./App.css";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Brush,
} from "recharts";

const OPEN_WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

class CustomizedLabel extends React.Component {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value + "℃"}
      </text>
    );
  }
}

class CustomizedAxisTick extends React.Component {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          fill="#666"
          fontSize={10}
          textAnchor="middle"
          interval={0}
          angle="-40"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInputValue: "",
      city: "",
      temperature: "",
      weather: "",
      logo: "",
      forecastDataArray: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({ cityInputValue: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      // City geo data is in response.data[0]
      // Arrow functions with no curly braces return value after arrow
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&lang=en&appid=${OPEN_WEATHER_API_KEY}&units=metric`
          )
          .then((response) => {
            const { data: weatherData } = response;
            //console.log(weatherData);
            this.setState({
              cityInputValue: "",
              city: this.state.cityInputValue,
              temperature: weatherData.main.temp + "℃",
              weather: `${weatherData.weather[0].main}, ${weatherData.weather[0].description}`,
              logo: weatherData.weather[0].icon,
            });
          })
      );

    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: forecastData } = response;
        console.log(forecastData.list);
        const listData = forecastData.list.map((obj) => ({
          ...obj,
          t_txt: this.convertUnixToDateTime(obj.dt),
        }));
        console.log(listData);
        this.setState({ forecastDataArray: listData });
      });
  };

  componentDidUpdate = () => {
    //console.log(this.state.cityInputValue)
  };

  convertUnixToDateTime = (unix_timestamp) => {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? minutes : minutes;
    seconds = seconds < 10 ? seconds : seconds;
    var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;

    return strTime;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ResponsiveContainer width="95%" height={500}>
            <LineChart
              data={this.state.forecastDataArray}
              margin={{ top: 25, right: 50, bottom: 5, left: 50 }}
            >
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis
                xAxisId="0"
                dataKey="weather[0].description"
                domain={[0, "dataMax+1000"]}
                tick={<CustomizedAxisTick />}
              />
              <XAxis
                xAxisId="1"
                dataKey={"t_txt"}
                orientation="top"
                fontSize={10}
              />
              <YAxis
                unit={"℃"}
                label={{
                  value: "Temperature Range",
                  angle: -90,
                  position: "middle",
                  dx: -65,
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="main.temp"
                name="Temperature"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                label={<CustomizedLabel />}
                unit={"℃"}
              />
              <Brush />
            </LineChart>
          </ResponsiveContainer>
          <br />
          <form onSubmit={this.handleSubmit}>
            <label>City Name: </label>
            <input
              type="text"
              value={this.state.cityInputValue}
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
          </form>
          <br />
          {this.state.city !== "" && (
            <div>
              Current Country Weather's Info
              <br />
              <img
                src={`https://openweathermap.org/img/wn/${this.state.logo}@2x.png`}
                alt="weatherIcon"
              />
              <br />
              {this.state.city}
              <br />
              {this.state.temperature}
              <br />
              {this.state.weather}
            </div>
          )}
          <br />
        </header>
      </div>
    );
  }
}

export default App;
