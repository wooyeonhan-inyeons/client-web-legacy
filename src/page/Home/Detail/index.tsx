import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

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
import { LoadingBox } from "../../../components/LoadingContainer";

const DetailCard = (item: any) => {
  const { data, isLoading } = useQuery(
    "getRevGeo",
    () => GetRevGeocode({ lat: item.latitude, lng: item.longitude }),
    {
      retry: 1,
      onSuccess: () => {
        console.log("geoRev", data);
      },
    }
  );
  useEffect(() => {
    console.log("prapm Item: ", item);
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="postContainer" onClick={(e) => e.stopPropagation()}>
          <div
            className="background"
            style={{ background: `url(${item?.data.image[0].img_url})` }}
          ></div>
          <div className="content">
            <div className="header">
              <div className="title">
                <Avatar
                  size={32}
                  variant="beam"
                  name={item?.data.post_id}
                  colors={AvatarColor}
                />
                username
              </div>
              <div className="HederAction">
                <MoreOutlined />
              </div>
            </div>
            {item?.data.content}
            <div className="PostInfo">
              <div className="date"></div>
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
      ) : (
        "asd"
      )}
    </>
  );
};

export const Detail = () => {
  const [dataLoading, setDataLoading] = useState(false);
  const [, setHeader] = useRecoilState(recoil_.headerState);
  const coordinate = useRecoilValue(recoil_.geoState);

  const navigate = useNavigate();
  let { post_id } = useParams<string>();

  const { data, isLoading } = useQuery(
    "userInfo",
    () => GetPostOne(post_id, coordinate.lat, coordinate.lng),
    {
      retry: 1,
      refetchOnReconnect: false,
      onSuccess: (res) => {
        console.log("DATA : ", res);
      },
    }
  );

  useEffect(() => {
    console.log(data);
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
