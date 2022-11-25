import { useRecoilState } from "recoil";
import { recoil_ } from "../../../../recoil";
import styled from "styled-components";
import { MYPAGE_ } from "../../../../constants";

const StyledTab = styled.div`
  width: 100%;
  height: 3rem;
  cursor: pointer;

  & > .item {
    display: inline-block;
    width: 50%;
    text-align: center;
    color: #ffffff8a;
  }
`;

const ActiveButton = {
  color: "#fff",
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
          onClick={() => setTab(MYPAGE_.RECENT_POST)}
          style={tab === MYPAGE_.RECENT_POST ? ActiveButton : {}}
        >
          발견한 우연들
        </div>
      </StyledTab>
    </>
  );
};
