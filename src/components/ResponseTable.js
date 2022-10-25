import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { WeatherLineChart } from "./WeatherLineChart";

export function ResponseTable({
  city,
  icon,
  description,
  forecastCity,
  forecastList,
}) {
  const nowDate = new Date().toLocaleDateString();
  const nowTime = new Date().toLocaleTimeString();
  return (
    <div>
      <h1>Current Weather</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Country / City</TableCell>
              <TableCell align="right">Date / Time</TableCell>
              <TableCell align="right">Icon</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{city}</TableCell>
              <TableCell align="right">{nowDate} {nowTime}</TableCell>
              <TableCell align="right">
                <img src={icon} alt="weather icon"></img>
              </TableCell>
              <TableCell align="right">{description}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <h1>Forecast (next 5 days)</h1>
      <WeatherLineChart forecastList={forecastList}/>
      <br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Country / City</TableCell>
              <TableCell align="right">Date / Time</TableCell>
              <TableCell align="right">Icon</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forecastList.map((item, index) => 
              <TableRow key={index}>
                <TableCell>{forecastCity}</TableCell>
                <TableCell align="right">{item.dt_txt}</TableCell>
                <TableCell align="right">
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt="weather icon"
                  />
                </TableCell>
                <TableCell align="right">
                  {item.weather[0].description}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
