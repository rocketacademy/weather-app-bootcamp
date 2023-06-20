import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const WeatherGraph = ({ hourlyForecast, dailyForecast }) => {
  return (
    <div>
      <h2>3hr Forecast</h2>

      <LineChart width={800} height={400} data={hourlyForecast}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dt_txt" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="main.temp"
          name="Temperature"
          stroke="#8884d8"
        />
      </LineChart>
      <h2>24hr Forecast</h2>

      <LineChart width={800} height={400} data={dailyForecast}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dt_txt" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="main.temp"
          name="Temperature"
          stroke="#8884d8"
        />
      </LineChart>
    </div>
  );
};

export default WeatherGraph;
