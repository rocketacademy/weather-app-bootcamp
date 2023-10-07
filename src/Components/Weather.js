import React from 'react'

export default class Weather extends React.Component {
  render() {
    return (
      <div>
        <p></p>
      </div>
    );
  }

}



// class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       cityInputValue: "",
//       currCity: "",
//       currTemp: "",
//       weatherType: "",
//       weatherDesc: "",
//       weatherIconCode: "",
//     };
//   }

//   handleChange = (event) => {
//     this.setState({cityInputValue: event.target.value});

//   }

//   handleSubmit = (event) => {
//     event.preventDefault();
    
//     axios
//       .get(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`
//       )
//       // City geo data is in response.data[0]
//       // Arrow functions with no curly braces return value after arrow
//       .then((response) => response.data[0])
//       .then((cityGeoData) =>
//         axios.get(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
//         )
//       )
//       .then((response) => {
//         const { data: weatherData } = response;
//         console.log(weatherData);
//       });
//   };
//   render() {
//     const weatherInfo = this.state.currCity ? (
//       <div>
//         <img 
//           src={`htps://openweathermap.org/img/wn/${this.state.weatherIconCode}@2x.png`}
//           alt="weather-icon"
//         />
//       <p>Current City: {this.state.currCity}</p>
//       <p>Current Temperature: {this.state.currTemp}°C</p>
//       <p>Current weather: {this.state.weatherType}, {this.state.weatherDesc}</p>
//       </div>
//     ) : (
//       <p>Please enter a city name to get its weather data.</p>
//     )

// const handleResponse = (response) => {
//   console.log(response);
// };