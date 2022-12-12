import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { BACK_URL } from "../../constants/GlobalConstants";
import { recoil_ } from "../../recoil";
import { USER_ROLE } from "../../constants";

export const LoginRedirect = () => {
  const [user, setUser] = useRecoilState(recoil_.userState);
  const navigate = useNavigate();
  const query = window.location.search.split("=")[1];

  useEffect(() => {
    if (query) {
      localStorage.setItem("key", query);
      setUser({
        role: USER_ROLE.USER,
      });
    } else {
      alert("비정상적인 접근입니다.");
      navigate("/");
    }
  }, []);

  return <></>;
};
