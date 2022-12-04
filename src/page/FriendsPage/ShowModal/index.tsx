import React, { useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "../../../constants";
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
    display: flex;
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
export interface IProps {
    friendId: string,
    closeModal: ()=> void
}

function ShowModal({ friendId, closeModal }: IProps) {
    useEffect(() => {
        getDetail({friendId}).then((res: any) => {
            console.log(res.name, "hello");
        });
    }, []);

    return (
        <>
        <Modal>
            <Label>친구 요청</Label>
            <DetailBox>
                응애 나 모달창
                {friendId}
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