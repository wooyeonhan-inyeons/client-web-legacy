import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoil_ } from ".././recoil/index";
import { USER_ROLE } from ".././constants";
import { useNavigate } from "react-router-dom";
import { BACK_URL } from "../constants/GlobalConstants";
import TestPostData from "./TestPost.json";

export const GetUser = async () => {
  const response = await fetch(`${BACK_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  });
  console.log("USER", response);
};

export const LoginRedirect = () => {
  const [user, setUser] = useRecoilState(recoil_.userState);
  const query = window.location.search.split("=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("key", query);
    setUser({ userId: 0, role: USER_ROLE.ADMIN });
  });

  useEffect(() => {
    if (user.role === USER_ROLE.USER) navigate("/");
  }, [user]);

  return <></>;
};

export interface TestType {
  id: number;
  content: string;
  url: string;
  latitude: number;
  longitude: number;
}

export const GetTestPost = async () => {
  const response = await [TestPostData[0], TestPostData[1]];

  // console.log(response);
  return response;
};
