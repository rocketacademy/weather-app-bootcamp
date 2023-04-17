import {
    Container,
    Grid,
    Paper,
    Stack,
    Typography,
    styled,
} from "@mui/material";
import { format } from "date-fns";
import Image from "mui-image";
import React, { Component } from "react";

const ItemGrid = styled(Grid)({
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
});

function toSeconds(num) {
    return +num * 1000;
}

class CurrentWeather extends Component {
    render() {
        return (
            <Container maxWidth="md">
                <Paper sx={{ padding: 2 }}>
                    <ItemGrid container>
                        <ItemGrid item xs={12}>
                            <Typography variant="h4">
                                Current Weather Forecast
                            </Typography>
                            <Typography variant="body1" component={"h6"}>
                                as at{" "}
                                <Typography variant="h6" component={"h6"}>
                                    {format(
                                        new Date(
                                            toSeconds(this.props.current.dt)
                                        ),
                                        "PPP, pp"
                                    )}
                                </Typography>
                            </Typography>
                        </ItemGrid>
                        <ItemGrid item xs={5}>
                            <Stack alignItems={"center"}>
                                <Image
                                    src={`http://openweathermap.org/img/wn/${this.props.current.weather[0].icon}@2x.png`}
                                    width={150}
                                    showLoading
                                />
                                <Typography
                                    variant="body1"
                                    sx={{ textTransform: "capitalize" }}
                                >
                                    {this.props.current.weather[0].description}
                                </Typography>
                            </Stack>
                        </ItemGrid>
                        <ItemGrid container item xs={7}>
                            <ItemGrid item xs={6}>
                                <Typography variant="h6">Sunrise</Typography>
                                <Typography variant="body1">
                                    {format(
                                        new Date(
                                            toSeconds(
                                                this.props.current.sunrise
                                            )
                                        ),
                                        "p"
                                    )}
                                </Typography>
                            </ItemGrid>
                            <ItemGrid item xs={6}>
                                <Typography variant="h6">Sunset</Typography>
                                <Typography variant="body1">
                                    {format(
                                        new Date(
                                            toSeconds(this.props.current.sunset)
                                        ),
                                        "p"
                                    )}
                                </Typography>
                            </ItemGrid>
                            <ItemGrid item xs={6}>
                                <Typography variant="h6">
                                    Temperature
                                </Typography>
                                <Typography variant="body1">
                                    {this.props.current.temp}°C
                                </Typography>
                            </ItemGrid>
                            <ItemGrid item xs={6}>
                                <Typography variant="h6">Feels like</Typography>
                                <Typography variant="body1">
                                    {this.props.current.feels_like}°C
                                </Typography>
                            </ItemGrid>
                            <ItemGrid item xs={6}>
                                <Typography variant="h6">Pressure</Typography>
                                <Typography variant="body1">
                                    {this.props.current.pressure} hPa
                                </Typography>
                            </ItemGrid>
                            <ItemGrid item xs={6}>
                                <Typography variant="h6">Humidity</Typography>
                                <Typography variant="body1">
                                    {this.props.current.humidity}%
                                </Typography>
                            </ItemGrid>
                            <ItemGrid item xs={6}>
                                <Typography variant="h6">Wind Speed</Typography>
                                <Typography variant="body1">
                                    {this.props.current.wind_speed} m/s
                                </Typography>
                            </ItemGrid>
                            <ItemGrid item xs={6}>
                                <Typography variant="h6">UV Index</Typography>
                                <Typography variant="body1">
                                    {this.props.current.uvi}
                                </Typography>
                            </ItemGrid>
                        </ItemGrid>
                    </ItemGrid>
                </Paper>
            </Container>
        );
    }
}

export default CurrentWeather;
