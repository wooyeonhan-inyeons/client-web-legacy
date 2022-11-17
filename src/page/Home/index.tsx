import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <a href="/admin">Admin page</a>
      <Outlet />
    </>
  );
};

export default Home;
