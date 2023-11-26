import { Paper, Container, Typography } from "@mui/material";

export const Weather = ({ weatherResult }) => {
  const { city, maxTemp, minTemp, humidity, temp, weatherInfo } = weatherResult;

  return (
    <Container maxWidth="xs">
      <Paper sx={{ margin: "10px", padding: "10px" }}>
        <Typography variant="h5">
          Weather Forecast for:<br></br>
          {city}
        </Typography>

        <img
          src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
          alt={`weather-icon for ${weatherInfo.description}`}
        />

        <Typography variant="h6">Temperature: {temp}°C</Typography>
        <Typography variant="subtitle2">{weatherInfo.description}</Typography>
        <Typography variant="subtitle2">Humidity: {humidity}%</Typography>
        <br></br>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2">H: {maxTemp}°C</Typography>
          <Typography variant="subtitle2">L: {minTemp}°C</Typography>
        </div>
      </Paper>
    </Container>
  );
};
