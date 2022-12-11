import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import styled from "styled-components";
import { COLOR } from "../../constants";
import { useNavigate } from "react-router-dom";

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <>
      <StyledContainer>
        <div className="header">
          <ExclamationCircleFilled className="icon" /> 확인할 수 없는 오류가
          발생하였습니다.
        </div>
        <div className="content">
          잠시 후 다시 시도해 주세요. 지속적인 오류가 발생한다면 연락 바랍니다.
          <div className="buttons">
            <div className="button" onClick={() => navigate("/")}>
              홈으로 돌아가기
            </div>
          </div>
        </div>
      </StyledContainer>
    </>
  );
};

export default NoMatch;

export const StyledContainer = styled.div`
  padding: 4rem 1rem;
  // padding-top: 4rem;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: 100vh;
  max-width: 600px;
  overflow-x: hidden;

  background-color: ${COLOR.background};
  color: ${COLOR.content};

  .header {
    font-weight: bold;
    font-size: 2rem;
    word-break: keep-all;
  }
  .header .icon {
    color: ${COLOR.secondary};
    padding-right: 1rem;
  }

  .content {
    color: ${COLOR.content};
    font-size: 1.2rem;
    padding: 1rem;
    word-break: keep-all;
  }

  .content .buttons {
    margin-top: 6rem;
  }
  .content .buttons .button {
    width: 100%;
    padding: 1rem 0;
    border-radius: 0.5rem;
    text-align: center;
    font-size: 1rem;
    color: #222;
    background-color: ${COLOR.secondary};

    cursor: pointer;
  }
  .content .buttons .button:hover {
    filter: brightness(0.8);
  }
`;
