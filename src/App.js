import React, { useState } from 'react';
import logo from './logo.png';
import './App.css';
import { Input } from './components/Input';
import { ApiCall } from './customHooks/apiCall';

const App = () => {
	const [city, setCity] = useState('');

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<Input city={city} setCity={setCity} />
			</header>
		</div>
	);
};
export default App;
