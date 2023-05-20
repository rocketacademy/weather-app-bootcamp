import React, { useState } from "react";
import "./App.css";
import Form from "./Component/Form";
import WeatherData from "./Component/WeatherData";

const App = () => {
  const [city, setCity] = useState("");

  const handleFormSubmit = (city) => {
    setCity(city);
  };

  return (
    <div className="app">
      {/* <h1>Caleb's Weather App</h1> */}
      <br />
      <WeatherData city={city} />
      <br />
      <Form onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;
