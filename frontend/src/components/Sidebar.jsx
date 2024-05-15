import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import LoginBtn from "./LoginBtn";
import SignupBtn from "./SignupBtn";

function Sidebar({ sidebarStatus, closeSidebar }) {
  return (
    <Wrapper className={sidebarStatus ? "" : "hide"}>
      <header className="header">
        <Logo />
        <button className="hamburger" onClick={closeSidebar}>
          X
        </button>
      </header>

      <div className="links">
        <NavLinks direction={"column"} />

        <div className="btn-links-cont">
          <LoginBtn sidebarBtn={true} />
          <SignupBtn sidebarBtn={true} />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: #fff;
  padding: 1em;

  .header {
    display: flex;
    justify-content: space-between;
  }

  .links {
    margin-top: 1.5em;
    line-height: 1.5;
  }

  .btn-links-cont {
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media only screen and (min-width: 700px) {
    display: none;
  }
`;

export default Sidebar;
