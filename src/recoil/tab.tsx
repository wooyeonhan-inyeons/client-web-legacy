import { atom } from "recoil";
import { MYPAGE_ } from "../constants";

export const tabState = atom({
  key: "tab",
  default: MYPAGE_.MY_POST,
});
