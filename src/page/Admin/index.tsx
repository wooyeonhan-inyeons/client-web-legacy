import React from "react";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <h1>ADMIN</h1>
      <Outlet />
    </>
  );
};

export default Admin;
