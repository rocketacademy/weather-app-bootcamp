import React from "react";
import logo from "./logo.png";
import "./App.css";
import { Form } from "./form.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
    };
  }

  updateCity = (event) => {
    // extract the value from the event out
    console.log(event);
    this.setState({
      city: [event],
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Form onUpdate={this.updateCity} />
        </header>
      </div>
    );
  }
}

export default App;
