import React from 'react';
import {LineChart, CartesianGrid, XAxis, YAxis,Tooltip, Legend, Line, ResponsiveContainer} from 'recharts';
import Plot from 'react-plotly.js';
/* <Forecast forecast = {this.state.forecast}/> 
return temperature, weather, weather desc

data.list[n].dt
data.list[n].main.temp
data.list[n].weather.main
data.list[n].weather.description
*/

export function Forecast(props) {
    if (!props.forecast){
        return;
    } else {
        const forecastTable = (props.forecast.data.list).map((threeHourForecast) => 
            <tr key = {threeHourForecast.dt}>
                <td>{threeHourForecast.dt_txt}</td>
                <td>{threeHourForecast.main.temp}</td>
                <td>{threeHourForecast.weather[0].main}</td>
                <td><img src = {`https://openweathermap.org/img/wn/${threeHourForecast.weather[0].icon}@2x.png`}/></td>
                <td>{threeHourForecast.weather[0].description}</td>
            </tr>
         )
         const data = (props.forecast.data.list).map((threeHourForecast) =>{
           return {
            'name': `${(threeHourForecast.dt)}`, 
            'Temperature':`${threeHourForecast.main.temp}`, 
            'Weather':`${threeHourForecast.weather[0].main}`,
            'Icon':<img src = {`https://openweathermap.org/img/wn/${threeHourForecast.weather[0].icon}@2x.png`}/>
        }
        })
        const plotX = (props.forecast.data.list).map((threeHourForecast) => threeHourForecast.dt_txt)
        console.log(plotX)
        const plotY = (props.forecast.data.list).map((threeHourForecast) => threeHourForecast.main.temp)
        console.log(plotY)
        const plotText = (props.forecast.data.list).map((threeHourForecast) => threeHourForecast.weather[0].main)
        
        return (
            <div>
                <table>
                    <tr>
                        <th>Time</th>
                        <th>Temperature</th>
                        <th>Weather</th>
                        <th>Icon</th>
                        <th>Description</th>
                    </tr>
                    {forecastTable}
                </table>
                <ResponsiveContainer width={730} height={500}>
                <LineChart  data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" label = 'Time' tickFormatter = {(time)=>new Date(time*1000).getHours()}/>
                    <YAxis dataKey = 'Temperature' label = 'Temperature' domain={['dataMin', 'dataMax']} />
                    <Tooltip content = <p></p>/>
                    <Legend />
                    <Line type="monotone" dataKey="Temperature" stroke="ffffff"/>
                </LineChart>
                </ResponsiveContainer>
                <Plot
                    data={[
                        {
                            x: plotX,
                            y: plotY,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                            text:plotText,
                        },
                       // { type: 'line', x: [1, 2, 3], y: [2, 5, 3] },
                    ]}
                    layout={{ width: 730, height: 500, title: 'Weather forecast - next 5 days' }}
                />

            </div>
        )
    }
}