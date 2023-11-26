import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Paper,
} from "@mui/material";

export const Forecast = ({ forecastedResult }) => {
  return (
    <>
      <Container>
        <Paper
          sx={{
            margin: "30px",
            maxHeight: "300px",
            padding: "30px",
            overflow: "scroll",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Icon</TableCell>
                  <TableCell>Temperature</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {forecastedResult.map((forecast, index) => (
                  <TableRow key={index.toString()}>
                    <TableCell>{forecast.dt_txt}</TableCell>

                    <TableCell>
                      <img
                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                        alt={`weather-icon for ${forecast.weather[0].description}`}
                      />
                    </TableCell>
                    <TableCell>{forecast.main.temp}</TableCell>
                    <TableCell>{forecast.weather[0].description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};
