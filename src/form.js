import React, { useState } from "react";

const defaultValues = {
  cityName: "",
};

export const Form = (props) => {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormValues({
      cityName: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onUpdate(formValues);
    setFormValues({
      cityName: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        City Name:
        <input
          type="text"
          value={formValues.cityName}
          onChange={handleInputChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};
