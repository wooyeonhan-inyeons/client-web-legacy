import React from "react";
import { Outlet } from "react-router-dom";
import { HEADER_FN } from "../../constants";

import { Header } from "../../components/Header";
import { MapContainer } from "../../components/StyledContainer";
import { Map } from "./Map";

const Home = () => {
  return (
    <>
      <Header
        vis_goBack={false}
        rightButton1={HEADER_FN.ALARM}
        rightButton2={HEADER_FN.MYPAGE}
      />
      <MapContainer>
        <Map />
      </MapContainer>
      <Outlet />
    </>
  );
};

export default Home;
