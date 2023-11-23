import React from "react";
import axios from "axios";

class WeatherAPI extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log("component mount");
    this.fetchWeatherData();
  };

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      console.log("component update");
      this.fetchWeatherData();
    }
  }

  fetchWeatherData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.props.city}&units=metric&appid=6a3affea0dc3f2287d470f99deb8e2f2`
      )

      .then((response) => {
        console.log(response);
        const weatherData = response.data["weather"];
        const temperatureData = response.data["main"];
        this.props.handleUpdate(temperatureData, weatherData);
      });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.props.city}&units=metric&appid=6a3affea0dc3f2287d470f99deb8e2f2`
      )
      .then((response) => {
        console.log(response);
      });
  };

  render() {
    console.log("rendered weather API");
    return <></>;
  }
}

export default WeatherAPI;
