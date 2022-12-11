import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { AvatarColor, HEADER_FN } from "../../../constants";
import { recoil_ } from "../../../recoil";

import { GetPostOne } from "../Map/api/getPost";
import { GetRevGeocode } from "../Map/api/getRevGeocode";
import { setEmotion } from "./api/setEmotion";

import { StyledDetail } from "./styled";
import { Carousel } from "antd";
import {
  MoreOutlined,
  EnvironmentOutlined,
  StarOutlined,
} from "@ant-design/icons";

import { LoadingBox } from "../../../components/LoadingContainer";
import Avatar from "boring-avatars";
import { Dialog } from "./components/dialog";
import { ErrPost } from "./components/errPost";
import { getFormattedDate } from "../../../components/api/getFormattedDate";

export const Detail = () => {
  const [, setHeader] = useRecoilState(recoil_.headerState);
  const coordinate = useRecoilValue(recoil_.geoState);
  const [dialogOpen, setDialogOpen] = useRecoilState(recoil_.detailDialogState);

  const navigate = useNavigate();
  let { post_id } = useParams<string>();

  const {
    data: postData,
    isSuccess: postSuccess,
    isError: postError,
    refetch: postRefetch,
  } = useQuery<postType, { statusCode: number; message: string }>(
    "detail/userInfo",
    () => coordinate && GetPostOne(post_id, coordinate.lat, coordinate.lng),
    {
      retry: false,
      refetchOnReconnect: false,
      cacheTime: 0,
    }
  );
  const { data: geoData, isSuccess: geoSuccess } = useQuery(
    "detail/getRevGeo",
    () =>
      coordinate && GetRevGeocode({ lat: coordinate.lat, lng: coordinate.lng }),
    {
      retry: 1,
    }
  );

  const emotional = (new_emotion_type: number) => {
    if (postSuccess) {
      const data = {
        post_id: postData.post_id,
        emotion_id: postData.emotion.emotion_id,
        new_emotion_type: new_emotion_type,
        current_emotion_type: postData.emotion.emotion_type!,
      };
      setEmotion(data)
        .then((res) => {
          console.log(res);
          postRefetch();
        })
        .catch((err) => console.log(err));
    }
  };

  const onChange = (currentSlide: number) => {
    // console.log(currentSlide);
  };

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
  }, [postData]);

  // const time = getFormattedDate(new Date(postData.created_time!));

  useEffect(() => {
    console.log(postData);
    setDialogOpen(false);
  }, [setDialogOpen, postData]);

  if (!postSuccess) return <LoadingBox />;
  if (postData.statusCode === 500) return <ErrPost />;
  // if (!geoSuccess || !postData.image) return <LoadingBox />;
  return (
    <>
      <StyledDetail onClick={() => navigate("/")}>
        <div className="postContainer" onClick={(e) => e.stopPropagation()}>
          <div className="background">
            {postData.forFriend === 1 && (
              <div className="friendStateTag">
                <StarOutlined />
                친구의 우연
              </div>
            )}
            <Carousel afterChange={onChange}>
              {postData.image?.map((image: any, index: number) => (
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
                  name={postData.post_id}
                  colors={AvatarColor}
                />
                익명의 누군가
              </div>
              <div className="HederAction" onClick={() => setDialogOpen(true)}>
                <MoreOutlined />
              </div>
            </div>
            {postData.content}
            <div className="PostInfo">
              <div className="date">
                {getFormattedDate(new Date(postData.created_time!))}
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
                style={postData.emotion?.emotion_type === 0 ? emotionStyle : {}}
                onClick={() => emotional(0)}
              >
                🥰<div className="emotionCount">{postData.like_count}</div>
              </div>
              <div className="divider"></div>
              <div
                className="emotionButton"
                style={postData.emotion?.emotion_type === 1 ? emotionStyle : {}}
                onClick={() => emotional(1)}
              >
                😎<div className="emotionCount">{postData.cool_count}</div>
              </div>
              <div className="divider"></div>
              <div
                className="emotionButton"
                style={postData.emotion?.emotion_type === 2 ? emotionStyle : {}}
                onClick={() => emotional(2)}
              >
                😢<div className="emotionCount">{postData.sad_count}</div>
              </div>
            </div>
          </div>
        </div>
      </StyledDetail>
      {dialogOpen && (
        <Dialog isOwner={postData.owner} post_id={postData.post_id} />
      )}
    </>
  );
};

const emotionStyle = {
  backgroundColor: "#ffffffd4",
  color: "#222",
};

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
