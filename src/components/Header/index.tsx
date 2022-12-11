import styled from "styled-components";

// import HeaderButton from "./HeaderButton";
import { COLOR, HEADER_FN, zIndex } from "../../constants";
import { HeaderButton } from "./HeaderButton";

const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 600px;
  height: 3rem;
  font-size: 1.3rem;

  left: 50%;
  transform: translate(-50%, 0);

  color: ${COLOR.content} !important;
  background-color: ${COLOR.background};
  z-index: ${zIndex.default};

  & > .left_side,
  & > .right_side {
    display: flex;
    height: 100%;
  }
`;

const HeaderTitle = styled.div`
  font-size: 1rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0px);
`;

export interface HeaderProps {
  /** @param {string} title - 기본값: ""*/
  title?: string;
  /** @param {string} vis_goBack - on/off*/
  vis_goBack?: boolean;
  /** @param {HEADER_FN} rightButton1 - 알람 | 뒤로가기 | 마이페이지 | + | empty*/
  rightButton1?: HEADER_FN;
  /** @param {HEADER_FN} rightButton2 - 알람 | 뒤로가기 | 마이페이지 | + | empty*/
  rightButton2?: HEADER_FN;
}

/**
 * @props {string} title - 표시할 헤더 텍스트
 * @props {vis_goBack} boolean - 뒤로가기 on/off
 * @props {rightButtonN} HEADER_FN - 우측 버튼
 */

export const Header = ({
  title = "",
  vis_goBack = true,
  rightButton1 = undefined,
  rightButton2 = undefined,
}: HeaderProps) => {
  return (
    <StyledHeader>
      <HeaderTitle>{title}</HeaderTitle>
      <div className="left_side">
        {vis_goBack && <HeaderButton fn={HEADER_FN.GO_BACK} />}
      </div>
      <div className="right_side">
        {/* 기능2 */}
        <HeaderButton fn={rightButton1} />
        {/* 기능1 */}
        <HeaderButton fn={rightButton2} />
      </div>
    </StyledHeader>
  );
};
