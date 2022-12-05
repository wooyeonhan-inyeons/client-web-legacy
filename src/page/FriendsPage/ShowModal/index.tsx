import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AvatarColor, COLOR } from "../../../constants";
import Avatar from "boring-avatars";
import { getDetail } from './api'


const Modal = styled.div`
    display: flex;
    flex-direction: column;

    width: 500px;
    height: 400px;
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: ${COLOR.background};
    border: none;
    border-radius: 15px;
    box-shadow: 0 1rem 2rem hsl(0 0% 0% / 20%);
`

const Label = styled.p`
    display: flex;
    margin: 20px 0 15px 0;
    font-size: medium;
    font-weight: 600;
    text-align: center;
    justify-content: center;
`

const DetailBox = styled.div`
    display: grid;
    height: 75vh;
    text-align: center;
    justify-content: center;
`

const BtnBox = styled.div`
    display: flex;
    height: 25vh;
    text-align: center;
    justify-content: center;
`

const BackBtn = styled.button`
    background-color: #1a212e;
    font-family: inherit;
    margin: 10px 20px 10px 20px;
    border: none;
    border-radius: 8px;
    width: 30%;
    height: 60%;
    box-shadow: 0 1rem 2rem hsl(0 0% 0% / 20%);

    cursor: pointer;
    &:hover {
        background-color: #1b253a;
    }
`
const SaveBtn = styled.button`
    background-color: white;
    color: black;
    font-family: inherit;
    margin: 10px 20px 10px 20px;
    border: none;
    border-radius: 8px;
    width: 30%;
    height: 60%;
    box-shadow: 0 1rem 2rem hsl(0 0% 0% / 20%);

    cursor: pointer;
    &:hover {
        background-color: #e1e1e1;
    }
`
const ImageDiv = styled.div`
    grid-row-start: 1;
    grid-row-end: 2;
`
const Name = styled.p`
    font-size: 30px;
    font-weight: 600;
    margin: 0px;
`

const Message = styled.p`
    font-size: 15px;
`

const Mail = styled.p`
    font-size: 15px;
`
export interface IProps {
    friendId: string,
    closeModal: ()=> void
}

// 모달 UI 수정
function ShowModal({ friendId, closeModal }: IProps) {
    const [detail, setDetail] = useState([]);
    // 친구정보 useState로 전달하기
    useEffect(() => {
        getDetail({friendId}).then((res: any ) => {
            const arr: any = [res.name, res.message, res.email];
            setDetail(arr);
        });
    }, []);

    return (
        <>
        <Modal>
            <Label>친구 요청</Label>
                <DetailBox>
                    <ImageDiv>
                        <Avatar
                        size={57}
                        variant="beam"
                        name={"cc"}
                        colors={AvatarColor}
                        />
                    </ImageDiv>
                    <Name>{detail[0]}</Name>
                    <Mail>{detail[2]}</Mail>
                    <Message>{detail[1]}</Message>
                </DetailBox>
            <BtnBox>
                <BackBtn onClick={closeModal}>취소</BackBtn>
                <SaveBtn>요청</SaveBtn>
            </BtnBox>
        </Modal>
        </>
    );
}

export default ShowModal;