import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoil_User } from "../../recoil";
import { SNS, USER_ROLE } from "../../constants";
import { GetLogin } from "./api";

import { StyledContainer } from "../../components/StyledContainer";
import { SnsButton } from "./Button";
import { LoginTitle } from "./Title";
import { Rectangle } from "./Rectangle";
import { CenterBox } from "./CenterBox";

import googleLogo from "./Button/img/googleLogo.png";
import kakaoLogo from "./Button/img/kakaoLogo.png";

const Login = () => {
  const [, setUser] = useRecoilState(recoil_User.userState);
  const navigate = useNavigate();

  const { mutate } = useMutation(GetLogin, {
    onMutate: () => {
      //시작
      console.log("로그인시작");
    },
    onError: (error) => {
      console.log("onError", error);
    },
    onSuccess: (response) => {
      console.log("onError", response);
      setUser({ userId: 0, role: USER_ROLE.USER });
    },
    onSettled: () => {
      //종료
    },
  });

  return (
    <>
      <StyledContainer>
        <CenterBox>
          <Rectangle />
          <LoginTitle>
            우연한 <br />
            발견
          </LoginTitle>
          <div>
            <SnsButton sns={SNS.KAKAO}>
              <img src={kakaoLogo} />
              <div
                className="title"
                onClick={() => mutate({ service: "kakao" })}
              >
                Kakao 계정으로 로그인
              </div>
            </SnsButton>
            <SnsButton sns={SNS.GOOGLE}>
              <img src={googleLogo} />
              <div className="title">Google 계정으로 로그인</div>
            </SnsButton>
            <SnsButton sns={SNS.NONE} onClick={() => navigate("/")}>
              게스트로 볼래요
            </SnsButton>
          </div>
        </CenterBox>
      </StyledContainer>
    </>
  );
};

export default Login;
