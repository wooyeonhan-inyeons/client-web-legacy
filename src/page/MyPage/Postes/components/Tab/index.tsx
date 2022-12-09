import { useRecoilState } from "recoil";
import { recoil_ } from "../../../../../recoil";
import styled from "styled-components";
import { COLOR, MYPAGE_, zIndex } from "../../../../../constants";

const StyledTab = styled.div`
  width: 100vw;
  height: 3rem;
  line-height: 3rem;
  cursor: pointer;
  font-size: 0.75rem;
  background-color: ${COLOR.background};

  position: fixed;
  top: 3.5rem;
  left: 0;
  z-index: ${zIndex.default};

  & > .item {
    display: inline-block;
    width: 50%;
    text-align: center;
    color: #ffffff8a;
  }
`;

const ActiveButton = {
  color: "#fff",
  fontWeight: "bold",
};

export const Tab = () => {
  const [tab, setTab] = useRecoilState(recoil_.tabState);

  return (
    <>
      <StyledTab>
        <div
          className="item"
          onClick={() => setTab(MYPAGE_.MY_POST)}
          style={tab === MYPAGE_.MY_POST ? ActiveButton : {}}
        >
          나의 우연들
        </div>
        <div
          className="item"
          onClick={() => setTab(MYPAGE_.VISITED_POST)}
          style={tab === MYPAGE_.VISITED_POST ? ActiveButton : {}}
        >
          발견한 우연들
        </div>
      </StyledTab>
    </>
  );
};
