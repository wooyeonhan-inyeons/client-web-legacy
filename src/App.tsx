import React, { useEffect } from "react";
import { recoil_User } from "./recoil/index";
import { useRecoilState } from "recoil";
import { USER_ROLE } from "./constants";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import Admin from "./page/Admin";
import Home from "./page/Home";
import Login from "./page/Admin/Login";
import NoMatch from "./page/NoMatch";

function App() {
  const [user, setUser] = useRecoilState(recoil_User.user);

  const getUser = () => {
    setUser({ userId: 1, role: USER_ROLE.ADMIN });
  };

  const HeaderLayout = () => (
    <>
      <a href="/">home</a>
      <br />
      <a href="/admin">admin</a>
      <br />
      <a href="/admin/login">admin login</a>
    </>
  );

  const redirectUser = () => {
    if (user.role === 2) {
      console.log("redirect");
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NoMatch />,
    },
    {
      path: "admin/*",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "*",
          element: <Admin />,
        },
      ],
      loader: redirectUser,
    },
  ]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <HeaderLayout />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
