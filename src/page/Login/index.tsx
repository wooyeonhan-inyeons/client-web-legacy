import React from "react";
import { useNavigate } from "react-router-dom";
import { SNS, USER_ROLE } from "../../constants";
import { useRecoilState } from "recoil";
import { recoil_ } from "../../recoil";

import { SnsButton } from "./Button";
import { LoginTitle } from "./Title";
import { Rectangle } from "./Rectangle";
import { CenterBox } from "./CenterBox";

import googleLogo from "./Button/img/googleLogo.png";
import kakaoLogo from "./Button/img/kakaoLogo.png";
import { BACK_URL } from "../../constants/GlobalConstants";
import { StyledContainerFull } from "../../components/StyledContainer";

const Login = () => {
  const [, setUser] = useRecoilState(recoil_.userState);
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
            <SnsButton sns={SNS.NONE} onClick={() => navigate("/")}>
              게스트로 볼래요
            </SnsButton>
            {window.location.hostname === "localhost" && (
              <SnsButton
                sns={SNS.NONE}
                onClick={() => {
                  localStorage.setItem(
                    "key",
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzhhOTA4Y2ItMzAzMi00MTMwLWFiMWEtYjk2N2U0NjlkZmM5IiwibmFtZSI6IuydtOuPhOqyvSIsImVtYWlsIjoiZG85OEBrYWthby5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY2OTI5MDg1NSwiZXhwIjoxNjY5Mzc3MjU1fQ.34arnfIwuuqKDIXuzcGqArSlIYS1j6WrhcsXyptHyM0"
                  );
                  setUser({ userId: 0, role: USER_ROLE.USER });
                }}
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
