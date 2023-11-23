import React from "react";
import axios from "axios";

class WeatherInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSubmit(this.state.inputValue);
    this.setState({
      inputValue: "",
    });
  };

  render() {
    return (
      <>
        <div className="p-2 m-2">
          <form onSubmit={this.handleSubmit}>
            <p className="p-2 mb-1">Search the city you desire</p>
            <input
              className="input input-bordered"
              type="text"
              value={this.state.inputValue}
              onChange={this.handleChange}
              placeholder="Enter city name"
            />
            <button className="btn">Submit</button>
          </form>
        </div>
        <div>
          {this.props.icon !== "" && (
            <img
              src={`https://openweathermap.org/img/wn/${this.props.icon}.png`}
              alt="weathericon"
            />
          )}
          {!this.state.initialRender && <h3>{this.props.temperature}°C</h3>}
        </div>
      </>
    );
  }
}

export default WeatherInput;
