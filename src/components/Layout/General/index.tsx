import Footer from "./Footer";
import TopBar from "./TopBar";
import React from "react";
import { Outlet } from "react-router-dom";

const GeneralLayout = () => {
  return (
    <>
      <TopBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default GeneralLayout;
