import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { AvatarColor, HEADER_FN } from "../../../constants";
import { recoil_ } from "../../../recoil";

import { StyledDetail } from "./styled";
import { MoreOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Avatar from "boring-avatars";
import { LoadingBox2 } from "../../../components/LoadingContainer";
import { getFormattedDate } from "../../../components/api/getFormattedDate";
import { GetPostOne } from "../Map/api/getPost";
import { GetRevGeocode } from "../Map/api/getRevGeocode";

const DetailCard = (item: any) => {
  const { data: geoData, isSuccess: geoSuccess } = useQuery(
    "getRevGeo",
    () =>
      item &&
      GetRevGeocode({ lat: item.data.latitude, lng: item.data.longitude }),
    {
      retry: 1,
    }
  );
  const time = getFormattedDate(new Date(item.data.created_time));

  return (
    <>
      {geoSuccess ? (
        <div className="postContainer" onClick={(e) => e.stopPropagation()}>
          <div
            className="background"
            style={{ background: `url(${item.data.image[0].img_url})` }}
          ></div>
          <div className="content">
            <div className="header">
              <div className="title">
                <Avatar
                  size={32}
                  variant="beam"
                  name={item.data.post_id}
                  colors={AvatarColor}
                />
                username
              </div>
              <div className="HederAction">
                <MoreOutlined />
              </div>
            </div>
            {item.data.content}
            <div className="PostInfo">
              <div className="date">{time}</div>
              <div className="location">
                <EnvironmentOutlined /> {geoData}
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
        <LoadingBox2 />
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

  const { data: detailData, isSuccess: detailSuccess } = useQuery(
    "userInfo",
    () => GetPostOne(post_id, coordinate.lat, coordinate.lng),
    {
      retry: 1,
      refetchOnReconnect: false,
      onSuccess: (res) => {},
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
