import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoil_User } from "../.././recoil/index";
import { USER_ROLE } from "../.././constants";
import { useNavigate } from "react-router-dom";

export const LoginRedirect = () => {
  const [, setUser] = useRecoilState(recoil_User.userState);
  const query = window.location.search.split("=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("key", query);
    setUser({ userId: 0, role: USER_ROLE.USER });
    navigate("/");
  }, []);

  return <></>;
};
