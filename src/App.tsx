import { useEffect } from "react";

import { useRecoilState, useResetRecoilState } from "recoil";
import { recoil_ } from "./recoil/index";
import { USER_ROLE } from "./constants";

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
import { MyPostes } from "./page/MyPage/Postes";
import { Detail } from "./page/Home/Detail";
import { Write } from "./page/Write";
import { LoginRedirect } from "./components/api/loginRedirect";
import { GetVaildToken } from "./components/api/getVaildToken";
import { MyDetail } from "./page/MyPage/Detail";
// import { useQuery } from "react-query";

function App() {
  const [user] = useRecoilState(recoil_.userState);
  const resetUser = useResetRecoilState(recoil_.userState);

  const router = createBrowserRouter([
    {
      path: "/*",
      element: <Home />,
      errorElement: <NoMatch />,
      children: [
        {
          path: "detail/:post_id",
          element: <Detail />,
        },
      ],
      loader: () => user.role === USER_ROLE.GUEST && redirect("/login"),
    },
    {
      path: "write/",
      element: <Write />,
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
          path: "detail/:post_id",
          element: <MyDetail />,
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

  return <RouterProvider router={router} />;
}

export default App;
