import { Grid, Box, Dialog, DialogTitle } from "@mui/material";

export default function Forecast(props) {
  const { forecastData } = props;
  console.log("city" in forecastData);
  if (!("city" in forecastData)) {
    return <div></div>;
  }

  const display = forecastData.list.map(({ main, weather, dt_txt }, i) => {
    return (
      <Box key={dt_txt} className="forecast-div">
        <h5>{dt_txt}</h5>
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].main + "photo"}
        />
        <h6>
          {weather[0].main} {main.temp}°C
        </h6>
      </Box>
    );
  });

  return (
    <Dialog
      open={"city" in forecastData !== undefined}
      onClose={() => props.handleClose()}
    >
      <DialogTitle>{forecastData.city.name}</DialogTitle>
      <Grid className="forecast-list">{display}</Grid>
    </Dialog>
  );
}
