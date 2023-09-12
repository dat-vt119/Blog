import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import React from "react";

function Root() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}

export default Root;
