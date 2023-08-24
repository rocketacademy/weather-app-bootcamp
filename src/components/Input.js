import React from 'react';

import axios from 'axios';

export const Input = ({ city, setCity, setWeather, setFiveDayWeather }) => {
	const key = 'affe432d2fa46aa11c96860a17ff801b';
	const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`;

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.get(url)
			.then((response) => response.data[0])
			.then((cityGeoData) => {
				const weatherRequest = axios.get(
					`https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${key}&units=metric`,
				);

				const forecastRequest = axios.get(
					`https://api.openweathermap.org/data/2.5/forecast?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${key}&units=metric`,
				);

				return Promise.all([weatherRequest, forecastRequest]);
			})
			.then((responses) => {
				const weatherData = responses[0].data;
				const forecastData = responses[1].data;

				setWeather(weatherData);
				setFiveDayWeather(forecastData);

				setCity('');
			})
			.catch((error) => {
				// Handle error
				console.error(error);
			});
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label></label> Enter your city
				<input
					value={city}
					onChange={(e) => {
						setCity(e.target.value);
					}}
				></input>
				<button>Get weather report</button>
			</form>
		</>
	);
};
