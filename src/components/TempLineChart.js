import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

export const TempLineChart = ({ fiveDayTemps }) => {
	if (!fiveDayTemps || fiveDayTemps.length === 0) {
		return null; // Return null or a loading indicator if data is not available yet
	}

	const day1Data = fiveDayTemps[0]; // Get the data for day 1

	// Extract the required data for the chart
	const tempData = day1Data.map((entry) => ({
		time: entry.dt, // Assuming 'time' represents the time of the day
		temp: entry.temp.temp,
		minTemp: entry.temp.temp_min,
		maxTemp: entry.temp.temp_max,
	}));

	return (
		<ResponsiveContainer width='100%' height={300}>
			<LineChart data={tempData}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='time' />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type='monotone'
					dataKey='temp'
					stroke='#8884d8'
					name='Temperature'
				/>
				<Line
					type='monotone'
					dataKey='minTemp'
					stroke='#82ca9d'
					name='Min Temperature'
				/>
				<Line
					type='monotone'
					dataKey='maxTemp'
					stroke='#ff0000'
					name='Max Temperature'
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default TempLineChart;
