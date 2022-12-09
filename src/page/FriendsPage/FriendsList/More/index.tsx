import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AvatarColor, COLOR } from "../../../../constants";
import Avatar from "boring-avatars";
import { getDelete } from "./api";

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  max-width: 500px;
  height: 50vh;
  min-height: 350px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: ${COLOR.background};
  border: none;
  border-radius: 15px;
  box-shadow: 0 1rem 2rem hsl(0 0% 0% / 20%);
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 7;
  justify-content: center;
  align-items: center;
  padding: 0px 25px 0px 25px;
`;

const ImageBox = styled.div`
  display: inline;
  display: flex;
  justify-content: center;
  padding-right: 15px;
`;

const BtnBox = styled.div`
  display: flex;
  width: 100%;
  height: 10vh;
  text-align: center;
  justify-content: space-evenly;
`;

const BackBtn = styled.button`
  background-color: #1a212e;
  font-family: inherit;
  font-size: 20px;
  margin: 10px 20px 10px 20px;
  border: none;
  border-radius: 8px;
  width: 35%;
  height: 60%;
  margin-right: 0px;
  box-shadow: 0 1rem 2rem hsl(0 0% 0% / 20%);

  cursor: pointer;
  &:hover {
    background-color: #1b253a;
  }
`;
export const SaveBtn = styled.button`
  background-color: white;
  color: black;
  font-family: inherit;
  margin: 10px 20px 10px 20px;
  border: none;
  border-radius: 8px;
  margin-left: 0px;
  width: 35%;
  height: 60%;
  box-shadow: 0 1rem 2rem hsl(0 0% 0% / 20%);

  cursor: pointer;
  &:hover {
    background-color: #e1e1e1;
  }
`;

const TextBox = styled.div`
  display: inline;
`;

const Mail = styled.p`
  font-size: 15px;
  margin: auto;
  color: #c2c2c2cb;
`;

const Name = styled.p`
  display: flex;
  font-size: 30px;
  font-weight: 600;
  margin: auto;
`;

const Message = styled.p`
  font-size: 18px;
  margin: auto;
`;
const CheckWarn = styled.p`
  font-size: 15px;
  flex-grow: 1;
  margin: auto;
`;

export interface IProps {
  item: any;
  friendId: string;
  closeMore: () => void;
}

function More({ item, friendId, closeMore }: IProps) {
    const onDelete = () => {
        getDelete(item.friend_id).then((res: any) => {
            console.log("deleted");
        })
    }

    return (
    <>
    <Modal>
        <InfoBox>
            <ImageBox>
                <Avatar size={50} variant="beam" name={"cc"} colors={AvatarColor} />
            </ImageBox>
            <TextBox>
                <Name>{item?.user_info?.name}</Name>
                <Message>{item?.user_info?.message}</Message>
            </TextBox>
        </InfoBox>
        <CheckWarn>이 친구를 삭제하시겠습니까?</CheckWarn>
        <BtnBox>
        <BackBtn onClick={closeMore}>취소</BackBtn>
        <SaveBtn onClick={onDelete}>삭제</SaveBtn>
        </BtnBox>
    </Modal>
    </>
    );
}

export default More;
