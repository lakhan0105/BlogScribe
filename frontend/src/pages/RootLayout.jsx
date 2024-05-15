import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { BigNavbar, Sidebar, SmallNavbar } from "../components/index";

function RootLayout() {
  const [sidebarStatus, setSidebarStatus] = useState(false);

  // closeSidebar
  function closeSidebar() {
    setSidebarStatus(false);
  }

  // openSidebar
  function openSidebar() {
    setSidebarStatus(true);
  }

  return (
    <>
      <nav className="nav">
        <BigNavbar />
        <SmallNavbar openSidebar={openSidebar} />
      </nav>

      <Sidebar closeSidebar={closeSidebar} sidebarStatus={sidebarStatus} />
      <Outlet />
    </>
  );
}

export default RootLayout;
