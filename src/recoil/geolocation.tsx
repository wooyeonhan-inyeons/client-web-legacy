import { atom } from "recoil";

interface coordsType {
  lat: number;
  lng: number;
}

export const geoState = atom<coordsType>({
  key: "coordinate",
  default: { lat: 0, lng: 0 },
});
