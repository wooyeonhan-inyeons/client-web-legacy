import React, { useEffect } from "react";
import { recoil_User } from "./recoil/index";
import { useRecoilState } from "recoil";
import RouterIndex from "./routes";

function App() {
  const [user, setUser] = useRecoilState(recoil_User.user);

  const getUser = () => {
    console.log("GetUser");
    // setUser()
  };

  useEffect(() => {
    getUser();
  }, []);

  return <RouterIndex />;
}

export default App;
