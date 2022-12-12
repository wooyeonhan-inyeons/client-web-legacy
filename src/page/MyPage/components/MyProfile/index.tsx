import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoil_ } from "../../../../recoil";
import { AvatarColor, MYPAGE_ } from "../../../../constants";

import Avatar from "boring-avatars";
import {
  EditOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  MyProfileInfo,
  MyProfileTextBox,
  ProfileContainer,
  ProfileInfoContainer,
  ProfileEditButton,
  ProfileLeft,
} from "./styled";
import { FriendsButton } from "../FriendsButton";
import { MyPostButton } from "../MyPostButton";
import { GetUser } from "../../api/GetUser";
import { useEffect, useState } from "react";
import { getPostingInfo } from "./api";

export const MyProfile = ({ userPost }: any) => {
  const [, setTab] = useRecoilState(recoil_.tabState);
  const [postingCnt, setPostingCnt] = useState(0);
  const [emotionCnt, setEmotionCnt] = useState(0);
  const [friendsCnt, setFriendsCnt] = useState(0);
  const { data } = useQuery<userProps>("mypage/user", GetUser, {
    retry: 1,
    refetchOnReconnect: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getPostingInfo().then((res: any) => {
      setPostingCnt(res.posting_count);
      setEmotionCnt(res.emotion_count);
      setFriendsCnt(res.friend_count);
    });
  }, []);
  return (
    <>
      <ProfileContainer>
        <ProfileInfoContainer>
          <ProfileLeft>
            <Avatar
              size={56}
              variant="beam"
              name={data?.user_id}
              colors={AvatarColor}
            />
            <MyProfileTextBox>
              <div className="username">{data?.name}</div>
              <div className="message">{data?.message}</div>
              <MyProfileInfo>
                <div>
                  <EnvironmentOutlined />
                  {" " + postingCnt}
                </div>
                <div className="divider"></div>
                <div>
                  <HeartOutlined />
                  {" " + emotionCnt}
                </div>
                <div className="divider"></div>
                <div>
                  <TeamOutlined />
                  {" " + friendsCnt}
                </div>
              </MyProfileInfo>
            </MyProfileTextBox>
          </ProfileLeft>
          <ProfileEditButton onClick={() => navigate("/mypage/edit")}>
            {}
            <EditOutlined />
          </ProfileEditButton>
        </ProfileInfoContainer>

        <MyPostButton
          onClick={() => {
            setTab(MYPAGE_.VISITED_POST);
            navigate("/mypage/postes");
          }}
          url1={data && userPost[0]?.img_url}
          url2={data && userPost[1]?.img_url}
        />
        <FriendsButton onClick={() => navigate("/mypage/friends")} />
      </ProfileContainer>
    </>
  );
};

interface userProps {
  user_id: string;
  name: string;
  message: string;
  email: string;
  created_at: string;
  follower_count: number;
  following_count: number;
}
