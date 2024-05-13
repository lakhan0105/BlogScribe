import React from "react";
import styled from "styled-components";

function SignupBtn() {
  return <Wrapper>signup</Wrapper>;
}

// button
const Wrapper = styled.button`
  font-size: 0.9rem;
  text-transform: capitalize;
  padding: 0.55em 1em;
  border: 1px solid;
  cursor: pointer;
  background-color: #4548dde3;
  background-color: transparent;
  /* color: #fff; */
  border-radius: 0.2em;
`;
export default SignupBtn;
