import React from "react";
import { Route } from "react-router-dom";
import Home from "../page/Home";

type Props = {
  path: string;
};

const HomeRouter = (props: Props) => {
  return <Route path={props.path} element={<Home />} />;
};

export default HomeRouter;
