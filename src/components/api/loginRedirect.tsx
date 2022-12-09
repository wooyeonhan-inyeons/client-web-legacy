import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { USER_ROLE } from "../../constants";
import { recoil_ } from "../../recoil";

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
    //eslint-disable-next-line
  }, [user]);

  return <></>;
};
