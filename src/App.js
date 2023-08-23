import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './App.css';
import { Input } from './components/Input';

const App = () => {
	const [city, setCity] = useState('');
	const [weather, setWeather] = useState();

	useEffect(() => {
		console.log(weather);
	}, [weather]);

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<Input city={city} setCity={setCity} setWeather={setWeather} />
			</header>
		</div>
	);
};
export default App;
