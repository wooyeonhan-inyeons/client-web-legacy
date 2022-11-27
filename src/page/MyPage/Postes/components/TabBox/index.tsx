import { useRecoilState } from "recoil";
import { recoil_ } from "../../../../../recoil";
import { MyPostes } from "../MyPostes";
import { VisitedPost } from "../VistedPostes";

import { TabContainer, ActiveStyle } from "./styled";

export const TabBox = () => {
  const [tab] = useRecoilState(recoil_.tabState);

  return (
    <>
      <TabContainer style={ActiveStyle(tab)}>
        <MyPostes />
        <VisitedPost />
      </TabContainer>
    </>
  );
};
