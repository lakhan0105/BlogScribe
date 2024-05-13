import React from "react";
import { Outlet } from "react-router-dom";
import { BigNavbar, SmallNavbar } from "../components/index";

function RootLayout() {
  return (
    <>
      <nav className="nav">
        <BigNavbar />
        <SmallNavbar />
      </nav>

      <Outlet />
    </>
  );
}

export default RootLayout;
