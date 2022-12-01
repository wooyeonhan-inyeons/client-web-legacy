import { Outlet } from "react-router-dom";
import AdminHome from "./Home";
import "antd/dist/antd.min.css"; // or 'antd/dist/antd.less'

const Admin = () => {
  return (
    <>
      <AdminHome />
      <Outlet />
    </>
  );
};

export default Admin;
