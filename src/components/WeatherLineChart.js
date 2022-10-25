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

export function WeatherLineChart({ forecastList }) {

  return (
    <div style={{width:"90%"}}>
      <LineChart
        width={700}
        height={300}
        data={forecastList}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dt_txt" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="main.temp" stroke="#8884d8" />
        <Line type="monotone" dataKey="main.humidity" stroke="#82ca9d" />
      </LineChart>
    </div>
      
  );
}
