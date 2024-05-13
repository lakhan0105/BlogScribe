import React from "react";
import styled from "styled-components";

function Logo() {
  return (
    <Wrapper className="logo-container">
      <h2 className="logo">BlogScribe</h2>
    </Wrapper>
  );
}

// Styled component
const Wrapper = styled.div`
  .logo {
    /* color: red; */
  }
`;

export default Logo;
