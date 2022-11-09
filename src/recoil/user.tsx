import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { USER_ROLE } from "../constants";

const { persistAtom } = recoilPersist();

export interface CommonState {
  userId: number;
  role: USER_ROLE;
}

const initialState: CommonState = {
  userId: 0,
  role: USER_ROLE.GUEST,
};

export const userState = atom({
  key: "user",
  default: initialState,
  effects_UNSTABLE: [persistAtom],
});
