// import jwt from "jsonwebtoken";
import jwt from "jwt-decode";

export const GetVaildToken = () => {
  const decoded: jwtProps = jwt(localStorage.getItem("key") as any);
  const tokenTime = new Date(decoded.exp * 1000);
  const newTime = new Date().getTime();

  if (Number(tokenTime) < Number(newTime)) {
    return true;
  }
  return false;
};

interface jwtProps {
  email: string;
  exp: number;
  iat: number;
  name: string;
  role: string;
  user_id: string;
}
