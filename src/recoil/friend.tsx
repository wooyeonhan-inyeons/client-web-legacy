import { atom } from "recoil";

export const friendCountState = atom({
  key: "friend_count",
  default: 0,
});

export const requestedCountState = atom({
    key: "requested_count",
    default: 0,
  });
