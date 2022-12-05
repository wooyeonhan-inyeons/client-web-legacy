import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { HEADER_FN } from "../../constants";

import { Header } from "../../components/Header";
import { MapContainer } from "../../components/StyledContainer";
import Map from "./Map";

import { useRecoilState } from "recoil";
import { recoil_ } from "../../recoil";
import { LoadingBox } from "../../components/LoadingContainer";

const Home = () => {
  const [header, setHeader] = useRecoilState(recoil_.headerState);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY!,
  });

  useEffect(() => {
    setHeader({
      title: "",
      vis_goBack: false,
      rightButton1: HEADER_FN.ALARM,
      rightButton2: HEADER_FN.MYPAGE,
    });
  }, []);

  if (!isLoaded) return <LoadingBox />;
  return (
    <>
      <Header
        title={header.title}
        vis_goBack={header.vis_goBack}
        rightButton1={header.rightButton1}
        rightButton2={header.rightButton2}
      />
      <MapContainer>
        <Map></Map>
      </MapContainer>
      <Outlet />
    </>
  );
};

export default Home;
