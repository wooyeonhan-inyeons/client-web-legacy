import React, { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useRecoilState, useResetRecoilState } from "recoil";
import { recoil_ } from "../recoil";
import { USER_ROLE } from "../constants";
import { BACK_URL } from "../constants/GlobalConstants";
import { useNavigate } from "react-router";

const StartUp = () => {
  const resetUser = useResetRecoilState(recoil_.userState);
  const [user, setUser] = useRecoilState(recoil_.userState);
  //   const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("key") as string;
    if (jwt) {
      const decode = jwtDecode(jwt) as any;
      const exp = decode.exp;
      var expDate = new Date("1970-01-01T00:00:00Z"); // 1970-01-01 GMT
      expDate.setUTCSeconds(exp);
      const curDate = new Date();
      if (expDate < curDate) {
        alert("로그인이 만료되었습니다.");
        localStorage.removeItem("key");
        resetUser();
      }
    }
  }, []);

  //유저의 권한이 바뀔때 실행
  useEffect(() => {
    if (user.role === USER_ROLE.USER) {
      console.log("user wlfhd", user);

      //   console.log("user wlfhd");
      fetch(`${BACK_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUser({ userId: res.user_id, role: USER_ROLE.USER });
          //   navigate("/");
        });
    }

    //eslint-disable-next-line
  }, [user.role]);
  return <></>;
};

export default StartUp;
