import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import {
  LeftOutlined,
  BellOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { HEADER_FN, COLOR } from "../../../constants";

const StyledButton = styled.div`
  padding: 0.5rem 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const AlarmBadge = styled.div`
  &::after {
    content: "";
    position: absolute;
    width: 0.4rem;
    height: 0.4rem;
    transform: translate(-0.4rem, 0.5rem);
    border-radius: 50%;
    background-color: ${COLOR.secondary};
  }
`;

interface Props {
  fn?: HEADER_FN;
}

interface FN {
  icon: React.ReactNode;
  fn: () => void;
}

export const HeaderButton = ({ fn = HEADER_FN.EMPTY }: Props) => {
  const navigate = useNavigate();

  const BUTTON_TYPE: { [key in HEADER_FN]: FN } = {
    [HEADER_FN.ALARM]: {
      icon: (
        <AlarmBadge>
          <BellOutlined />
        </AlarmBadge>
      ),
      fn: () => navigate(-1),
    },
    [HEADER_FN.GO_BACK]: { icon: <LeftOutlined />, fn: () => navigate(-1) },
    [HEADER_FN.MYPAGE]: {
      icon: <UserOutlined />,
      fn: () => navigate("/mypage"),
    },
    [HEADER_FN.PULS]: { icon: <PlusOutlined />, fn: () => navigate(-1) },
    [HEADER_FN.EMPTY]: { icon: "", fn: () => undefined },
  };

  return (
    <>
      <StyledButton onClick={BUTTON_TYPE[fn].fn}>
        {BUTTON_TYPE[fn].icon}
      </StyledButton>
    </>
  );
};
