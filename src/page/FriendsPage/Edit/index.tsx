import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../../../components/Header";
import { StyledContainer } from "../../../components/StyledContainer";
import { COLOR } from "../../../constants";
import { getInfo } from "./api";
import { getEdit } from "./api";

const InputDiv = styled.div`
  width: 100%;
  height: 7vh;
  position: relative;
  margin-bottom: 3em;
`;

const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 7.5vh;
  min-height: 55px;
  font-size: 20px;
  border: 0;
  border-radius: 10px;
  outline: none;
  padding-left: 10px;
  background-color: ${COLOR.background};
  font-family: inherit;
  border: solid 2px white;
  border-radius: 12px;
  color: white;
  flex-grow: 1;
`;

const InputLabel = styled.p`
  color: white;
  margin: 0;
  padding-bottom: 5px;
  padding-left: 5px;
`;

const StatusMessage = styled.textarea`
  position: absolute;
  width: 100%;
  max-height: 100px;
  font-size: 20px;
  border: 0;
  border-radius: 10px;
  outline: none;
  padding-left: 10px;
  padding-top: 5px;
  background-color: ${COLOR.background};
  font-family: inherit;
  border: solid 2px white;
  border-radius: 12px;
  color: white;
  flex-grow: 1;
`;

const ButtonDiv = styled.div`
  width: 100%;
  height: 5vh;
  padding-top: 3em;
`;

const CancelBtn = styled.button`
  width: 30%;
  height: 7vh;
  border: solid 0px white;
  border-radius: 12px;
  background-color: ${COLOR.background};
  font-weight: bold;
`;

const SaveBtn = styled.button`
  width: 70%;
  height: 7vh;
  border: solid 2px white;
  border-radius: 12px;
  font-weight: bold;
  color: black;
  background-color: white;

  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Edit = () => {
  const navigate = useNavigate();
  const [nickname, setNickName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const onChange = (e: any) => {
    setMessage(e.currentTarget.value);
  };

  const onEdit = () => {
    getEdit(nickname, message).then((res) => console.log(res));
  };

  useEffect(() => {
    getInfo().then((res: any) => {
      console.log(res);
      setNickName(res.name);
      setMessage(res.message);
    });
  }, []);

  return (
    <>
      <Header title="프로필 수정" />
      <StyledContainer>
        <InputDiv>
          <InputLabel>이름</InputLabel>
          <Input readOnly={true} placeholder={nickname} value={nickname} />
        </InputDiv>
        <InputDiv>
          <InputLabel>상태메세지</InputLabel>
          <StatusMessage
            onChange={onChange}
            value={message}
            placeholder={message}
          ></StatusMessage>
        </InputDiv>
        <ButtonDiv>
          <CancelBtn onClick={() => navigate(-1)}>취소</CancelBtn>
          <SaveBtn onClick={onEdit}>수정하기</SaveBtn>
        </ButtonDiv>
      </StyledContainer>
    </>
  );
};

export default Edit;
