import React from "react";
import styled, { css } from "styled-components";

function LoginBtn({ sidebarBtn }) {
  return <Wrapper sidebarBtn={sidebarBtn}>login</Wrapper>;
}

// button
const Wrapper = styled.button`
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5em 1em;
  text-transform: capitalize;
  background-color: transparent;
  border-radius: 0.2em;
  border: none;
  margin-right: 0.5em;

  ${(props) =>
    props.sidebarBtn &&
    css`
      padding: 0;
      margin: 0;
    `}
`;

export default LoginBtn;
