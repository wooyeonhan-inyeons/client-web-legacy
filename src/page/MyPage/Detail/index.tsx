import { useQuery } from "react-query";
import { useParams } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { Header } from "../../../components/Header";
import { LoadingBox } from "../../../components/LoadingContainer";
import { StyledContainer } from "../../../components/StyledContainer";
import { recoil_ } from "../../../recoil";
import { postType } from "../../Home/Detail";
import { ErrPost } from "../../Home/Detail/components/errPost";
import { StyledDetail2 } from "../../Home/Detail/styled";
import { GetPostOne } from "../../Home/Map/api/getPost";
import {
  MoreOutlined,
  EnvironmentOutlined,
  StarOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Carousel } from "antd";
import { setEmotion } from "../../Home/Detail/api/setEmotion";
import { getFormattedDate } from "../../../components/api/getFormattedDate";
import Avatar from "boring-avatars";
import { AvatarColor } from "../../../constants";
import { GetRevGeocode } from "../../Home/Map/api/getRevGeocode";
import { Dialog } from "../../Home/Detail/components/dialog";
import NoMatch from "../../NoMatch";
import { useState, useEffect } from "react";
import styled from "styled-components";

const FootCnt = styled.span`
  font-size: 10px;
  padding: 0.5rem;

  .date {
    padding-right: 0.5rem;
  }
`;
export const MyDetail = () => {
  const coordinate = useRecoilValue(recoil_.geoState);
  const [dialogOpen, setDialogOpen] = useRecoilState(recoil_.detailDialogState);
  let { post_id } = useParams<string>();

  const {
    data: postData,
    isSuccess: postSuccess,
    isError: postError,
    refetch: postRefetch,
  } = useQuery<postType, { statusCode: number; message: string }>(
    "detail/userInfo",
    () =>
      coordinate &&
      GetPostOne({
        post_id: post_id,
        lat: coordinate.lat,
        lng: coordinate.lng,
      }),
    {
      retry: false,
      refetchOnReconnect: false,
      cacheTime: 0,
      onSuccess: (res) => {
        console.log(res);
      },
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
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [postData]);

  if (!postSuccess) return <LoadingBox />;
  if (postData.statusCode === 500) return <ErrPost />;
  // if (postData.statusCode !== 400) return <NoMatch />;

  return (
    <>
      <Header />
      <StyledDetail2>
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
                <EyeOutlined style={{ paddingLeft: "0.8rem" }} />
                <FootCnt>{postData.footprint_count}</FootCnt>
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
      </StyledDetail2>
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
