export const getWeatherIcons = (weatherType) => {
	let iconName = '';
	switch (weatherType) {
		case 'Drizzle':
			iconName = 'lightRain.svg';
			break;
		case 'ThunderStorm':
			iconName = 'thunder.svg';
			break;
		case 'Rain':
			iconName = 'heavyRain.svg';
			break;
		case 'Snow':
			iconName = 'HeavySnow.svg';
			break;
		case 'Clear':
			iconName = 'day.svg';
			break;
		default:
			iconName = 'cloudy.svg';
	}

	return iconName;
};

export const getWeatherVideos = (weatherType) => {
	let iconName = '';
	switch (weatherType) {
		case 'Drizzle':
			iconName = 'Rain.mp4';
			break;
		case 'ThunderStorm':
			iconName = 'Thunder.mp4';
			break;
		case 'Rain':
			iconName = 'Rain.mp4';
			break;
		case 'Snow':
			iconName = 'Snow.mp4';
			break;
		case 'Clear':
			iconName = 'Day.mp4';
			break;
		default:
			iconName = 'Cloudy.mp4';
	}

	return iconName;
};
