import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import useGeolocation from "react-hook-geolocation";

import { AvatarColor, HEADER_FN } from "../../../constants";
import { GetPostOne, GetRevGeocode } from "../../../Hooks";
import { recoil_ } from "../../../recoil";

import { StyledDetail } from "./styled";
import {
  CompassOutlined,
  MoreOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Avatar from "boring-avatars";

const DetailCard = (item: any) => {
  const { data } = useQuery("getRevGeo", () =>
    GetRevGeocode({ lat: item.latitude, lng: item.longitude })
  );

  useEffect(() => {
    console.log(item.latitude + " " + item.longitude, data);
  }, []);

  return (
    <div className="postContainer" onClick={(e) => e.stopPropagation()}>
      <div
        className="background"
        // style={{ background: `url(${item.data.url})` }}
      ></div>
      <div className="content">
        <div className="header">
          <div className="title">
            <Avatar
              size={32}
              variant="beam"
              // name={item.data.content}
              colors={AvatarColor}
            />
            username
          </div>
          <div className="HederAction">
            <MoreOutlined />
          </div>
        </div>
        {/* {item.data.content} */}
        <div className="PostInfo">
          <div className="date">22.12.05</div>
          <div className="location">
            <EnvironmentOutlined /> {data}
          </div>
        </div>
      </div>

      <div className="actionSpace">
        <div className="emotions">
          <div className="emotionButton">
            🥰<div className="emotionCount">9</div>
          </div>
          <div className="divider"></div>
          <div className="emotionButton">
            😎<div className="emotionCount">10</div>
          </div>
          <div className="divider"></div>
          <div className="emotionButton">
            😢<div className="emotionCount">5</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Detail = () => {
  const [, setHeader] = useRecoilState(recoil_.headerState);

  const navigate = useNavigate();
  const geolocation = useGeolocation();
  let { post_id } = useParams<string>();
  const [center, setCenter] = useState<{ lat: number; lng: number }>();

  const { data } = useQuery(
    "userInfo",
    () => GetPostOne(post_id, center?.lat, center?.lng),
    {
      retry: 1,
      refetchOnReconnect: false,
      onSuccess: () => {
        console.log("DATA : ", data);
      },
    }
  );

  useEffect(() => {
    if (geolocation.latitude !== null) {
      setCenter({
        lat: geolocation.latitude,
        lng: geolocation.longitude,
      });
    }

    console.log(post_id, center);
  }, [geolocation]);

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
  }, [data]);

  return (
    <>
      <StyledDetail onClick={() => navigate("/")}>
        {/* {data?.map((item) => (
          <DetailCard data={item} key={item.id} />
        ))} */}
        <DetailCard data={data} />
      </StyledDetail>
    </>
  );
};
