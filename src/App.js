import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }
  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    const { inputValue } = this.state;
    if (
      inputValue === "" ||
      inputValue.toUpperCase() === inputValue.toLowerCase()
    ) {
      alert("Please enter a proper city name first.");
    } else {
      console.log("testing")
      // axios
      //   .get(
      //     `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=`
      //   )
      //   .then((response) => {
      //     console.log(response);
      //     return <div>{response}</div>
        
      //   });
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Please enter a city name to check its weather:</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                type="text"
                name="inputValue"
                value={this.state.inputValue}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
