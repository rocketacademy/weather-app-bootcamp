import React from 'react';
import logo from './logo.png';
import './App.css';
import axios from 'axios';

const OPEN_WEATHER_API_KEY = 'eaf7b8864c51f055a8ee383960491a41';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInputValue: '',
      currCity: '',
      currTemp: '',
      weatherType: '',
      weatherDesc: '',
      weatherIconCode: '',
    };
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
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        this.getForecast();
        this.setState(
          {
            cityInputValue: '',
            currCity: weatherData.name,
            currTemp: weatherData.main.temp,
            weatherType: weatherData.weather[0].main,
            weatherDesc: weatherData.weather[0].description,
            weatherIconCode: weatherData.weather[0].icon,
          },
          () => {
            this.getForecast();
          }
        );
      });
  };

  getGeoData = () => {
    return axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => response.data[0])
      .catch((error) => {
        console.error('Error fetching geographical data:', error);
        throw error;
      });
  };
  getForecast = () => {
    this.getGeoData()
      .then((geoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${geoData.lat}&lon=${geoData.lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
        )
      )
      .then((res) => {
        this.setState({
          forecastRetrieved: true,
          forecastData: res.data.list.slice(0, 5),
        });
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  };

  render() {
    let forecastDisplay = [];
    if (this.state.forecastRetrieved) {
      forecastDisplay = this.state.forecastData.map((forecast, index) => (
        <p key={index}>
          {forecast.dt_txt}: {forecast.main.temp}°C,{' '}
          {forecast.weather[0].description}
        </p>
      ));
      //forecastDisplay.push();
    }

    const weatherInfo = this.state.currCity ? (
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.weatherIconCode}.png`}
          alt='Weather Icon'
        />
        <p>Current City: {this.state.currCity}</p>
        <p>Current Temperature: {this.state.currTemp}°C</p>
        <p>
          Current Weather: {this.state.weatherType}, {this.state.weatherDesc}
        </p>
        <p>Next 3 hours forecast:</p>
        {forecastDisplay}
      </div>
    ) : (
      <p>Please enter a city name to get its weather data.</p>
    );
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <form onSubmit={this.handleSubmit}>
            <label>
              City:
              <input
                type='text'
                value={this.state.cityInputValue}
                onChange={this.handleChange}
              />
            </label>
            <button type='submit'>Check Weather</button>
          </form>
          {weatherInfo}
        </header>
      </div>
    );
  }
}

export default App;
