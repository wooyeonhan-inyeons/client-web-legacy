import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { StyledContainer } from "../../components/StyledContainer";
import { HEADER_FN } from "../../constants";

const Mypage = () => {
  return (
    <>
      <Header title="마이페이지" />
      <StyledContainer>
        <h1>Mypage</h1>
        <Outlet />
      </StyledContainer>
    </>
  );
};

export default Mypage;
