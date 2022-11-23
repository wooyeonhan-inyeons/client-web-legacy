import React from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

import { Button } from "antd";

import { USER_ROLE } from "../../constants";
import { recoil_User } from "../../recoil";

const Home = () => {
  const [user, setUser] = useRecoilState(recoil_User.userState);

  const resetUser = useResetRecoilState(recoil_User.userState);

  return (
    <>
      <h1>Home</h1>
      <a href="/login">login</a> <br />
      <br />
      <a href="/admin">admin page</a> <br />
      <br />
      <a href="/mypage">my page</a> <br />
      <br />
      {user.role === USER_ROLE.GUEST ? (
        <Button onClick={() => setUser({ userId: 0, role: USER_ROLE.USER })}>
          [임시] 유저 로그인
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={() => {
            resetUser();
            localStorage.removeItem("key");
          }}
        >
          [임시] 로그아웃
        </Button>
      )}
      <Outlet />
    </>
  );
};

export default Home;
