import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { GetUserExperience } from "../../api";
import { AvatarColor } from "../../../../constants";
import React, {useState} from 'react';
import Avatar from "boring-avatars";
import {
  EditOutlined,
  PushpinOutlined,
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

export const MyProfile = ({ userPost }: any) => {
  const [openEdit, setOpenEdit] = useState(false);
  const onOpenEdit = () => setOpenEdit(true);

  const { data } = useQuery("user", GetUserExperience, {
    retry: 1,
    refetchOnReconnect: false,
    staleTime: 10 * 1000, // 1분
    onSuccess: () => {},
  });
  const navigate = useNavigate();
  return (
    <>
      <ProfileContainer>
        <ProfileInfoContainer>
          <ProfileLeft>
            <Avatar
              size={56}
              variant="beam"
              name={Date.now().toString()}
              colors={AvatarColor}
            />
            <MyProfileTextBox>
              <div className="username">username</div>
              <MyProfileInfo>
                <div>
                  <PushpinOutlined />
                  {data?.userPost}
                </div>
                <div className="divider"></div>
                <div>
                  <HeartOutlined /> {data?.userFavorite}
                </div>
                <div className="divider"></div>
                <div>
                  <TeamOutlined /> {data?.userFriend}
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
          onClick={() => navigate("/")}
          url1={data && userPost[0]?.url}
          url2={data && userPost[1]?.url}
        />
        <FriendsButton onClick={() => navigate("/mypage/friends")} />
      </ProfileContainer>
    </>
  );
};
