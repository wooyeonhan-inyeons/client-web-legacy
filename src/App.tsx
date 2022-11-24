import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoil_User } from "./recoil/index";
import { USER_ROLE } from "./constants";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import Admin from "./page/Admin";
import Home from "./page/Home";
import AdminLogin from "./page/Admin/Login";
import NoMatch from "./page/NoMatch";
import Login from "./page/Login";
import Mypage from "./page/MyPage";
import { LoginRedirect } from "./components/api";

function App() {
  const [user, setUser] = useRecoilState(recoil_User.userState);

  const getUser = () => {
    //api로 user 정보 불러오기
  };

  const router = createBrowserRouter([
    {
      path: "/*",
      element: <Home />,
      errorElement: <NoMatch />,
    },
    {
      path: "admin/*",
      children: [
        {
          path: "login",
          element: <AdminLogin />,
          loader: () => user.role === USER_ROLE.ADMIN && redirect("/admin"),
        },
        {
          path: "*",
          element: <Admin />,
          loader: () =>
            user.role !== USER_ROLE.ADMIN && redirect("/admin/login"),
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
      loader: () => user.role !== USER_ROLE.GUEST && redirect("/"),
    },
    {
      path: "mypage",
      element: <Mypage />,
      loader: () => user.role === USER_ROLE.GUEST && redirect("/"),
    },
    {
      path: "auth/kakao/redirect",
      element: <LoginRedirect />,
      // loader: () => {},
    },
  ]);

  useEffect(() => {
    getUser();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
