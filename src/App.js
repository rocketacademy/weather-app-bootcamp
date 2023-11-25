import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      apiKey: "db2b631c79deae1500162a294faec7dc",
      output: [],
      cityInput: "",
      img: "",
      errorMsg: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      cityInput: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInput}&limit=1&appid=db2b631c79deae1500162a294faec7dc`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=db2b631c79deae1500162a294faec7dc&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);
        console.log(weatherData.weather[0].icon);
        this.setState({
          output: weatherData,
        });

        axios
          .get(
            `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
          )
          .then((res) => {
            this.setState({
              img: res.config.url,
            });
          })
          .catch((err) => {
            this.setState({
              errorMsg: err.message,
            });
          });
      })
      .catch((err) => console.log(err.message));

    // axios
    //   .get(
    //     `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityInput}&appid=db2b631c79deae1500162a294faec7dc`
    //   )
    //   .then((response) => console.log(response));
  };

  handleSubmit2 = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInput}&limit=1&appid=db2b631c79deae1500162a294faec7dc`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=db2b631c79deae1500162a294faec7dc&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData.list);

        for (const el of weatherData.list) {
          this.state.output.push(el.dt_txt);
        }
        console.log(this.state.output);
        this.setState({
          output: weatherData.list,
        });
      })
      .catch((err) => console.log(err.message));

    // axios
    //   .get(
    //     `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityInput}&appid=db2b631c79deae1500162a294faec7dc`
    //   )
    //   .then((response) => console.log(response));
  };

  renderTable() {
    const data = this.state.output;
    if (!data || data.length === 0) return null;

    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered vertical-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Temperature</th>
              <th>Sky Conditions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((obj, rowIndex) => (
              <tr key={rowIndex}>
                <th className="bg-dark text-light py-2">{obj.dt_txt}</th>
                <td className="border">{obj.main.temp}</td>
                <td>{obj.weather[0].description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  handleOnClick = () => {
    this.renderTable();
  };

  render() {
    console.log(this.state.output);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {/* <input
            type="text"
            value={this.state.input}
            placeholder="Please enter country"
            onChange={(e) => this.handleChange(e)}
          /> */}

          {/* <input type="submit" value="submit" onClick={this.handleSubmit} /> */}
          {this.state.img !== "" ? (
            <img src={this.state.img} alt="Icon of the current weather" />
          ) : (
            <div></div>
          )}
          <p></p>
          <div>
            <input
              type="text"
              value={this.state.input}
              placeholder="Please enter country"
              onChange={(e) => this.handleChange(e)}
            />
            <br />
            <input type="submit" value="submit" onClick={this.handleSubmit2} />
            {/* <input type="submit" value="submit" onClick={this.handleOnClick} /> */}
            <table>{this.renderTable()}</table>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
