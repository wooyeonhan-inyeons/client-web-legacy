import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AvatarColor, COLOR } from "../../../constants";
import Avatar from "boring-avatars";
import { getRequests } from "./api";

const ListBox = styled.ul`
    width: 100%;
    /* text-align: center;  */
    list-style: none;
    margin: 0px;
    padding: 0px;
`

const ImageDiv = styled.div`
    display: flex;
    justify-content: center;
    float: left;
    width: 15%;
    position: relative; top: 4px;
    padding-right: 10px;
    padding-bottom: 5px;
`
const ListEl = styled.li`
    width: 100%;
    height: 76px;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #61708A;
    border: none;
    border-radius: 16px;
    margin-bottom: 8px;
    padding: 0px 10px 0px 10px;
`

const TextBox = styled.div`
    width: 35%;
    flex-grow: 4;
    padding-right: 5px;
`

const Time = styled.div`
    font-size: 10px;
`

const Explaination = styled.p`
    color: white;
    font-size: 13px;
    margin: auto;
`
const BtnBox = styled.div`
    width: 35%;
    display: flex;
    align-items: center;
    /* flex-grow: 3; */
    height: 100%;
    margin: 0px;
    padding: 0px;
`

const YesBtn = styled.button`
    width: 50%;
    height: 72%;
    background-color: white;
    border: none;
    border-radius: 10px;
    color: black;
    outline: none;
    margin-right: 0.5em;
    font-weight: 900;

    cursor: pointer;
    &:hover {
        background-color: whitesmoke;
    }
`

const NoBtn = styled.button`
    width: 50%;
    height: 72%;
    background-color: white;
    border: none;
    border-radius: 10px;
    background-color: ${COLOR.background};
    color: white;
    outline: none;

    font-weight: 900;

    cursor: pointer;
    &:hover {
        background-color: whitesmoke;
    }
`

function RequestFriend() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        getRequests().then((res: any ) => {
            const friend_id = res.friend_id;
            const friend_name = res.follower.name
              setRequests(friend_name);
            });
    }, []);
    
    return (
        <>
        <ListBox>
            {requests.map((item: any, index: number) => (
                <ListEl key={index}>
                    <ImageDiv>
                        <Avatar
                            size={45}
                            variant="beam"
                            name={"cc"}
                            colors={AvatarColor}
                        />
                    </ImageDiv>
                    <TextBox>
                        <Time>10분 전</Time>
                        <Explaination>{item}님으로부터 친구 요청이 왔습니다.</Explaination>
                    </TextBox>
                    <BtnBox>
                        <YesBtn>수락</YesBtn>
                        <NoBtn>거절</NoBtn>
                    </BtnBox>
                </ListEl>
            ))}
            <ListEl>
                <ImageDiv>
                    <Avatar
                        size={45}
                        variant="beam"
                        name={"cc"}
                        colors={AvatarColor}
                    />
                </ImageDiv>
                <TextBox>
                    <Time>10분 전</Time>
                    <Explaination>뜨거운감자님으로부터 친구 요청이 왔습니다.</Explaination>
                </TextBox>
                <BtnBox>
                    <YesBtn>수락</YesBtn>
                    <NoBtn>거절</NoBtn>
                </BtnBox>
            </ListEl>
            <ListEl>
                <ImageDiv>
                    <Avatar
                        size={45}
                        variant="beam"
                        name={"cc"}
                        colors={AvatarColor}
                    />
                </ImageDiv>
                <TextBox>
                    <Time>10분 전</Time>
                    <Explaination>뜨거운감자님으로부터 친구 요청이 왔습니다.</Explaination>
                </TextBox>
                <BtnBox>
                    <YesBtn>수락</YesBtn>
                    <NoBtn>거절</NoBtn>
                </BtnBox>
            </ListEl>
        </ListBox>
        </>
    )
}
export default RequestFriend;