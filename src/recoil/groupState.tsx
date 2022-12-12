import { atom } from "recoil";

export const groupState = atom<any[]>({
  key: "group",
  default: [],
});
