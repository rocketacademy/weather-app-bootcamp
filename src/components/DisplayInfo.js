import React from 'react';

export const DisplayInfo = ({ displayInfo }) => {
	return (
		<div className='item2'>
			<h4 className='todays-temp'> Todays weather</h4>
			<img src={displayInfo.weatherIcon} className='App-logo ' alt='logo' />
			<p>current temp: {displayInfo.temp}</p>
			<p>feels like: {displayInfo.feels_like}</p>
			<p>min temp: {displayInfo.temp_min}</p>
			<p>max temp: {displayInfo.temp_max}</p>
		</div>
	);
};
