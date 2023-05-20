import React, { useState } from "react";

const Form = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
    console.log("Submitted: ", inputValue);
    setInputValue("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <label htmlFor="cityInput">City:</label> */}
        <input
          class="form-control form-control-sm"
          style={{ marginRight: "5px" }}
          type="text"
          id="cityInput"
          placeholder="Enter City Name"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit" class="btn btn-primary btn-sm">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
