import { atom } from "recoil";
import { MarkerProps } from "../page/Home/Map";

export const markerState = atom<MarkerProps[]>({
  key: "marker",
  default: [],
});
