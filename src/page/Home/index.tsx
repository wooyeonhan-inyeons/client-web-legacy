import React from "react";
import { Outlet } from "react-router-dom";
import { HEADER_FN } from "../../constants";

import { Header } from "../../components/Header";
import { MapContainer } from "../../components/StyledContainer";
import { Map } from "./Map";
import { Marker } from "./Map/Marker";
import { LoadingBox } from "../../components/LoadingContainer";

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
        <Marker />
      </MapContainer>
      <Outlet />
    </>
  );
};

export default Home;
