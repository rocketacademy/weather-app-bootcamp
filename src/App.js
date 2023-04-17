import React from "react";
import "./App.css";

import sunFace from "./assets/images/sun-with-face_1f31e.png";

import { getLatLon, getWeatherData } from "./scripts/utils";
import {
    Alert,
    Box,
    Button,
    Pagination,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: "",
            lon: "",
            current: { weather: [{ icon: "03d" }] },
            daily: [1, 2, 3, 4, 5, 6, 7, 8, 9, 9],
            hourly: [],
            name: "",

            loaded: "none",
            isShowingData: false,
            error: "",
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (e.target[0].value === "" || e.target[0].value == null) {
            this.setState({ error: "Type something!" });
            return;
        }

        this.setState({ loaded: "loading", error: "" }, () => {
            getLatLon(e.target[0].value)
                .then((data) => {
                    this.setState({ name: data.name });
                    console.log("passing lat lon name data");
                    return getWeatherData(data);
                })
                .then((data) => {
                    console.log("passing hourly daily data");
                    this.setState({
                        current: data.current,
                        hourly: data.hourly,
                        daily: data.daily,
                        loaded: "loaded",
                        isShowingData: true,
                    });
                    console.log("called here");
                })
                .catch((err) => {
                    this.setState({ error: err.message, loaded: "none" });
                    console.log(err.message);
                });
        });
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={sunFace} alt="sun face" />
                    <Typography variant="h1">
                        Check the weather here!
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                        <Stack>
                            <input placeholder="Enter a location..."></input>
                            <Button variant="contained">Submit</Button>
                        </Stack>
                    </form>

                    {this.state.error !== "" && (
                        <Box p={2}>
                            <Alert severity="error">{this.state.error}</Alert>
                        </Box>
                    )}

                    {this.state.loaded === "loading" && (
                        <Typography variant="h2">Fetching data...</Typography>
                    )}
                    {this.state.isShowingData && (
                        <>
                            {/* // <Stack spacing={3} my={3} mx={2} p={2}> */}
                            <Typography variant="h4">
                                Showing data for {this.state.name}
                            </Typography>

                            <Typography variant="h2">
                                CURRENT WEATHER
                            </Typography>
                            <CurrentWeather current={this.state.current} />

                            <Typography variant="h2">DAILY FORECAST</Typography>
                            <DailyForecast daily={this.state.daily} />
                            <br />
                        </>
                    )}
                </header>
            </div>
        );
    }
}

export default App;
