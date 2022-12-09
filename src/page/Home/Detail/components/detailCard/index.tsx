import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { recoil_ } from "../../../../../recoil";

// import { getFormattedDate } from "../../../../../components/api/getFormattedDate";
import { AvatarColor } from "../../../../../constants";
import { GetRevGeocode } from "../../../Map/api/getRevGeocode";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import ko from "timeago.js/lib/lang/ko";
import { message } from "antd";

import {
  MoreOutlined,
  EnvironmentOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Carousel } from "antd";

import { LoadingBox } from "../../../../../components/LoadingContainer";
import Avatar from "boring-avatars";
import { Dialog } from "../dialog";
import { useEffect } from "react";
import { postType } from "../..";
import { useNavigate } from "react-router-dom";
// import { Data } from "@react-google-maps/api";

const initProps: postType = {
  // data: {
  post_id: "",
  content: "",
  created_time: Date.now().toString(),
  forFriend: 0,
  latitude: 0,
  longitude: 0,
  like_count: 0,
  cool_count: 0,
  sad_count: 0,
  emotion: {
    emotion_id: "",
    emotion_type: 0,
  },
  image: [
    {
      img_id: "",
      img_url: "none",
    },
  ],
  distance: 0,
  owner: true,
  // },
};
const emotionStyle = {
  backgroundColor: "#ffffffd4",
  color: "#222",
};

export const DetailCard = ({ item = initProps }) => {
  const [dialogOpen, setDialogOpen] = useRecoilState(recoil_.detailDialogState);
  const navigate = useNavigate();

  const { data: geoData, isSuccess: geoSuccess } = useQuery(
    "getRevGeo",
    () => item && GetRevGeocode({ lat: item.latitude, lng: item.longitude }),
    {
      retry: 1,
    }
  );
  //timeago 한글 변환
  const time = timeago.format(item.created_time, "ko");
  timeago.register("ko", ko);
  const onChange = (currentSlide: number) => {
    // console.log(currentSlide);
  };

  useEffect(() => {
    console.log(item);
    setDialogOpen(false);
  }, [setDialogOpen, item]);

  if (item.statusCode === 500)
    return (
      <div
        className="postContainer errCont"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header">확인할 수 없는 게시물입니다.</div>
        <div className="divider"></div>
        <div className="button" onClick={() => navigate("/")}>
          돌아가기
        </div>
      </div>
    );
  if (!geoSuccess || !item.image) return <LoadingBox />;
  return (
    <>
      <div className="postContainer" onClick={(e) => e.stopPropagation()}>
        <div className="background">
          {item.forFriend === 1 && (
            <div className="friendStateTag">
              <StarOutlined />
              친구의 우연
            </div>
          )}
          <Carousel afterChange={onChange}>
            {item.image?.map((image: any, index: number) => (
              <div className="img_container" key={index}>
                {/* <div
                className="background"
                style={{ background:  `url(${image.img_url}) !important` }}
                key={index}
              ></div> */}
                <img className="post_img" src={image.img_url} alt="img" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="content">
          <div className="header">
            <div className="title">
              <Avatar
                size={32}
                variant="beam"
                name={item.post_id}
                colors={AvatarColor}
              />
              익명의 누군가
            </div>
            <div className="HederAction" onClick={() => setDialogOpen(true)}>
              <MoreOutlined />
            </div>
          </div>
          {item.content}
          <div className="PostInfo">
            <div className="date">
              <TimeAgo
                datetime={Date.now()}
                opts={{ relativeDate: item.created_time }}
                locale="ko"
              />
            </div>

            <div className="location">
              <EnvironmentOutlined /> {geoData}
            </div>
          </div>
        </div>

        <div className="actionSpace">
          <div className="emotions">
            <div
              className="emotionButton"
              style={item.emotion?.emotion_type === 0 ? emotionStyle : {}}
            >
              🥰<div className="emotionCount">{item.like_count}</div>
            </div>
            <div className="divider"></div>
            <div
              className="emotionButton"
              style={item.emotion?.emotion_type === 1 ? emotionStyle : {}}
            >
              😎<div className="emotionCount">{item.cool_count}</div>
            </div>
            <div className="divider"></div>
            <div
              className="emotionButton"
              style={item.emotion?.emotion_type === 2 ? emotionStyle : {}}
            >
              😢<div className="emotionCount">{item.sad_count}</div>
            </div>
          </div>
        </div>
      </div>
      {dialogOpen && <Dialog isOwner={item.owner} post_id={item.post_id} />}
    </>
  );
};
