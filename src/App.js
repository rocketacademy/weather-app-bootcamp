import React from "react";
import "./App.css";
import CallApi from "./Component/CallApi";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <CallApi />
      </div>
    );
  }
}

export default App;
