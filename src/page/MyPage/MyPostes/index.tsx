import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../../../components/Header";
import { LoadingBox } from "../../../components/LoadingContainer";
import { StyledContainer } from "../../../components/StyledContainer";
import { Tab } from "./Tab";
import { Carousel } from "./CarouselBox";

export const MyPostes = () => {
  const [loading, setLoading] = useState(false);
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
