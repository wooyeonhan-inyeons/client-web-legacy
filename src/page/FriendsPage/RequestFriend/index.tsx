import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AvatarColor, COLOR } from "../../../constants";
import Avatar from "boring-avatars";

const ListBox = styled.ul`
    position: absolute;
    width: 90vw;   
    /* text-align: center;  */
    list-style: none;
    margin: 0px;
    padding: 0px;
`

const ListEl = styled.li`
    width: 92vw;
    height: 76px;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #61708A;
    border: none;
    border-radius: 16px;
    margin-bottom: 8px;
`

const time = styled.p

const Explaination = styled.p`
    display: inline-flex;
    color: white;
    flex-grow: 4;
`
const BtnBox = styled.div`
    display: flex;
    flex-grow: 3;
    height: 100%;
`

const YesBtn = styled.button`
    width: 16%;
    height: 72%;
    background-color: white;
    border: none;
    border-radius: 10px;
    color: black;
    outline: none;

    font-weight: 900;

    cursor: pointer;
    &:hover {
        background-color: whitesmoke;
    }
`

const NoBtn = styled.button`
    width: 16%;
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
    // const [requests, setRequests] = useState([]);

    // useEffect(() => {
    //   first
    
    //   return () => {
    //     second
    //   }
    // }, [third])
    
    return (
        <>
        <ListBox>
            <ListEl>
                <Avatar
                    size={37}
                    variant="beam"
                    name={"cc"}
                    colors={AvatarColor}
                />dd
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