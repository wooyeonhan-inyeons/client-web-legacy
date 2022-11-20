import styled from "styled-components";

import HeaderButton from "./HeaderButton";
import { COLOR, HEADER_FN, zIndex } from "../../constants";

const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  height: 3.5rem;
  font-size: 1.3rem;

  color: ${COLOR.content} !important;
  background-color: ${COLOR.background};
  z-index: ${zIndex.default};
`;

const HeaderTitle = styled.div`
  font-size: 1rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0px);
`;

interface Props {
  title?: string;
  go_back?: boolean;
  rightButton1?: HEADER_FN;
  rightButton2?: HEADER_FN;
}

/**
 * @props {string} title - 표시할 헤더 텍스트
 * @props {go_back} boolean - 뒤로가기 on/off
 * @props {rightButtonN} HEADER_FN - 우측 버튼
 */

const Header = ({
  title = "",
  go_back = true,
  rightButton1 = undefined,
  rightButton2 = undefined,
}: Props) => {
  return (
    <StyledHeader>
      <HeaderTitle>{title}</HeaderTitle>
      <div className="left_side">
        {go_back && <HeaderButton fn={HEADER_FN.GO_BACK} />}
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

export default Header;
