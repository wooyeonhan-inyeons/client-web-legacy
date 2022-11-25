import { useState } from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";

import { GetImages } from "../api";

import { Header } from "../../../components/Header";
import { LoadingBox } from "../../../components/LoadingContainer";
import { StyledContainer } from "../../../components/StyledContainer";
import { Tab } from "./Tab";
import { Carousel } from "./CarouselBox";

export const MyPostes = () => {
  const [loading, setLoading] = useState(false);
  // const { data } = useQuery("images", GetImages, {
  //   retry: 1,
  //   refetchOnReconnect: false,
  //   onSuccess: () => {
  //     setLoading(false);
  //   },
  // });

  return (
    <>
      <Header title="우연들" />
      {!loading ? (
        <StyledContainer>
          <Tab />
          <Carousel />
        </StyledContainer>
      ) : (
        <LoadingBox />
      )}
      <Outlet />
    </>
  );
};
