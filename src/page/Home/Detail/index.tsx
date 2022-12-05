import { useEffect } from "react";
import { useQuery } from "react-query";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { AvatarColor, HEADER_FN } from "../../../constants";
import { GetRevGeocode, GetTestPost } from "../../../Hooks";
import { recoil_ } from "../../../recoil";

import { StyledDetail } from "./styled";
import { CompassOutlined } from "@ant-design/icons";
import Avatar from "boring-avatars";

const DetailCard = (item: any) => {
  const { data } = useQuery("getRevGeo", () =>
    GetRevGeocode({ lat: item.data.latitude, lng: item.data.longitude })
  );

  useEffect(() => {
    // console.log("GEO: ", data);
  }, [data]);

  return (
    <div className="postContainer" onClick={(e) => e.stopPropagation()}>
      <div
        className="background"
        style={{ background: `url(${item.data.url})` }}
      ></div>
      <div className="content">
        <div className="title">
          <Avatar
            size={32}
            variant="beam"
            name={item.data.content}
            colors={AvatarColor}
          />
          username
        </div>
        {item.data.content}
        <div className="PostInfo">
          <div className="date">22.12.05</div>
          <div className="location">
            <CompassOutlined /> {data}
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

const Detail = () => {
  const [, setHeader] = useRecoilState(recoil_.headerState);

  const navigate = useNavigate();
  const { data } = useQuery("userInfo", GetTestPost, {
    retry: 1,
    refetchOnReconnect: false,
  });

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
        {data?.map((item) => (
          <DetailCard data={item} key={item.id} />
        ))}
      </StyledDetail>
      <Outlet />
    </>
  );
};

export default Detail;
