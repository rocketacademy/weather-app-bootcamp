import React from "react";
import "./App.css";
import axios from "axios";
import CallApi from './Components/CallApi'
import logo from './logo.png';



function App() {
    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        <CallApi/>
      </div>
    );
  }



export default App;

//create input field
//provide instructions so users know to enter a city name in the input
//use API to retrieve weather in that city, display it to the user.
//GET request
// use geocoding API to translate locatino names to coordinate
//update weather when user inputs new city / submits same city again
