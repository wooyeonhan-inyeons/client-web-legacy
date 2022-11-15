import styled from "styled-components";
import { SNS } from "../../../constants";

export interface CommonState {
  sns: SNS;
}

export const SnsButton = styled.button<{ sns: SNS }>`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  margin-bottom: 1rem;
  padding: 0 1rem;
  border: none;
  background: none;

  color: ${(props) => (props.sns === SNS.NONE ? "#fff" : "#000000d9")};
  background-color: ${(props) => props.sns === SNS.KAKAO && "#FEE500"};
  background-color: ${(props) => props.sns === SNS.GOOGLE && "#FFFFFF"};

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  cursor: pointer;
  :hover {
    filter: opacity(0.8);
  }

  img {
    height: 60%;
  }
  .title {
    margin: 0 auto;
  }
`;
