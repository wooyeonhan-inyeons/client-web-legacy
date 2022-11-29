import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { Button } from "antd";
import { USER_ROLE } from "../../constants";
import { recoil_User } from "../../recoil";

const Home = () => {
  const [user, setUser] = useRecoilState(recoil_User.userState);
  const resetUser = useResetRecoilState(recoil_User.userState);
  const navigate = useNavigate();

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
        <Button
          onClick={() =>
            navigate(
              "/auth/kakao/redirect?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzhhOTA4Y2ItMzAzMi00MTMwLWFiMWEtYjk2N2U0NjlkZmM5IiwibmFtZSI6IuydtOuPhOqyvSIsImVtYWlsIjoiZG85OEBrYWthby5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY2OTI5MDg1NSwiZXhwIjoxNjY5Mzc3MjU1fQ.34arnfIwuuqKDIXuzcGqArSlIYS1j6WrhcsXyptHyM0"
            )
          }
        >
          [임시, 유저] 카카오 로그인
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
