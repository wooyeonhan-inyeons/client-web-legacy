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
                    "/auth/kakao/redirect?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY5NjkxNzg2LCJleHAiOjE2Njk3NzgxODZ9.nxddPMx4U9RahBeusqS3og5lkxbSjF5wHrxgcHQObtM"
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
