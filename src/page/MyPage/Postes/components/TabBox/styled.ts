import styled from "styled-components";
import { MYPAGE_ } from "../../../../../constants";

export const TabContainer = styled.div`
  height: 100%;
  width: 200%;
  position: absolute;
  overflow: hidden;

  transition: all ease-in-out 0.5s;

  & > div {
    display: inline-block;
  }
`;

export const ActiveStyle = (state: MYPAGE_) => {
  let value;
  switch (state) {
    case MYPAGE_.VISITED_POST:
      value = "-100%";
      break;
    case MYPAGE_.MY_POST:
      value = "0%";
  }
  return { left: value };
};
