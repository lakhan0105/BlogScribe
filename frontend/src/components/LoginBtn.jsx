import React from "react";
import styled from "styled-components";

function LoginBtn() {
  return <Wrapper>login</Wrapper>;
}

// button
const Wrapper = styled.button`
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5em 1em;
  text-transform: capitalize;
  background-color: transparent;
  border-radius: 0.2em;
  /* border: 1px solid #1b1f2326; */
  border: none;
  margin-right: 0.5em;
`;

export default LoginBtn;
