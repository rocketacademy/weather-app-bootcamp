import React from "react";
import logo from "./logo.png";
import UOL from "./UOL.png"
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
        for (const el of weatherData.list) {
          this.state.output.push(el.dt_txt);
        }
        this.setState({
          output: weatherData.list,
        });
      })
      .catch((err) => console.log(err.message));
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
          <div className="container text-center">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <img src={UOL} className="App-logo img-fluid mb-3" alt="logo" />
                <p>
                  Welcome to the weather app made by Kit Ian Chow from UOL!<br /> Type in a country to view its weather forecast! ☁️⛈️
                </p>
                {this.state.img !== "" ? (
                  <img src={this.state.img} alt="Icon of the current weather" className="img-fluid mb-3" />
                ) : (
                  <div></div>
                )}
                <p></p>

                <input
                  type="text"
                  className="form-control mb-2"
                  value={this.state.input}
                  placeholder="Please enter country"
                  onChange={(e) => this.handleChange(e)}
                />
                <br />
                <input type="submit" className="btn btn-primary mb-4" value="submit" onClick={this.handleSubmit2} />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {this.renderTable()}
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
