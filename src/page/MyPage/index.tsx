import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { StyledContainer } from "../../components/StyledContainer";

import { Header } from "../../components/Header";
import { MyProfile } from "./MyProfile";
import { MyPost } from "./MyPost";
import { GetImages } from "./api";
import { useQuery } from "react-query";
import { LogoutButton } from "./MyProfile/LogoutButton";
import { LoadingBox } from "../../components/LoadingContainer";

const Mypage = () => {
  const [loading, setLoading] = useState(true);
  const { data } = useQuery("images", GetImages, {
    retry: 1,
    refetchOnReconnect: false,
    onSuccess: () => {
      setLoading(false);
    },
  });

  const navigate = useNavigate();

  return (
    <>
      <Header title="마이페이지" />
      {!loading ? (
        <StyledContainer>
          <MyProfile userPost={data} />
          <MyPost data={data} />
          <LogoutButton onClick={() => navigate("/logout")}>
            로그아웃
          </LogoutButton>
        </StyledContainer>
      ) : (
        <LoadingBox />
      )}
      <Outlet />
    </>
  );
};

export default Mypage;
