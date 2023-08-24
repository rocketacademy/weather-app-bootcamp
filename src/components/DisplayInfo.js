import React from 'react';

export const DisplayInfo = ({ displayInfo }) => {
	return (
		<div>
			<img src={displayInfo.weatherIcon} className='App-logo' alt='logo' />
			<p>current temperature:{displayInfo.temp}</p>
			<p>feels like:{displayInfo.feels_like}</p>
			<p>minimum temperature:{displayInfo.temp_min}</p>
			<p>maximum temperature:{displayInfo.temp_max}</p>
		</div>
	);
};
