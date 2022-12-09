import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { HeaderProps } from "../components/Header";
import { HEADER_FN } from "../constants";
const { persistAtom } = recoilPersist();

const initialState: HeaderProps = {
  title: "",
  vis_goBack: false,
  rightButton1: HEADER_FN.EMPTY,
  rightButton2: HEADER_FN.EMPTY,
};

export const headerState = atom({
  key: "header",
  default: initialState,
  //일부페이지 헤더 이벤트가 너무 의존적이라서 불안하기때문에 로컬에 저장해버렸음
  effects_UNSTABLE: [persistAtom],
});
