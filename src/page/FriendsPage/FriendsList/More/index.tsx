import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AvatarColor, COLOR } from "../../../../constants";
import Avatar from "boring-avatars";
import { Modal, ImageDiv, BackBtn, SaveBtn, BtnBox, Name, Message, Mail } from "./../ShowModal"
import TextBox from "./../index"

export interface IProps {
    friendId: string,
    closeMore: ()=> void
}

// 모달 UI 수정
function More({ friendId, closeMore }: IProps) {
    const [detail, setDetail] = useState([]);
    const [success, setSuccess] = useState(false);
    

    return (
        <>
        <Modal>
            {/* <ImageDiv>
                <Avatar
                    size={40}
                    variant="beam"
                    name={"cc"}
                    colors={AvatarColor}
                />
            </ImageDiv>
            <TextBox>
                <Name>이원주</Name>
                <Mail>ㅇㅇ@naver.com</Mail>
                <Message>안녀하세여엉</Message>
            </TextBox>
            <BtnBox>

            </BtnBox> */}
        </Modal>
        </>
    );
}

export default More;