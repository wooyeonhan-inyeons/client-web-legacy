import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { Carousel } from "antd";
import {
  MoreOutlined,
  EnvironmentOutlined,
  StarOutlined,
} from "@ant-design/icons";

import Avatar from "boring-avatars";
import { useRecoilState } from "recoil";
import { AvatarColor } from "../../../../../constants";
import { getFormattedDate } from "../../../../../components/api/getFormattedDate";
import { setEmotion } from "../../../Detail/api/setEmotion";
import { recoil_ } from "../../../../../recoil";
import { Dialog } from "../../../Detail/components/dialog";
import { postType } from "../../../Detail";
import { GetRevGeocode } from "../../../Map/api/getRevGeocode";

// interface postCardProp {
//   props: postType;
// }

export const PostCard = ({ props }: any) => {
  const [dialogOpen, setDialogOpen] = useRecoilState(recoil_.detailDialogState);
  const postSuccess = true;

  const emotional = (new_emotion_type: number) => {
    if (postSuccess) {
      const data = {
        post_id: props.post_id,
        emotion_id: props.emotion.emotion_id,
        new_emotion_type: new_emotion_type,
        current_emotion_type: props.emotion.emotion_type!,
      };
      setEmotion(data)
        .then((res) => {
          console.log(res);
          // postRefetch();
        })
        .catch((err) => console.log(err));
    }
  };

  const { data: geoData, isSuccess: geoSuccess } = useQuery(
    "group/getRevGeo",
    () => props.lat && GetRevGeocode({ lat: props.lat, lng: props.lng }),
    {
      retry: 1,
    }
  );

  const onChange = (currentSlide: number) => {
    // console.log(currentSlide);
  };

  return (
    <>
      <div className="postContainer" onClick={(e) => e.stopPropagation()}>
        <div className="background">
          {props.forFriend === 1 && (
            <div className="friendStateTag">
              <StarOutlined />
              친구의 우연
            </div>
          )}
          <Carousel afterChange={onChange}>
            {props.image?.map((image: any, index: number) => (
              <div className="img_container" key={index}>
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
                name={props.post_id}
                colors={AvatarColor}
              />
              익명의 누군가
            </div>
            <div className="HederAction" onClick={() => setDialogOpen(true)}>
              <MoreOutlined />
            </div>
          </div>
          {props.content}
          <div className="PostInfo">
            <div className="date">
              {getFormattedDate(new Date(props.created_time!))}
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
              style={props.emotion?.emotion_type === 0 ? emotionStyle : {}}
              onClick={() => emotional(0)}
            >
              🥰<div className="emotionCount">{props.like_count}</div>
            </div>
            <div className="divider"></div>
            <div
              className="emotionButton"
              style={props.emotion?.emotion_type === 1 ? emotionStyle : {}}
              onClick={() => emotional(1)}
            >
              😎<div className="emotionCount">{props.cool_count}</div>
            </div>
            <div className="divider"></div>
            <div
              className="emotionButton"
              style={props.emotion?.emotion_type === 2 ? emotionStyle : {}}
              onClick={() => emotional(2)}
            >
              😢<div className="emotionCount">{props.sad_count}</div>
            </div>
          </div>
        </div>
      </div>
      {dialogOpen && <Dialog isOwner={props.owner} post_id={props.post_id} />}
    </>
  );
};

const emotionStyle = {
  backgroundColor: "#ffffffd4",
  color: "#222",
};
