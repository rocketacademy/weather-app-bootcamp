import React from 'react';
import { apiCall } from '../customHooks/apiCall';
import axios from 'axios';

export const Input = ({ city, setCity }) => {
	const key = 'b04a755c25ae08f1eff95ae80184e255';
	const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`;
	const handleSubmit = (e) => {
		e.preventDefault();
		apiCall(url);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label> Enter your city</label>
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
