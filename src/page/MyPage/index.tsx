import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Outlet, useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { recoil_ } from "../../recoil";

import { StyledContainer } from "../../components/StyledContainer";
import { Header } from "../../components/Header";
import { MyProfile } from "./components/MyProfile";
import { MyPost } from "./components/MyPost";
import { LogoutButton } from "./components/LogoutButton";
import { LoadingBox } from "../../components/LoadingContainer";
import { GetTest } from "./Postes/components/TabBox/GetTest";

const Mypage = () => {
  const resetUser = useResetRecoilState(recoil_.userState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //한 번만 불러오는 query.
  // const { data } = useQuery("images", () => GetTest({ idx: 0 }), {
  //   retry: 1,
  //   refetchOnReconnect: false,
  //   onSuccess: (res) => {
  //     console.log(res);
  //     setLoading(false);
  //   },
  // });

  const { data, fetchNextPage } = useInfiniteQuery(
    ["images"],
    ({ pageParam = 0 }) => GetTest({ idx: pageParam }),
    {
      retry: 3,
      getNextPageParam: (lastPage) => {
        // lastPage: 콜백함수에서 리턴한 값을 의미한다!!
        // 직전에 받은 배열의 다음 index를 요청함
        return lastPage[lastPage.length - 1].id;
        // 마지막 id 요소 관련 이벤트 처리 추가해야함
      },
      onSuccess: () => {
        setLoading(false);
      },
    }
  );

  useEffect(() => {
    if (data?.pages.flat().length! < 9) fetchNextPage();
  });

  return (
    <>
      <Header title="마이페이지" />
      {!loading ? (
        <StyledContainer>
          <MyProfile userPost={data?.pages.flat()} />
          <MyPost data={data?.pages.flat()} />
          <LogoutButton
            onClick={() => {
              localStorage.removeItem("key");
              resetUser();
            }}
          >
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
