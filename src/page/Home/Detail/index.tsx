import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { HEADER_FN } from "../../../constants";
import { recoil_ } from "../../../recoil";

import { StyledDetail } from "./styled";

import { LoadingBox2 } from "../../../components/LoadingContainer";
import { GetPostOne } from "../Map/api/getPost";
import { DetailCard } from "./components/detailCard";

export const Detail = () => {
  const [dataLoading, setDataLoading] = useState(false);
  const [, setHeader] = useRecoilState(recoil_.headerState);
  const coordinate = useRecoilValue(recoil_.geoState);

  const navigate = useNavigate();
  let { post_id } = useParams<string>();

  const { data: detailData, isSuccess: detailSuccess } = useQuery(
    "userInfo",
    () => GetPostOne(post_id, coordinate.lat, coordinate.lng),
    {
      retry: 1,
      refetchOnReconnect: false,
    }
  );

  useEffect(() => {
    //모달 상태에서 스크롤 막기
    document.body.style.overflow = "hidden";
    setHeader({
      title: "게시물 보기",
      rightButton1: HEADER_FN.EMPTY,
      rightButton2: HEADER_FN.EMPTY,
    });
    return () => {
      document.body.style.overflow = "auto";
      setHeader({
        title: "",
        vis_goBack: false,
        rightButton1: HEADER_FN.ALARM,
        rightButton2: HEADER_FN.MYPAGE,
      });
    };
  }, [detailData]);

  return (
    <>
      <StyledDetail onClick={() => navigate("/")}>
        {/* {data?.map((item) => (
          <DetailCard data={item} key={item.id} />
        ))} */}
        {detailSuccess ? <DetailCard data={detailData} /> : <LoadingBox2 />}
      </StyledDetail>
    </>
  );
};
