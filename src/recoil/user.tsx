import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { USER_ROLE } from "../constants";

const { persistAtom } = recoilPersist();

export interface CommonState {
  userId: string;
  role: USER_ROLE;
}

const initialState: CommonState = {
  userId: "",
  role: USER_ROLE.GUEST,
};

export const userState = atom({
  key: "user",
  default: initialState,
  effects_UNSTABLE: [persistAtom],
});
