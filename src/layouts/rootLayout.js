import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container-fluid pt-2">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
