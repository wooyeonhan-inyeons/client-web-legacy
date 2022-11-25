import React from "react";
import { SNS } from "../../constants";

import { SnsButton } from "./Button";
import { LoginTitle } from "./Title";
import { Rectangle } from "./Rectangle";
import { CenterBox } from "./CenterBox";

import googleLogo from "./Button/img/googleLogo.png";
import kakaoLogo from "./Button/img/kakaoLogo.png";

const Login = () => {
  return (
    <CenterBox>
      <Rectangle />
      <LoginTitle>
        우연한 <br />
        발견
      </LoginTitle>
      <div>
        <SnsButton sns={SNS.KAKAO}>
          <img src={kakaoLogo} alt="kakao" />
          <div className="title">Kakao 계정으로 로그인</div>
        </SnsButton>
        <SnsButton sns={SNS.GOOGLE}>
          <img src={googleLogo} alt="google" />
          <div className="title">Google 계정으로 로그인</div>
        </SnsButton>
        <SnsButton sns={SNS.NONE} onClick={() => (window.location.href = "/")}>
          게스트로 볼래요
        </SnsButton>
      </div>
    </CenterBox>
  );
};

export default Login;
