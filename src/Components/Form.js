import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class WeatherForm extends React.Component {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Form.Label>City</Form.Label>
        <Form.Control
          name="city"
          placeholder="Enter city, e.g. 'London'"
          value={this.props.city}
          onChange={this.props.handleChange}
        />
        <Button variant="light" type="submit">
          Get weather
        </Button>
      </Form>
    );
  }
}
