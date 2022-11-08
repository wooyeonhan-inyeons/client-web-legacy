import { atom } from "recoil";
import { USER_ROLE } from "../constants";

export const user = atom({
  key: "user",
  default: {
    userId: null,
    role: USER_ROLE.GUEST,
  },
});
