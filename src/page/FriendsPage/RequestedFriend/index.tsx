import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AvatarColor, COLOR } from "../../../constants";
import Avatar from "boring-avatars";
import { getRequests, getOk, getNo } from "./api";
import { message } from "antd";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import ko from "timeago.js/lib/lang/ko";
import { useRecoilState } from "recoil";
import { friendCountState, requestedCountState } from "../../../recoil/friend";

const ListBox = styled.ul`
  width: 100%;
  /* text-align: center;  */
  list-style: none;
  margin: 0px;
  padding: 0px;
`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  float: left;
  width: 15%;
  position: relative;
  top: 4px;
  padding-right: 10px;
  padding-bottom: 5px;
`;
const ListEl = styled.li`
  width: 100%;
  height: 76px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #61708a;
  border: none;
  border-radius: 16px;
  margin-bottom: 8px;
  padding: 0px 10px 0px 10px;
`;

const TextBox = styled.div`
  width: 35%;
  flex-grow: 4;
  padding-right: 5px;
`;

const Time = styled.div`
  font-size: 10px;
`;

const Explaination = styled.p`
  color: white;
  font-size: 13px;
  margin: auto;
`;
const BtnBox = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0px;
  padding: 0px;
`;

const YesBtn = styled.button`
  width: 50%;
  height: 72%;
  background-color: white;
  border: solid 2px white;
  border-radius: 16px;
  color: black;
  outline: none;
  margin-right: 0.5em;
  font-weight: 900;
  font-size: 14px;

  cursor: pointer;
  &:hover {
    background-color: #e9e9e9;
  }
`;

const NoBtn = styled.button`
  width: 50%;
  height: 72%;
  border: solid 2px ${COLOR.background};
  border-radius: 16px;
  background-color: ${COLOR.background};
  color: white;
  font-size: 14px;
  outline: none;

  font-weight: 900;

  cursor: pointer;
  &:hover {
    background-color: #242a37;
  }
`;
export interface IProps {
  friend_id: string;
}

function RequestFriend() {
  const [requested, setRequested] = useState<any>([]);
  const [date, setDate] = useState("");
  const [numFr, setNumFr] = useRecoilState(friendCountState);
  const [numRe, setNumRe] = useRecoilState(requestedCountState);

  useEffect(() => {
    getRequests().then((res: any) => {
      const requestedFr: any = res.map((data: any) => ({
        friend_id: data.friend_id,
        friend_name: data.follower.name,
        at_Time: data.create_at,
      }));
      const result: any = [...requestedFr];
      setRequested(result);
      setNumRe(result.length);
      setDate(res.create_at);
    });
  }, []);

  const onClickOk = (friend_id: string) => {
    getOk(friend_id)
      .then((res) => console.log(res))
      .then(() => onRemove(friend_id))
      .then(() => {
        setNumFr(numFr + 1);
        setNumRe(numRe - 1);
        message.success("수락 완료!");
      })
      .catch((e) => console.log(e));
  };

  const onClickNo = (friend_id: string) => {
    getNo(friend_id)
      .then((res) => console.log(res))
      .then(() => onRemove(friend_id))
      .then(() => {
        setNumRe(numRe - 1);
        message.success("거절 완료!");
      })
      .catch((e) => console.log(e));
  };

  const onRemove = (id: string) => {
    setRequested(requested.filter((user: any) => user.friend_id !== id));
  };

  const time = date && timeago.format(date, "ko");
  timeago.register("ko", ko);

  return (
    <>
      <ListBox>
        {requested.map((item: any, index: number) => (
          <ListEl key={index}>
            <ImageDiv>
              <Avatar
                size={45}
                variant="beam"
                name={item.friend_id}
                colors={AvatarColor}
              />
            </ImageDiv>
            <TextBox>
              {/* <Time>10분 전</Time> */}
              <TimeAgo
                datetime={date}
                opts={{ relativeDate: new Date().toISOString() }}
                locale="ko"
              />
              <Explaination>
                <span style={{ fontWeight: "900" }}>{item.friend_name}</span>
                님으로부터 친구 요청이 왔습니다.
              </Explaination>
            </TextBox>
            <BtnBox>
              <YesBtn onClick={() => onClickOk(item.friend_id)}>수락</YesBtn>
              <NoBtn onClick={() => onClickNo(item.friend_id)}>거절</NoBtn>
            </BtnBox>
          </ListEl>
        ))}
      </ListBox>
    </>
  );
}
export default RequestFriend;
