import React, { useState } from "react";
import { useQuery } from "react-query";
import { Outlet, useNavigate } from "react-router-dom";
import { GetImages } from "./api";

import { StyledContainer } from "../../components/StyledContainer";
import { Header } from "../../components/Header";
import { MyProfile } from "./components/MyProfile";
import { MyPost } from "./components/MyPost";
import { LogoutButton } from "./components/LogoutButton";
import { LoadingBox } from "../../components/LoadingContainer";

const Mypage = () => {
  const [loading, setLoading] = useState(true);
  const { data } = useQuery("images", GetImages, {
    retry: 1,
    refetchOnReconnect: false,
    onSuccess: (res) => {
      console.log(res);
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
