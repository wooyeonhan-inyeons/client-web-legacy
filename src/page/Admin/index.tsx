import { Button } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { recoil_User } from "../../recoil";

const Admin = () => {
  const resetUser = useResetRecoilState(recoil_User.userState);

  const logout = () => {
    resetUser();
    localStorage.removeItem("key");
  };

  return (
    <>
      <h1>ADMIN</h1>
      <a href="/">HOME</a> <br />
      <Button type="primary" onClick={logout}>
        로그아웃
      </Button>
      <Outlet />
    </>
  );
};

export default Admin;
