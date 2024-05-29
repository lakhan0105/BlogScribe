import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logoutUser } from "../features/user/userSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  function handleLogout() {
    console.log("handle logout");
    dispatch(logoutUser());
  }

  return (
    <Wrapper className="btn" onClick={handleLogout}>
      logout
    </Wrapper>
  );
}

// Styling
const Wrapper = styled.button`
  background-color: transparent;
  border: none;
`;

export default LogoutBtn;
