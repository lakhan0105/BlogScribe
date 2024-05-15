import React from "react";
import styled from "styled-components";
import { LoginBtn, Logo, NavLinks, SignupBtn } from "./index";

function BigNavbar() {
  return (
    <Wrapper className="nav-center">
      <Logo />
      <NavLinks direction={"row"} />

      {/* btns container */}
      <div className="btns-container">
        <LoginBtn />
        <SignupBtn />
      </div>
    </Wrapper>
  );
}

// BigNavbar Styled component
const Wrapper = styled.div`
  // hide the BigNavbar by default
  display: none;

  @media only screen and (min-width: 700px) {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

export default BigNavbar;
