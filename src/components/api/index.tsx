import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoil_ } from "../.././recoil/index";
import { USER_ROLE } from "../.././constants";
import { useNavigate } from "react-router-dom";

export const LoginRedirect = () => {
  const [, setUser] = useRecoilState(recoil_.userState);
  const query = window.location.search.split("=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("key", query);
    setUser({ userId: 0, role: USER_ROLE.USER });

    // navigate("/");
    window.location.href = "/";
  }, []);

  return <></>;
};
