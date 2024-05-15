import React from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import Logo from "./Logo";

function SmallNavbar({ openSidebar }) {
  return (
    <Wrapper className="nav-center">
      <button className="hamburger" onClick={openSidebar}>
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

  @media only screen and (min-width: 700px) {
    // hide the smallNavbar > 700px
    display: none;
  }
`;

export default SmallNavbar;
