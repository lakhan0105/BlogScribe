import React from "react";
import styled from "styled-components";

function LogoutBtn() {
  return <Wrapper className="btn">logout</Wrapper>;
}

// Styling
const Wrapper = styled.button`
  background-color: transparent;
  border: none;
`;

export default LogoutBtn;
