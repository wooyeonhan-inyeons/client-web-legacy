import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoil_User } from "./recoil/index";
import { USER_ROLE } from "./constants";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import AdminHome from "./page/Admin/Home";
import Home from "./page/Home";
import Login from "./page/Admin/Login";
import NoMatch from "./page/NoMatch";

function App() {
  const [user, setUser] = useRecoilState(recoil_User.userState);

  const getUser = () => {
    //api로 user 정보 불러오기
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
          loader: () => user.role === USER_ROLE.ADMIN && redirect("/admin"),
        },
        {
          path: "*",
          element: <AdminHome />,
          loader: () =>
            user.role !== USER_ROLE.ADMIN && redirect("/admin/login"),
        },
      ],
    },
  ]);

  useEffect(() => {
    getUser();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
