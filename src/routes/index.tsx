import react from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "../page/Admin";
import Home from "../page/Home";

const RouterIndex = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/admin"} element={<Admin />} />
        <Route path={"/"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterIndex;
