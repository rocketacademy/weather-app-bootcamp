import { TableCell, Table, TableRow, Button } from "@mui/material";
import React from "react";
import Forecast from "./Forecast";

export default class WeatherData extends React.Component {
  constructor() {
    super();
    this.state = { button: [] };
  }

  handleClick = (i) => {};

  render() {
    const { weatherData } = this.props;
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
          {/* <Button variant="contained" onClick={() => this.handleClick(i)}>
            Testing
          </Button> */}
        </TableRow>
      );
    });
    this.setState({ button: buttonState });
    return (
      <Table>
        {/* <Forecast /> */}
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
