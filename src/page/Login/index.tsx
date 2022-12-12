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
          <LoginTitle
            style={{
              fontFamily: "KOTRA_SONGEULSSI",
              lineHeight: 1.5,
            }}
          >
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
                    "/auth/kakao/redirect?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNmRmZDhmZjEtOWMzMC00ZjFlLTg3OTQtMmVkMmJmZGNlMmUwIiwibmFtZSI6IuydtOybkOyjvCIsImVtYWlsIjoidHVydGxlNDI2NUBrYWthby5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY3MDgzMDMwNCwiZXhwIjoxNjcwOTE2NzA0fQ.qErzLsjjxLuXCR3bPIhpEFDW9t3fl0oWdsO94cuffRM"
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
