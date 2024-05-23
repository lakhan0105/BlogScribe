import React from "react";
import styled from "styled-components";

function FormInput({ name, label, type, handleChange }) {
  return (
    <Wrapper>
      {/* <label htmlFor={name} className="label">
        {label || name}
      </label> */}
      <input
        name={name}
        type={type}
        id={name}
        autoComplete="off"
        autoSave="off"
        onChange={handleChange}
        placeholder={label || name}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  border-bottom: 1px solid #b1b0b0;
  margin-top: 2em;
  background-color: transparent;

  input {
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
    width: 100%;
    padding: 0.2em 0.1em;
    border: none;
    outline: none;
    background-color: transparent;
  }
`;

export default FormInput;
