import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { recoil_ } from "../../../../../recoil";

import { getFormattedDate } from "../../../../../components/api/getFormattedDate";
import { AvatarColor } from "../../../../../constants";
import { GetRevGeocode } from "../../../Map/api/getRevGeocode";

import {
  MoreOutlined,
  EnvironmentOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Carousel } from "antd";

import {
  LoadingBox,
  LoadingBox2,
} from "../../../../../components/LoadingContainer";
import Avatar from "boring-avatars";
import { Dialog } from "../dialog";
import { useEffect } from "react";
import { postType } from "../..";

const ErrProps: postType = {
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

export const DetailCard = ({ item = ErrProps }) => {
  const { data: geoData, isSuccess: geoSuccess } = useQuery(
    "getRevGeo",
    () => item && GetRevGeocode({ lat: item.latitude, lng: item.longitude }),
    {
      retry: 1,
    }
  );
  const time = getFormattedDate(new Date(item.created_time));
  const [dialogOpen, setDialogOpen] = useRecoilState(recoil_.detailDialogState);

  const onChange = (currentSlide: number) => {
    // console.log(currentSlide);
  };

  useEffect(() => {
    setDialogOpen(false);
    console.log(item);
  }, []);

  if (!geoSuccess || !item) return <LoadingBox />;
  return (
    <>
      <div className="postContainer" onClick={(e) => e.stopPropagation()}>
        {item.forFriend ? (
          <>
            <div className="friendStateTag">
              <StarOutlined />
              친구의 우연
            </div>
          </>
        ) : (
          ""
        )}
        <Carousel afterChange={onChange}>
          {item.image?.map((image: any, index: number) => (
            <div className="img_container" key={index}>
              {/* <div
                className="background"
                style={{ background:  `url(${image.img_url}) !important` }}
                key={index}
              ></div> */}
              <img
                className="post_img"
                // style={{ background: `url(${image.img_url}) !important` }}
                src={image.img_url}
                alt="img"
              />
            </div>
          ))}
        </Carousel>
        <div className="content">
          <div className="header">
            <div className="title">
              <Avatar
                size={32}
                variant="beam"
                name={item.post_id}
                colors={AvatarColor}
              />
              username
            </div>
            <div className="HederAction" onClick={() => setDialogOpen(true)}>
              <MoreOutlined />
            </div>
          </div>
          {item.content}
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
              🥰<div className="emotionCount">{item.like_count}</div>
            </div>
            <div className="divider"></div>
            <div className="emotionButton" style={emotionStyle}>
              😎<div className="emotionCount">{item.cool_count}</div>
            </div>
            <div className="divider"></div>
            <div className="emotionButton">
              😢<div className="emotionCount">{item.sad_count}</div>
            </div>
          </div>
        </div>
      </div>
      {dialogOpen && <Dialog isOwner={item.owner} post_id={item.post_id} />}
    </>
  );
};
