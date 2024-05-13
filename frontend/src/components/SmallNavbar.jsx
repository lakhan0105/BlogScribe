import React from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import Logo from "./Logo";

function SmallNavbar() {
  return (
    <Wrapper className="nav-center">
      <button className="hamburger">
        <FaBars />
      </button>
      <Logo />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .hamburger {
    border: none;
    background-color: transparent;
    font-size: 1.5rem;
    padding: 0;
    display: flex;
    cursor: pointer;
  }

  @media only screen and (min-width: 700px) {
    // hide the smallNavbar > 700px
    display: none;
  }
`;

export default SmallNavbar;
