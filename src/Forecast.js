export default function Forecast(props) {
  const { forecastData } = props;
  if (!forecastData.length) {
    return <div></div>;
  }
  return <div>Okay </div>;
}
