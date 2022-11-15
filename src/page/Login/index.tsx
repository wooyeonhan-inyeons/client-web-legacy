import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { StyledContainer } from "./StyledContainer";
import { SnsButton } from "./Button";
import { LoginTitle } from "./Title";
import { SNS } from "../../constants";

import googleLogo from "./Button/img/googleLogo.png";
import kakaoLogo from "./Button/img/kakaoLogo.png";

const Login = () => {
  return (
    <>
      <StyledContainer>
        {/* <div>
          <LeftOutlined onClick={() => (window.location.href = "/")} />
        </div> */}
        <LoginTitle>
          우연한 <br />
          발견
        </LoginTitle>
        <div>
          <SnsButton sns={SNS.KAKAO}>
            <img src={kakaoLogo} />
            <div className="title">Kakao 계정으로 로그인</div>
          </SnsButton>
          <SnsButton sns={SNS.GOOGLE}>
            <img src={googleLogo} />
            <div className="title">Google 계정으로 로그인</div>
          </SnsButton>
          <SnsButton
            sns={SNS.NONE}
            onClick={() => (window.location.href = "/")}
          >
            게스트로 볼래요
          </SnsButton>
        </div>
      </StyledContainer>
    </>
  );
};

export default Login;
