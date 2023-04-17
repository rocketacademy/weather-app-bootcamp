import {
    Container,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { format } from "date-fns";
import Image from "mui-image";
import React, { Component } from "react";

function toSeconds(num) {
    return +num * 1000;
}

class DailyForecast extends Component {
    render() {
        return (
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Day/Date</TableCell>
                                <TableCell align="center">Weather</TableCell>
                                <TableCell align="center">
                                    Description
                                </TableCell>
                                <TableCell align="center">
                                    Precip. (%)
                                </TableCell>
                                <TableCell align="center">
                                    Temp, min (°C)
                                </TableCell>
                                <TableCell align="center">
                                    Temp, max (°C)
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.daily.map((day) => (
                                <TableRow
                                    key={day.dt}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {format(
                                            new Date(toSeconds(day.dt)),
                                            "cccc"
                                        )}{" "}
                                        {format(
                                            new Date(toSeconds(day.dt)),
                                            "dd/MM"
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack alignItems={"center"}>
                                            <Image
                                                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                                showLoading
                                                width={100}
                                            />
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center">
                                        {day.weather[0].main}
                                    </TableCell>
                                    <TableCell align="center">
                                        {day.pop}
                                    </TableCell>
                                    <TableCell align="center">
                                        {day.temp.min}
                                    </TableCell>
                                    <TableCell align="center">
                                        {day.temp.max}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
    }
}

export default DailyForecast;
