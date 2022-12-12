import React, { useEffect, useState } from "react";
import { EllipsisOutlined, CopyOutlined } from "@ant-design/icons";
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
import { message } from 'antd';
import { AvatarColor, COLOR } from "../../../constants";
import Avatar from "boring-avatars";
import { getFriends } from "./../api";
import ShowModal from "./ShowModal";
import styled from "styled-components";
import More from "./More";
import { useRecoilState, useRecoilValue } from "recoil";
import { recoil_ } from "../../../recoil";
import { friendCountState } from "../../../recoil/friend";

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

const CopyBtn = styled.button`
  border: 0;
  outline: 0;
  background-color: ${COLOR.background};
  /* float: right; */
  border-radius: 16px;
  font-size: 1.3rem;
  position: relative; bottom: 0.4rem;
`

const IdBox = styled.div`
  display: flex;
  width: 100%;
`

function FriendsList() {
  const [friendInput, setFriendInput] = useState<string>("");
  const [friends, setFriends] = useState([]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [more, setMore] = useState<boolean>(false);
  const user = useRecoilValue(recoil_.userState);
  
  const closeModal = () => setModalOpen(false);
  const resetInput = () => setFriendInput("");
  const onChange = (event: any) => setFriendInput(event.target.value);
  const onSubmit = (event: any) => {
    event.preventDefault();
  };
  const onClickModal = () => {
    if (!friendInput) {
      console.log("비어있음")
    } else if (friendInput === user.userId ){
      alert("본인 아이디는 요청할 수 없습니다.");
      setFriendInput("");
    } 
    else {
      setModalOpen(true);
    }
  };
  const [currentInfo, setCurrentInfo] = useState({});
  
  const onMore = (e: any) => {
    const index = e.currentTarget.dataset.index;
    setCurrentInfo(friends[index]);
    setMore(true);
  };

  const closeMore = () => {
    setMore(false);
  };

  useEffect(() => {
    getFriends().then((res: any) => {
      // console.log(res);
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
  }, [more]);

  const doCopy = (user_id : string) => {
    // 흐음 1.
    if (navigator.clipboard) {
      // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
      navigator.clipboard
        .writeText(user_id)
        .then(() => {
          alert("클립보드에 복사되었습니다.");
        })
        .catch(() => {
          alert("복사를 다시 시도해주세요.");
        });
    } else {
      // 흐름 2.
      if (!document.queryCommandSupported("copy")) {
        return alert("복사하기가 지원되지 않는 브라우저입니다.");
      }

      // 흐름 3.
      const textarea = document.createElement("textarea");
      textarea.value = user_id;
      textarea.style.top = "";
      textarea.style.left = "";
      textarea.style.position = "fixed";

      // 흐름 4.
      document.body.appendChild(textarea);
      // focus() -> 사파리 브라우저 서포팅
      textarea.focus();
      // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
      textarea.select();
      // 흐름 5.
      document.execCommand("copy");
      // 흐름 6.
      document.body.removeChild(textarea);
      alert("클립보드에 복사되었습니다.");
    }
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <InputDiv>
          <IdBox>
            <IdLabel>
              내 아이디 : {user.userId}
            </IdLabel>
            <CopyBtn onClick={() => doCopy(user.userId)}>
              <CopyOutlined />
            </CopyBtn>
          </IdBox>
          <Input
            onChange={onChange}
            value={friendInput}
            type="text"
            placeholder="아이디를 입력하세요"
          ></Input>
          <Button onClick={onClickModal}>추가</Button>
        </InputDiv>
        {modalOpen && (
          <ShowModal friendId={friendInput} closeModal={closeModal} resetInput={resetInput}></ShowModal>
        )}
        <ListDiv>
          <ListBox>
            {friends.map((item: any, index: number) => (
              <List key={index}>
                <ImageDiv>
                  <Avatar
                    size={40}
                    variant="beam"
                    name={item.friend_id}
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
                {more &&
                  <More
                    item={currentInfo}
                    friendId={item.friend_id}
                    closeMore={closeMore}
                  ></More>
                }
              </List>
            ))}
          </ListBox>
        </ListDiv>
      </form>
    </>
  );
}
export default FriendsList;
