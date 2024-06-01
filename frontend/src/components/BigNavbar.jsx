import React from "react";
import styled from "styled-components";
import { LoginBtn, Logo, LogoutBtn, NavLinks, SignupBtn } from "./index";
import { useSelector } from "react-redux";

function BigNavbar() {
  const { user } = useSelector((state) => state.userReducer);

  return (
    <Wrapper className="nav-center">
      <Logo />
      <NavLinks direction={"row"} />

      {/* btns container */}
      <div className="btns-container">
        {/* if user then show logout btn */}
        {user && <LogoutBtn />}

        {!user && (
          <>
            <LoginBtn /> <SignupBtn />
          </>
        )}
      </div>
    </Wrapper>
  );
}

// BigNavbar Styled component
const Wrapper = styled.div`
  // hide the BigNavbar by default
  display: none;

  .btns-container {
  }

  @media only screen and (min-width: 700px) {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

export default BigNavbar;
