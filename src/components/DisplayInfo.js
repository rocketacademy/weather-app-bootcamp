import React from 'react';

export const DisplayInfo = ({ displayInfo }) => {
  console.log(displayInfo);
  return (
    <div className="item2">
      <div>
        <h4 className="todays-temp"> Todays weather</h4>
        <img src={displayInfo.weatherIcon} className="App-logo " alt="logo" />
      </div>
      <div>
        <p>current temp: {displayInfo.temp}</p>
        <p>feels like: {displayInfo.feels_like}</p>
        <p>min temp: {displayInfo.temp_min}</p>
        <p>max temp: {displayInfo.temp_max}</p>
      </div>
    </div>
  );
};
