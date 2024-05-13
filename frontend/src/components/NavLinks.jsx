import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function NavLinks() {
  return (
    <Wrapper>
      <NavLink>About</NavLink>
      <NavLink>Write</NavLink>
    </Wrapper>
  );
}

// Navlinks-container-div styled components
const Wrapper = styled.div`
  display: flex;

  /* navlink */
  a {
    margin-right: 1em;
  }
`;

export default NavLinks;
