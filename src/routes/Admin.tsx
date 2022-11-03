import React from "react";
import { Route } from "react-router-dom";
import Admin from "../page/Admin";

type Props = {
  path: string;
};

const AdminRouter = (props: Props) => {
  return <Route path={props.path} element={<Admin />} />;
};

export default AdminRouter;
