import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { HEADER_FN } from "../../../constants";
import { recoil_ } from "../../../recoil";

import { StyledDetail } from "./styled";

import { LoadingBox } from "../../../components/LoadingContainer";
import { GetPostOne } from "../Map/api/getPost";
import { DetailCard } from "./components/detailCard";

export interface postType {
  post_id: string;
  content: string;
  created_time: string;
  forFriend: number;
  latitude: number;
  longitude: number;
  like_count: number;
  cool_count: number;
  sad_count: number;
  emotion: {
    emotion_id: string;
    emotion_type: number;
  };
  image: [
    {
      img_id: string;
      img_url: string;
    }
  ];
  distance: number;
  owner: boolean;
  statusCode?: number;
}

export const Detail = () => {
  const [, setHeader] = useRecoilState(recoil_.headerState);
  const coordinate = useRecoilValue(recoil_.geoState);

  const navigate = useNavigate();
  let { post_id } = useParams<string>();

  const {
    data: detailData,
    isSuccess: detailSuccess,
    isError: detailError,
  } = useQuery<postType, { statusCode: number; message: string }>(
    "userInfo",
    () => coordinate && GetPostOne(post_id, coordinate.lat, coordinate.lng),
    {
      retry: false,
      refetchOnReconnect: false,
      cacheTime: 0,
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
        {detailSuccess ? <DetailCard item={detailData} /> : <LoadingBox />}
      </StyledDetail>
    </>
  );
};
