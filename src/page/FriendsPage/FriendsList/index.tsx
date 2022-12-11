import React, { useEffect, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  InputDiv,
  Input,
  Button,
  ListDiv,
  ListBox,
  List,
  IdLabel,
  FriendName,
  FriendMessage,
} from "../styled";
import message from 'antd';
import { AvatarColor, COLOR } from "../../../constants";
import Avatar from "boring-avatars";
import { getFriends } from "./../api";
import ShowModal from "./ShowModal";
import styled from "styled-components";
import More from "./More";
import { useRecoilValue } from "recoil";
import { recoil_ } from "../../../recoil";

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  float: left;
  width: 15%;
  position: relative;
  top: 4px;
  padding-bottom: 15px;
`;

const TextBox = styled.div`
  width: 20%;
  flex-grow: 4;
  padding-right: 5px;
  padding-bottom: 10px;
`;

function FriendsList() {
  const [friendInput, setFriendInput] = useState<string>("");
  const [friends, setFriends] = useState([]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [more, setMore] = useState<boolean>(false);

  const closeModal = () => setModalOpen(false);
  const onChange = (event: any) => setFriendInput(event.target.value);
  const onSubmit = (event: any) => {
    event.preventDefault();
  };
  const onClickModal = () => {
    if (!friendInput) {
      console.log("비어있음")
    } else {
      setModalOpen(true);
    }
  };
  const [currentInfo, setCurrentInfo] = useState({});
  const user = useRecoilValue(recoil_.userState);
  
  console.log("user: ", user.userId);
  const onMore = (e: any) => {
    const index = e.target.dataset.index;
    setCurrentInfo(friends[index]);
    setMore(true);
  };

  const closeMore = () => {
    setMore(false);
  };

  useEffect(() => {
    getFriends().then((res: any) => {
      console.log(res);
      const follower = res.follower.map((data: any) => ({
        friend_id: data.friend_id,
        user_info: data.follower,
      }));
      const following = res.following.map((data: any) => ({
        friend_id: data.friend_id,
        user_info: data.following,
      }));
      const result: any = [...follower, ...following];
      setFriends(result);
    });
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <InputDiv>
          <IdLabel>내 아이디 : {user.userId}</IdLabel>
          <Input
            onChange={onChange}
            value={friendInput}
            type="text"
            placeholder="아이디를 입력하세요"
          ></Input>
          <Button onClick={onClickModal}>추가</Button>
        </InputDiv>
        {modalOpen && (
          <ShowModal friendId={friendInput} closeModal={closeModal}></ShowModal>
        )}
        <ListDiv>
          <ListBox>
            {friends.map((item: any, index: number) => (
              <List key={index}>
                <ImageDiv>
                  <Avatar
                    size={40}
                    variant="beam"
                    name={"cc"}
                    colors={AvatarColor}
                  />
                </ImageDiv>
                <TextBox>
                  <FriendName>{item.user_info.name}</FriendName>
                  <FriendMessage>{item.user_info.message}</FriendMessage>
                </TextBox>
                <EllipsisOutlined
                  data-index={index}
                  style={{
                    width: "2em",
                    position: "absolute",
                    right: "10%",
                    paddingBottom: "3px",
                  }}
                  onClick={onMore}
                />
                {more && (
                  <More
                    item={currentInfo}
                    friendId={item.friend_id}
                    closeMore={closeMore}
                  ></More>
                )}
              </List>
            ))}
          </ListBox>
        </ListDiv>
      </form>
    </>
  );
}

export default FriendsList;
