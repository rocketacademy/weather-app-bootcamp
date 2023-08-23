import React from 'react';

import axios from 'axios';

export const Input = ({ city, setCity, setWeather }) => {
	const key = 'affe432d2fa46aa11c96860a17ff801b';
	const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`;
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.get(url)
			.then((response) => response.data[0])
			.then((cityGeoData) =>
				axios.get(
					`https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${key}&units=metric`,
				),
			)
			.then((response) => {
				const { data: weatherData } = response;
				setWeather(weatherData);
			});
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					{' '}
					Enter your city
					<input
						value={city}
						onChange={(e) => {
							setCity(e.target.value);
						}}
					></input>
				</label>
				<button>Get weather report</button>
			</form>
		</>
	);
};
