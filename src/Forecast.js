import { Grid, Box, Dialog, DialogTitle } from "@mui/material";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";

export default function Forecast(props) {
  const { forecastData } = props;
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

  const graph = (
    <LineChart
      width={550}
      height={250}
      data={forecastData.list}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid />
      <XAxis dataKey="dt_txt" />
      <Tooltip />
      <YAxis
        label={{ value: "Tempurature", angle: -90, position: "insideLeft" }}
        unit="°C"
        domain={["auto", "auto"]}
      />
      <Line type="monotone" dataKey="main.temp" stroke="#82ca9d" />
    </LineChart>
  );

  return (
    <Dialog
      open={"city" in forecastData !== undefined}
      onClose={() => props.handleClose()}
    >
      <DialogTitle>{forecastData.city.name}</DialogTitle>
      <Grid className="forecast-list">{display}</Grid>
      {graph}
    </Dialog>
  );
}
