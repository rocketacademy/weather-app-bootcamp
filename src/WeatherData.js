import { TableCell, Table, TableRow, Button } from "@mui/material";
import React from "react";

export default class WeatherData extends React.Component {
  render() {
    const { weatherData, handleShowForecast } = this.props;
    const buttonState = [];
    const display = weatherData.map(({ city, weather, temp }, i) => {
      buttonState.push(false);
      return (
        <TableRow key={city}>
          <TableCell>{city}</TableCell>
          <TableCell>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.main + "photo"}
            />
            {weather.main} {temp}°C
          </TableCell>
          <TableCell>
            <Button variant="contained" onClick={() => handleShowForecast(i)}>
              Show Forecast
            </Button>
          </TableCell>
        </TableRow>
      );
    });
    return (
      <Table>
        <TableRow>
          <TableCell>City:</TableCell>
          <TableCell>Current Weather:</TableCell>
          <TableCell>Forecast</TableCell>
        </TableRow>
        {display}
      </Table>
    );
  }
}
