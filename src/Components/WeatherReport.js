import React from 'react';

export function WeatherReport(props) {
    if (!props.weatherData){
        return;
    } else {
        const icon = props.weatherData.weather[0].icon;
        return(
            <div>Weather: {props.weatherData.weather[0].main}
            <img src = {`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
            <br />
            Description: {props.weatherData.weather[0].description}
            <br />
            Temperature: 
            <table>
                <tr>
                    <th>High</th>
                    <th>Mean</th>
                    <th>Low</th>
                </tr>
                <tr>
                    <td>{props.weatherData.main.temp_max}</td>
                    <td>{props.weatherData.main.temp}</td>
                    <td>{props.weatherData.main.temp_min}</td>
                </tr>
            </table>
            </div>
        )
    }
}