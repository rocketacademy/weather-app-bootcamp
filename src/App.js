import React from "react";
import "./App.css";
import CallApi from "./Component/CallApi";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Weather App</h1>
          <CallApi />
        </header>
      </div>
    );
  }
}

export default App;
