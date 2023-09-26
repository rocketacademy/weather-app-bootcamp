import React from "react";
import logo from "./logo.png";
import "./App.css";
import Weather from "./weather";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Enter city to check the weather</h1>
        <Weather />
      </header>
    </div>
  );
}

export default App;
