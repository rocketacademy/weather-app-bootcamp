import React from 'react';
import moment from 'moment';
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

export function TempLineChart({ dayData }) {
  const tempData = dayData.map((entry) => ({
    time: moment.unix(entry.dt).startOf('day').format('YYYY-MM-DD'),
    temp: entry.temp.temp,
    minTemp: entry.temp.temp_min,
    maxTemp: entry.temp.temp_max,
    weatherIcon: require(`../images/animated/${entry.weather}`),
  }));

  // console.log(tempData[0].weatherIcon);

  return (
    <div className="flex-container">
      <div>
        <h4>{tempData[2].time}</h4>
        <img src={tempData[4].weatherIcon} className="App-logo " alt="logo" />
      </div>
      <ResponsiveContainer width="100%" height={320 * 0.8}>
        <LineChart data={tempData} style={{ background: 'lightpurple' }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Legend />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="orange"
            name="Temperature"
          />
          <Line
            type="monotone"
            dataKey="minTemp"
            stroke="#82ca9d"
            name="Min Temperature"
          />
          <Line
            type="monotone"
            dataKey="maxTemp"
            stroke="#ff0000"
            name="Max Temperature"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
