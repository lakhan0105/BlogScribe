import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function NavLinks({ direction }) {
  const { user } = useSelector((state) => state.userReducer);
  const currUserId = user?.targets[0].userId;

  return (
    <Wrapper direction={direction}>
      <NavLink>About</NavLink>
      <NavLink to={"writeblog"}>Write</NavLink>
      {user && <NavLink to={`singleprofile/${currUserId}`}>Profile</NavLink>}
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
