import { Button } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { recoil_User } from "../../recoil";

const Admin = () => {
  
  return (
    <>
      <h1>ADMIN</h1>
      <a href="/">HOME</a> <br/>

      <Outlet />
    </>
  );
};

export default Admin;
