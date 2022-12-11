import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { recoil_ } from "../.././recoil/index";
import { USER_ROLE } from "../.././constants";
import { useNavigate } from "react-router-dom";
import { BACK_URL } from "../../constants/GlobalConstants";

export const LoginRedirect = () => {
  const [user, setUser] = useRecoilState(recoil_.userState);
  const query = window.location.search.split("=")[1];
  const navigate = useNavigate();

  useEffect(() => {
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
        localStorage.setItem("key", query);
      });
  });

  useEffect(() => {
    if (user.role === USER_ROLE.USER) navigate("/");
  }, [user]);

  return <></>;
};
