import styled from "styled-components";
import { Header } from "../../../components/Header";
import { StyledContainer } from "../../../components/StyledContainer";
import { COLOR } from "../../../constants";

const InputDiv = styled.div`
  width: 100%;
  height: 7vh;
  position: relative;
  margin-bottom: 3em;
`

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
  border: solid 2px white; border-radius: 12px;
  color: white;
  flex-grow: 1;
`

const InputLabel = styled.p`
  color:white;
  margin: 0;
  font-weight: bold;
`

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
  border: solid 2px white; border-radius: 12px;
  color: white;
  flex-grow: 1;
`

const ButtonDiv = styled.div`
  width: 100%;
  height: 5vh;
  padding-top: 3em;
`

const CancelBtn = styled.button`
  width: 30%;
  height: 7vh;
  border: solid 0px white; border-radius: 12px;
  background-color: ${COLOR.background};
  font-weight: bold;
`

const SaveBtn = styled.button`
  width: 70%;
  height: 7vh;
  border: solid 2px white; border-radius: 12px;
  font-weight: bold;
  color: black;
`
const Edit = () => {
  return (
    <>
      <Header title="프로필 수정" />
        <StyledContainer>
          <InputDiv>
          <InputLabel>닉네임</InputLabel>
          <Input />
          </InputDiv>
          <InputDiv>
          <InputLabel>상태메세지</InputLabel>
          <StatusMessage></StatusMessage>
          </InputDiv>
          <ButtonDiv>
            <CancelBtn>취소</CancelBtn>
            <SaveBtn>수정하기</SaveBtn>
          </ButtonDiv>
        </StyledContainer>
    </>
  );
}

export default Edit;