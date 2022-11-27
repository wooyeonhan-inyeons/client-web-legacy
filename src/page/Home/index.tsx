import React from "react";
import { Outlet } from "react-router-dom";
import { HEADER_FN } from "../../constants";

import { Header } from "../../components/Header";
import { StyledContainer } from "../../components/StyledContainer";

const Home = () => {
  return (
    <>
      <Header
        vis_goBack={false}
        rightButton1={HEADER_FN.ALARM}
        rightButton2={HEADER_FN.MYPAGE}
      />
      <StyledContainer></StyledContainer>
      <Outlet />
    </>
  );
};

export default Home;
