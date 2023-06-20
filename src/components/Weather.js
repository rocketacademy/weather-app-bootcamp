import React from "react";

export default class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.main = props.weather.main;
    this.description = props.weather.description;
    this.icon = props.weather.icon;
  }

  render() {
    console.log(this.props, "props");
    return (
      <div>
        <h2>{this.main}</h2>
        <img src={this.icon} alt={this.name} />
        <p>{this.description}</p>
      </div>
    );
  }
}
