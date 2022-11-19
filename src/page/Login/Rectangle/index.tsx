import styled, { keyframes } from "styled-components";
import { zIndex } from "../../../constants";

const animation = keyframes`
  0% {
    transform:rotate(0deg);
  }
  100%{
    transform:rotate(360deg);
  }
`;

export const Rectangle = styled.div`
  width: 70vh;
  height: 70vh;
  border-radius: 50%;

  background: #263145;
  background: linear-gradient(90deg, #263145 0%, #02002400 100%);
  box-shadow: 20px 20px 100px 0px #00000045;
  animation: ${animation} 3.5s linear infinite; //1초동안 선형 무한 속성값주기

  position: absolute;
  top: -20%;
  right: 20%;
  z-index: ${zIndex.background};
`;
