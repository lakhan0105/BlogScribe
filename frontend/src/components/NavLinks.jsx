import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function NavLinks({ direction }) {
  return (
    <Wrapper direction={direction}>
      <NavLink>About</NavLink>
      <NavLink to={"writeblog"}>Write</NavLink>
    </Wrapper>
  );
}

// Navlinks-container-div styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.direction === "row" ? "row" : "column")};

  a {
    margin-right: 1em;
  }
`;

export default NavLinks;
