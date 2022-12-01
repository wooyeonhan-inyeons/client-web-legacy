import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { recoil_ } from "./recoil/index";
import { USER_ROLE } from "./constants";
import { GetUser } from "./Hooks";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import Edit from "./page/FriendsPage/Edit";
import FriendsPage from "./page/FriendsPage";
import Admin from "./page/Admin";
import Home from "./page/Home";
import AdminLogin from "./page/Admin/Login";
import NoMatch from "./page/NoMatch";
import Login from "./page/Login";
import Mypage from "./page/MyPage";
import { LoginRedirect } from "./Hooks";
import { MyPostes } from "./page/MyPage/Postes";
import { Detail } from "./page/Home/Detail";

function App() {
  const [user] = useRecoilState(recoil_.userState);

  // const { data } = useQuery("userInfo", GetUser, {
  //   retry: 1,
  //   refetchOnReconnect: false,
  //   onSuccess: (res) => {
  //     // console.log(res);
  //   },
  // });

  const router = createBrowserRouter([
    {
      path: "/*",
      element: <Home />,
      errorElement: <NoMatch />,
      children: [
        {
          path: "detail",
          element: <Detail />,
        },
      ],
      loader: () => user.role === USER_ROLE.GUEST && redirect("/login"),
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
      path: "mypage/*",
      children: [
        {
          path: "postes/*",
          element: <MyPostes />,
        },
        {
          path: "friends",
          element: <FriendsPage />,
        },
        {
          path: "edit",
          element: <Edit />,
        },
        {
          path: "*",
          element: <Mypage />,
        },
      ],
      loader: () => user.role === USER_ROLE.GUEST && redirect("/login"),
    },
    {
      path: "auth/kakao/redirect",
      element: <LoginRedirect />,
      loader: () => user.role !== USER_ROLE.GUEST && redirect("/login"),
    },
  ]);

  useEffect(() => {
    // getUser();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
