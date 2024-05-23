import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

function SignupBtn({ $sidebarBtn }) {
  const { user } = useSelector((state) => state.userReducer);

  if (!user) {
    return (
      <Wrapper $sidebarBtn={$sidebarBtn} className="btn">
        <NavLink to={"/register"}>signup</NavLink>
      </Wrapper>
    );
  }
}

// button
const Wrapper = styled.button`
  padding: 0.55em 1em;
  border: 1px solid;
  background-color: transparent;

  ${(props) =>
    props.$sidebarBtn &&
    css`
      border: none;
      padding: 0;
      margin-top: 0.5em;
    `}
`;
export default SignupBtn;
