import React, { useEffect, useState } from 'react';
import './App.css';
import { Input } from './components/Input';
import { getWeatherIcons, getWeatherVideos } from './utils/weatherDescriptions';
import { DisplayInfo } from './components/DisplayInfo';
import { TempLineChart } from './components/TempLineChart';

const App = () => {
	const [city, setCity] = useState('');
	const [weather, setWeather] = useState();
	const [fiveDayWeather, setFiveDayWeather] = useState();
	const [loaded, setLoaded] = useState(false);
	const [fiveDayTemps, setFiveDayTemps] = useState();
	const [displayInfo, setDisplayInfo] = useState({
		weatherIcon: null,
		temp: null,
		feels_like: null,
		temp_min: null,
		temp_max: null,
		weather_video: null,
	});

	useEffect(() => {
		if (weather) {
			console.log(weather);
			const { weather: typeOfWeather } = weather;
			const { main: temperature } = weather;
			const { temp, feels_like, temp_min, temp_max } = temperature;
			const iconName = getWeatherIcons(typeOfWeather[0].main);
			console.log(typeOfWeather[0].main);
			const backgroundVideo = getWeatherVideos(typeOfWeather[0].main);
			setDisplayInfo((prevDisplayInfo) => ({
				...prevDisplayInfo,
				weatherIcon: require(`./images/animated/${iconName}`),
				temp: temp,
				feels_like: feels_like,
				temp_min: temp_min,
				temp_max: temp_max,
				weather_video: backgroundVideo,
			}));
			setLoaded(true);
		}
	}, [weather]);
	useEffect(() => {
		if (fiveDayWeather) {
			const { list } = fiveDayWeather;
			let days = [];
			let subArray = [];

			list.forEach((object, index) => {
				const { dt, main } = object;

				// Push the current object to the subarray
				subArray.push({
					dt: dt,
					temp: main,
				});

				// Check if the subarray has reached 8 objects or if it's the last object in the list
				if (subArray.length === 8 || index === list.length - 1) {
					// Push the subarray to the 'days' array
					days.push(subArray);

					// Reset the subarray for the next day
					subArray = [];
				}
			});

			setFiveDayTemps(days);
		}
	}, [fiveDayWeather, setFiveDayTemps]);

	useEffect(() => {
		console.log(fiveDayTemps);
	}, [fiveDayTemps]);

	return (
		<div className='App'>
			{loaded && (
				<video
					key={displayInfo.weather_video}
					autoPlay
					muted
					loop
					className='background-video'
				>
					<source
						src={`/videos/${displayInfo.weather_video}`}
						type='video/mp4'
					/>
					{/* Add additional source tags for other supported video formats */}
				</video>
			)}
			<header className='App-header'>
				<div className='weather-info'>
					{loaded && <DisplayInfo displayInfo={displayInfo} />}
					{loaded && <TempLineChart fiveDayTemps={fiveDayTemps} />}
					<Input
						city={city}
						setCity={setCity}
						setWeather={setWeather}
						setFiveDayWeather={setFiveDayWeather}
					/>
				</div>
			</header>
		</div>
	);
};
export default App;
