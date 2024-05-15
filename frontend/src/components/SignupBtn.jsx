import React from "react";
import styled, { css } from "styled-components";

function SignupBtn({ sidebarBtn }) {
  return (
    <Wrapper sidebarBtn={sidebarBtn} className="btn">
      signup
    </Wrapper>
  );
}

// button
const Wrapper = styled.button`
  padding: 0.55em 1em;
  border: 1px solid;
  background-color: transparent;

  ${(props) =>
    props.sidebarBtn &&
    css`
      border: none;
      padding: 0;
      margin-top: 0.5em;
    `}
`;
export default SignupBtn;
