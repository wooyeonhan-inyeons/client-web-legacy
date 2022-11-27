import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../../../components/Header";
import { LoadingBox } from "../../../components/LoadingContainer";
import { StyledContainer } from "../../../components/StyledContainer";
import { Tab } from "./components/Tab";
import { TabBox } from "./components/TabBox";

export const MyPostes = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Header title="우연들" />
      {!loading ? (
        <StyledContainer>
          <Tab />
          <TabBox />
        </StyledContainer>
      ) : (
        <LoadingBox />
      )}
      <Outlet />
    </>
  );
};
