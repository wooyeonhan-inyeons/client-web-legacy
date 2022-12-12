import React from "react";
import { useNavigate } from "react-router-dom";
import { SNS } from "../../constants";

import { SnsButton } from "./Button";
import { LoginTitle } from "./Title";
import { Rectangle } from "./Rectangle";
import { CenterBox } from "./CenterBox";

import googleLogo from "./Button/img/googleLogo.png";
import kakaoLogo from "./Button/img/kakaoLogo.png";
import { BACK_URL } from "../../constants/GlobalConstants";
import { StyledContainerFull } from "../../components/StyledContainer";

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <StyledContainerFull>
        <CenterBox>
          <Rectangle />
          <LoginTitle>
            우연한 <br />
            발견
          </LoginTitle>
          <div>
            <SnsButton sns={SNS.KAKAO}>
              <img src={kakaoLogo} alt="카카오" />
              <div
                className="title"
                onClick={() =>
                  (window.location.href = `${BACK_URL}/auth/kakao`)
                }
              >
                Kakao 계정으로 로그인
              </div>
            </SnsButton>
            <SnsButton sns={SNS.GOOGLE}>
              <img src={googleLogo} alt="구글" />
              <div className="title">Google 계정으로 로그인</div>
            </SnsButton>
            {window.location.hostname === "localhost" && (
              <SnsButton
                sns={SNS.NONE}
                onClick={() =>
                  navigate(
                    "/auth/kakao/redirect?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiM2IwMTM5NTctMGI0Yy00Y2RiLWEwYjktMTc4ZWJmMTA0M2YwIiwibmFtZSI6IuyaqeybkCIsImVtYWlsIjoieW9uZ3dvbjA4MjRAbmF2ZXIuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NzA4MTA1MTMsImV4cCI6MTY3MDg5NjkxM30.EDBkEfjgzzrBD5nTWTG8-L3ByG5qNR8CpX8inbgr-Aw"
                  )
                }
              >
                로컬 테스트 전용 로그인
              </SnsButton>
            )}
          </div>
        </CenterBox>
      </StyledContainerFull>
    </>
  );
};

export default Login;
